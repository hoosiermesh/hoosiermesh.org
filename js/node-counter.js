(() => {
  const counter = document.querySelector('[data-node-counter]');
  if (!counter) {
    return;
  }

  const url = counter.getAttribute('data-node-counter-url');
  const valueEl = counter.querySelector('[data-node-count]');
  const statusEl = counter.querySelector('[data-node-status]');
  const startValue = Number.parseInt(counter.getAttribute('data-node-start') || '0', 10);
  const durationMs = Number.parseInt(counter.getAttribute('data-node-duration') || '1200', 10);
  const formatter = new Intl.NumberFormat();

  const setValue = (value) => {
    if (!valueEl) {
      return;
    }
    valueEl.textContent = formatter.format(value);
  };

  const animateValue = (from, to, duration) => {
    if (!Number.isFinite(from) || !Number.isFinite(to)) {
      return;
    }

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
      }
    };

    requestAnimationFrame(step);
  };

  setValue(startValue);

  fetch(url, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unexpected response: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let count = null;
      if (Array.isArray(data)) {
        count = data.length;
      } else if (Array.isArray(data.nodes)) {
        count = data.nodes.length;
      } else if (data.statistics && typeof data.statistics.nodes === 'number') {
        count = data.statistics.nodes;
      } else if (typeof data.count === 'number') {
        count = data.count;
      } else if (typeof data.nodeCount === 'number') {
        count = data.nodeCount;
      }

      if (!Number.isFinite(count)) {
        throw new Error('Unexpected data shape');
      }

      animateValue(startValue, count, durationMs);
      if (statusEl) {
        statusEl.textContent = 'Live nodes right now';
      }
    })
    .catch(() => {
      counter.classList.add('node-counter--error');
      if (statusEl) {
        statusEl.textContent = 'Live count unavailable';
      }
    });
})();
