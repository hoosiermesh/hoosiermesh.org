'use strict';

const DISCORD_INVITE_URL = 'https://discord.com/api/v10/invites/VrFcGTrw6V?with_counts=true';

exports.handler = async () => {
  try {
    const response = await fetch(DISCORD_INVITE_URL, {
      headers: {
        'user-agent': 'hoosiermesh.org discord counter'
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
          error: 'discord-count-error',
          status: response.status
        })
      };
    }

    const data = await response.json();
    const memberCount = data ? data.approximate_member_count : null;
    const presenceCount = data ? data.approximate_presence_count : null;

    if (typeof memberCount !== 'number') {
      return {
        statusCode: 502,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
          'cache-control': 'no-store'
        },
        body: JSON.stringify({
          error: 'discord-count-shape'
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
        count: memberCount,
        memberCount,
        presenceCount,
        timestamp: new Date().toISOString()
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
        error: 'discord-count-unavailable'
      })
    };
  }
};
