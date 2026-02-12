'use strict';

const STATUS_URL = 'https://meshmap.tranziq.net/api/status';

exports.handler = async () => {
  try {
    const response = await fetch(STATUS_URL, {
      headers: {
        'user-agent': 'hoosiermesh.org node counter'
      }
    });

    if (!response.ok) {
      return {
        statusCode: 502,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
          'cache-control': 'no-store'
        },
        body: JSON.stringify({
          error: 'meshmonitor-status-error',
          status: response.status
        })
      };
    }

    const data = await response.json();
    const count = data && data.statistics ? data.statistics.nodes : null;

    if (typeof count !== 'number') {
      return {
        statusCode: 502,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
          'cache-control': 'no-store'
        },
        body: JSON.stringify({
          error: 'meshmonitor-status-shape'
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': 'no-store'
      },
      body: JSON.stringify({
        nodeCount: count,
        timestamp: data.timestamp || null
      })
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': 'no-store'
      },
      body: JSON.stringify({
        error: 'meshmonitor-status-unavailable'
      })
    };
  }
};
