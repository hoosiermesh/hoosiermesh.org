(() => {
  const counters = document.querySelectorAll('[data-node-counter]');
  if (!counters.length) {
    return;
  }

  const formatter = new Intl.NumberFormat();
  const parseCounterNumber = (value) => {
    if (typeof value !== 'string') {
      return null;
    }

    const normalized = value.replace(/[^0-9-]/g, '');
    if (!normalized) {
      return null;
    }

    const parsed = Number.parseInt(normalized, 10);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const animateValue = (counter, valueEl, from, to, duration) => {
    if (!counter || !valueEl || !Number.isFinite(from) || !Number.isFinite(to)) {
      return;
    }

    const setValue = (value) => {
      valueEl.textContent = formatter.format(value);
    };

    if (from === to || duration <= 0) {
      setValue(to);
      return;
    }

    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setValue(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.classList.remove('node-counter--pulse');
        counter.classList.add('node-counter--pulse');
        setTimeout(() => {
          counter.classList.remove('node-counter--pulse');
        }, 700);
      }
    };

    requestAnimationFrame(step);
  };

  const extractCount = (data) => {
    if (Array.isArray(data)) {
      return data.length;
    }

    if (Array.isArray(data.nodes)) {
      return data.nodes.length;
    }

    if (data.statistics && typeof data.statistics.nodes === 'number') {
      return data.statistics.nodes;
    }

    if (typeof data.count === 'number') {
      return data.count;
    }

    if (typeof data.nodeCount === 'number') {
      return data.nodeCount;
    }

    if (typeof data.memberCount === 'number') {
      return data.memberCount;
    }

    return null;
  };

  const fetchCount = (url) => {
    if (!url) {
      return Promise.reject(new Error('Missing URL'));
    }

    return fetch(url, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unexpected response: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const count = extractCount(data);
        if (!Number.isFinite(count)) {
          throw new Error('Unexpected data shape');
        }

        return count;
      });
  };

  const groupEndTimes = new WeakMap();
  const getGroupEndTime = (counter, durationMs) => {
    const group = counter.closest('.home-stats');
    if (!group) {
      return performance.now() + durationMs;
    }

    if (!groupEndTimes.has(group)) {
      groupEndTimes.set(group, performance.now() + durationMs);
    }

    return groupEndTimes.get(group);
  };

  const startCounter = (counter) => {
    if (!counter || counter.dataset.counterStarted === 'true') {
      return;
    }

    counter.dataset.counterStarted = 'true';

    const url = counter.getAttribute('data-node-counter-url');
    const valueEl = counter.querySelector('[data-node-count]');
    const statusEl = counter.querySelector('[data-node-status]');
    const fallbackUrl = counter.getAttribute('data-node-fallback-url');
    const renderedValue = parseCounterNumber(valueEl.textContent || '');
    const targetValue = Number.parseInt(counter.getAttribute('data-node-target') || '', 10);
    const startAttribute = counter.getAttribute('data-node-start');
    const startValue = startAttribute === null ? (renderedValue ?? 0) : Number.parseInt(startAttribute, 10);
    const durationMs = Number.parseInt(counter.getAttribute('data-node-duration') || '2600', 10);
    const endTime = getGroupEndTime(counter, durationMs);
    const getRemainingDuration = () => Math.max(0, endTime - performance.now());

    if (!valueEl) {
      return;
    }

    valueEl.textContent = formatter.format(startValue);

    const row = counter.closest('.home-stats');
    if (row) {
      row.classList.add('home-stats--reveal');
    }

    if (Number.isFinite(targetValue)) {
      animateValue(counter, valueEl, startValue, targetValue, getRemainingDuration());
      return;
    }

    if (!url) {
      return;
    }

    fetchCount(url)
      .then((count) => {
        animateValue(counter, valueEl, startValue, count, getRemainingDuration());
        if (statusEl) {
          statusEl.textContent = 'Live nodes right now';
        }
      })
      .catch(() => {
        fetchCount(fallbackUrl)
          .then((count) => {
            const currentValue = parseCounterNumber(valueEl.textContent || '') ?? startValue;
            animateValue(counter, valueEl, currentValue, count, getRemainingDuration());
            if (statusEl) {
              statusEl.textContent = 'Showing latest cached count';
            }
          })
          .catch(() => {
            if (renderedValue !== null) {
              const currentValue = parseCounterNumber(valueEl.textContent || '') ?? 0;
              animateValue(counter, valueEl, currentValue, renderedValue, getRemainingDuration());
            }

            counter.classList.add('node-counter--error');
            if (statusEl) {
              statusEl.textContent = renderedValue === null ? 'Live count unavailable' : 'Showing latest cached count';
            }
          });
      });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          startCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach((counter) => startCounter(counter));
  }
})();
