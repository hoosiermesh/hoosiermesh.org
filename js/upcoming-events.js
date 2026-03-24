(() => {
  if (window.__hoosierUpcomingEventsInitialized) {
    return;
  }
  window.__hoosierUpcomingEventsInitialized = true;

  const widgets = document.querySelectorAll('[data-upcoming-events]');
  if (!widgets.length) {
    return;
  }

  const makeWidgetNavigable = (widget, targetUrl) => {
    if (!targetUrl) {
      return;
    }

    const navigate = () => {
      window.location.assign(targetUrl);
    };

    widget.addEventListener('click', navigate);
    widget.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }
      event.preventDefault();
      navigate();
    });
  };

  const escapeHtml = (value = '') =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');

  const formatEventDate = (event, timezone) => {
    const start = new Date(event.startAt);
    if (Number.isNaN(start.getTime())) {
      return '';
    }

    const options = event.allDay
      ? {
          timeZone: timezone,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }
      : {
          timeZone: timezone,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          timeZoneName: 'short'
        };

    return new Intl.DateTimeFormat('en-US', options).format(start);
  };

  const renderEvent = (event, timezone) => {
    const dateLine = escapeHtml(formatEventDate(event, timezone));

    return [
      '<li class="list-group-item upcoming-events-widget__item">',
      '<div class="upcoming-events-widget__label">Upcoming event</div>',
      `<div class="upcoming-events-widget__date">${dateLine}</div>`,
      '</li>'
    ].join('');
  };

  const renderError = (widget) => {
    const emptyEl = widget.querySelector('.upcoming-events-widget__empty');
    if (emptyEl) {
      emptyEl.textContent = 'Upcoming events are unavailable right now.';
    }
  };

  widgets.forEach((widget) => {
    const endpoint = widget.getAttribute('data-upcoming-events-url') || '/.netlify/functions/upcoming-events';
    const limit = Number.parseInt(widget.getAttribute('data-upcoming-events-limit') || '1', 10);
    const timezone = widget.getAttribute('data-upcoming-events-timezone') || 'America/New_York';
    const target = widget.getAttribute('data-upcoming-events-target') || '/events/';

    const requestUrl = new URL(endpoint, window.location.origin);
    requestUrl.searchParams.set('limit', String(Number.isFinite(limit) && limit > 0 ? limit : 1));
    makeWidgetNavigable(widget, target);

    fetch(requestUrl.toString(), { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unexpected response: ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const events = Array.isArray(payload?.events) ? payload.events : [];
        const existingList = widget.querySelector('.upcoming-events-widget__list');
        if (existingList) {
          existingList.remove();
        }

        const emptyEl = widget.querySelector('.upcoming-events-widget__empty');

        if (!events.length) {
          if (emptyEl) {
            emptyEl.textContent = 'No upcoming events listed yet.';
          }
          return;
        }

        if (emptyEl) {
          emptyEl.remove();
        }

        const list = document.createElement('ul');
        list.className = 'list-group upcoming-events-widget__list';
        list.innerHTML = events.map((item) => renderEvent(item, timezone)).join('');
        widget.appendChild(list);
      })
      .catch(() => {
        renderError(widget);
      });
  });
})();