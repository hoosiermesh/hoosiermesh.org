(() => {
  const button = document.querySelector('[data-home-upcoming-event-button]');
  if (!button) {
    return;
  }

  const endpoint = button.getAttribute('data-home-upcoming-event-url') || '/.netlify/functions/next-event';
  const labelPrefix = button.getAttribute('data-home-upcoming-event-fallback') || 'Upcoming Event';

  const labelNode = button.querySelector('[data-home-upcoming-event-label]');
  if (!labelNode) {
    return;
  }

  const setLabel = (monthDay) => {
    labelNode.textContent = `${labelPrefix} ${monthDay || '--/--'}`;
  };

  const formatMonthDay = (isoDate) => {
    const value = new Date(isoDate);
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit'
    }).format(value);
  };

  fetch(endpoint, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unexpected response: ${response.status}`);
      }
      return response.json();
    })
    .then((payload) => {
      const monthDay = formatMonthDay(payload?.event?.startAt);
      if (!monthDay) {
        setLabel(null);
        return;
      }
      setLabel(monthDay);
    })
    .catch(() => {
      setLabel(null);
    });
})();
