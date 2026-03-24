(() => {
  const button = document.querySelector('[data-home-upcoming-event-button]');
  if (!button) {
    return;
  }

  const preferredEndpoint = button.getAttribute('data-home-upcoming-event-url') || '/api/next-event';
  const fallbackEndpoint = '/.netlify/functions/next-event';
  const endpoints = Array.from(new Set([preferredEndpoint, fallbackEndpoint]));
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

  const extractStartAt = (payload) => {
    if (payload?.event?.startAt) {
      return payload.event.startAt;
    }
    if (Array.isArray(payload?.events) && payload.events[0]?.startAt) {
      return payload.events[0].startAt;
    }
    return null;
  };

  const fetchDateFromEndpoint = (endpoint) =>
    fetch(endpoint, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unexpected response: ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => formatMonthDay(extractStartAt(payload)));

  const loadDate = async () => {
    for (const endpoint of endpoints) {
      try {
        const monthDay = await fetchDateFromEndpoint(endpoint);
        if (monthDay) {
          setLabel(monthDay);
          return;
        }
      } catch (_error) {
      }
    }

    setLabel(null);
  };

  loadDate();
})();
