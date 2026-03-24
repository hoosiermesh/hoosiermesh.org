'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const DEFAULT_CALENDAR_ICS_URL =
  'https://calendar.google.com/calendar/ical/4c0f59fcfbb6430cd387c4100bd4493ca155a338ffc98b2dc820fcd891b38d2f%40group.calendar.google.com/public/basic.ics';
const DEFAULT_TIMEZONE = 'America/New_York';

const outputPath = path.join(process.cwd(), 'static', 'api', 'next-event.json');

const unfoldIcsLines = (ics) =>
  ics
    .replace(/\r\n[ \t]/g, '')
    .replace(/\n[ \t]/g, '')
    .split(/\r?\n/);

const zonedDateToUtc = ({ year, month, day, hour, minute, second }, timeZone) => {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  });

  const parts = formatter.formatToParts(new Date(utcGuess));
  const map = {};
  for (const part of parts) {
    if (part.type !== 'literal') {
      map[part.type] = Number.parseInt(part.value, 10);
    }
  }

  const asIfUtc = Date.UTC(map.year, map.month - 1, map.day, map.hour, map.minute, map.second);
  const offset = asIfUtc - utcGuess;
  return new Date(utcGuess - offset);
};

const parseIcsDate = (value, isDateOnly, timeZone) => {
  if (!value) {
    return null;
  }

  if (isDateOnly) {
    const year = Number.parseInt(value.slice(0, 4), 10);
    const month = Number.parseInt(value.slice(4, 6), 10);
    const day = Number.parseInt(value.slice(6, 8), 10);
    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
      return null;
    }
    return new Date(Date.UTC(year, month - 1, day));
  }

  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
  if (!match) {
    return null;
  }

  const [, year, month, day, hour, minute, second, zSuffix] = match;
  const dateParts = {
    year: Number.parseInt(year, 10),
    month: Number.parseInt(month, 10),
    day: Number.parseInt(day, 10),
    hour: Number.parseInt(hour, 10),
    minute: Number.parseInt(minute, 10),
    second: Number.parseInt(second, 10)
  };

  if (zSuffix === 'Z') {
    return new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, dateParts.hour, dateParts.minute, dateParts.second));
  }

  return zonedDateToUtc(dateParts, timeZone || DEFAULT_TIMEZONE);
};

const extractEventsFromIcs = (icsText, fallbackTimeZone) => {
  const lines = unfoldIcsLines(icsText);
  const events = [];
  let current = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      current = {};
      continue;
    }

    if (line === 'END:VEVENT') {
      if (current && current.DTSTART) {
        const isDateOnly = current.DTSTART.params.VALUE === 'DATE';
        const eventTimeZone = current.DTSTART.params.TZID || fallbackTimeZone || DEFAULT_TIMEZONE;
        const startDate = parseIcsDate(current.DTSTART.value, isDateOnly, eventTimeZone);
        const endDate = current.DTEND
          ? parseIcsDate(
              current.DTEND.value,
              current.DTEND.params.VALUE === 'DATE',
              current.DTEND.params.TZID || eventTimeZone
            )
          : null;

        if (startDate) {
          events.push({
            startAt: startDate.toISOString(),
            endAt: endDate ? endDate.toISOString() : null
          });
        }
      }

      current = null;
      continue;
    }

    if (!current) {
      continue;
    }

    const separatorIdx = line.indexOf(':');
    if (separatorIdx < 1) {
      continue;
    }

    const keyAndParams = line.slice(0, separatorIdx);
    const rawValue = line.slice(separatorIdx + 1);
    const [key, ...paramPairs] = keyAndParams.split(';');
    const params = {};

    for (const pair of paramPairs) {
      const [paramKey, paramValue] = pair.split('=');
      if (paramKey && paramValue) {
        params[paramKey.toUpperCase()] = paramValue;
      }
    }

    current[key.toUpperCase()] = {
      value: rawValue,
      params
    };
  }

  return events;
};

const writeOutput = async (payload) => {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(payload), 'utf8');
};

const generate = async () => {
  const calendarUrl = process.env.CALENDAR_ICS_URL || DEFAULT_CALENDAR_ICS_URL;
  const calendarTimeZone = process.env.CALENDAR_TIMEZONE || DEFAULT_TIMEZONE;
  const nowIso = new Date().toISOString();

  try {
    const response = await fetch(calendarUrl, {
      headers: {
        'user-agent': 'hoosiermesh.org next event build step'
      }
    });

    if (!response.ok) {
      throw new Error(`calendar-fetch-failed:${response.status}`);
    }

    const icsText = await response.text();
    const nextEvent = extractEventsFromIcs(icsText, calendarTimeZone)
      .filter((item) => {
        const compareTime = item.endAt || item.startAt;
        return compareTime >= nowIso;
      })
      .sort((a, b) => (a.startAt < b.startAt ? -1 : 1))[0] || null;

    await writeOutput({
      event: nextEvent,
      fetchedAt: nowIso,
      source: 'build-generated'
    });
    console.log('Generated static/api/next-event.json');
  } catch (error) {
    await writeOutput({
      event: null,
      fetchedAt: nowIso,
      source: 'build-generated',
      error: 'calendar-unavailable'
    });
    console.warn('Unable to fetch calendar during build; wrote fallback next-event.json');
  }
};

generate();
