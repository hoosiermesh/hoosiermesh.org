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

  const getCounterGroup = (counter) => counter.closest('.home-stats') || counter;
  const getGroupCounters = (counter) => {
    const group = getCounterGroup(counter);
    if (!group || group === counter) {
      return [counter];
    }
    return Array.from(group.querySelectorAll('[data-node-counter]'));
  };

  const resolveTarget = ({ targetValue, url, fallbackUrl, renderedValue, startValue }) => {
    if (Number.isFinite(targetValue)) {
      return Promise.resolve({ count: targetValue, statusText: '', isError: false });
    }

    if (!url) {
      const hasRenderedValue = renderedValue !== null;
      return Promise.resolve({
        count: hasRenderedValue ? renderedValue : startValue,
        statusText: hasRenderedValue ? 'Showing latest cached count' : 'Live count unavailable',
        isError: !hasRenderedValue
      });
    }

    return fetchCount(url)
      .then((count) => ({ count, statusText: 'Live nodes right now', isError: false }))
      .catch(() =>
        fetchCount(fallbackUrl)
          .then((count) => ({ count, statusText: 'Showing latest cached count', isError: false }))
          .catch(() => {
            const hasRenderedValue = renderedValue !== null;
            return {
              count: hasRenderedValue ? renderedValue : startValue,
              statusText: hasRenderedValue ? 'Showing latest cached count' : 'Live count unavailable',
              isError: true
            };
          })
      );
  };

  const groupStartState = new WeakMap();

  const startGroup = (entryCounter) => {
    const group = getCounterGroup(entryCounter);
    if (groupStartState.has(group)) {
      return;
    }
    groupStartState.set(group, true);

    const countersInGroup = getGroupCounters(entryCounter);
    const row = entryCounter.closest('.home-stats');
    if (row) {
      row.classList.add('home-stats--reveal');
    }

    const jobs = countersInGroup
      .map((counter) => {
        if (!counter || counter.dataset.counterStarted === 'true') {
          return null;
        }

        counter.dataset.counterStarted = 'true';

        const valueEl = counter.querySelector('[data-node-count]');
        if (!valueEl) {
          return null;
        }

        const statusEl = counter.querySelector('[data-node-status]');
        const renderedValue = parseCounterNumber(valueEl.textContent || '');
        const targetValue = Number.parseInt(counter.getAttribute('data-node-target') || '', 10);
        const startAttribute = counter.getAttribute('data-node-start');
        const startValue = startAttribute === null ? (renderedValue ?? 0) : Number.parseInt(startAttribute, 10);
        const rawDuration = Number.parseInt(counter.getAttribute('data-node-duration') || '2200', 10);
        const durationMs = Number.isFinite(rawDuration) && rawDuration > 0 ? rawDuration : 2200;
        const url = counter.getAttribute('data-node-counter-url');
        const fallbackUrl = counter.getAttribute('data-node-fallback-url');

        valueEl.textContent = formatter.format(startValue);

        return {
          counter,
          valueEl,
          statusEl,
          startValue,
          durationMs,
          targetPromise: resolveTarget({ targetValue, url, fallbackUrl, renderedValue, startValue })
        };
      })
      .filter(Boolean);

    if (!jobs.length) {
      return;
    }

    Promise.all(jobs.map((job) => job.targetPromise)).then((results) => {
      const sharedDuration = jobs.reduce((maxDuration, job) => Math.max(maxDuration, job.durationMs), 0);

      jobs.forEach((job, index) => {
        const result = results[index];
        animateValue(job.counter, job.valueEl, job.startValue, result.count, sharedDuration);

        if (job.statusEl && result.statusText) {
          job.statusEl.textContent = result.statusText;
        }

        if (result.isError) {
          job.counter.classList.add('node-counter--error');
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

          startGroup(entry.target);
          getGroupCounters(entry.target).forEach((counter) => {
            observer.unobserve(counter);
          });
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach((counter) => startGroup(counter));
  }
})();
