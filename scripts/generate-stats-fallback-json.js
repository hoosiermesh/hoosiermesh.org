'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const ANALYTICS_URL = 'https://meshmalla.tranziq.net/api/analytics';
const DISCORD_INVITE_URL = 'https://discord.com/api/v10/invites/VrFcGTrw6V?with_counts=true';

const readJson = async (filePath, fallback) => {
  try {
    const text = await fs.readFile(filePath, 'utf8');
    return JSON.parse(text);
  } catch {
    return fallback;
  }
};

const writeJson = async (filePath, data) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
};

const getNodeCount = async (fallbackNodeCount) => {
  try {
    const response = await fetch(ANALYTICS_URL, {
      headers: {
        'user-agent': 'hoosiermesh.org stats build step'
      }
    });

    if (!response.ok) {
      throw new Error(`analytics-status-${response.status}`);
    }

    const data = await response.json();
    const count = data && data.node_statistics ? data.node_statistics.total_nodes : null;
    if (typeof count !== 'number') {
      throw new Error('analytics-shape');
    }

    return {
      nodeCount: count,
      timestamp: new Date().toISOString(),
      source: 'build-live'
    };
  } catch {
    return {
      nodeCount: Number.isFinite(fallbackNodeCount) ? fallbackNodeCount : 0,
      timestamp: new Date().toISOString(),
      source: 'build-fallback'
    };
  }
};

const getDiscordCounts = async (fallbackMemberCount, fallbackPresenceCount) => {
  try {
    const response = await fetch(DISCORD_INVITE_URL, {
      headers: {
        'user-agent': 'hoosiermesh.org stats build step'
      }
    });

    if (!response.ok) {
      throw new Error(`discord-status-${response.status}`);
    }

    const data = await response.json();
    const memberCount = data ? data.approximate_member_count : null;
    const presenceCount = data ? data.approximate_presence_count : null;

    if (typeof memberCount !== 'number') {
      throw new Error('discord-shape');
    }

    return {
      memberCount,
      presenceCount: typeof presenceCount === 'number' ? presenceCount : null,
      timestamp: new Date().toISOString(),
      source: 'build-live'
    };
  } catch {
    return {
      memberCount: Number.isFinite(fallbackMemberCount) ? fallbackMemberCount : 0,
      presenceCount: Number.isFinite(fallbackPresenceCount) ? fallbackPresenceCount : null,
      timestamp: new Date().toISOString(),
      source: 'build-fallback'
    };
  }
};

const generate = async () => {
  const dataNodePath = path.join(process.cwd(), 'data', 'node-count.json');
  const dataDiscordPath = path.join(process.cwd(), 'data', 'discord.json');

  const dataNode = await readJson(dataNodePath, {});
  const dataDiscord = await readJson(dataDiscordPath, {});

  const nodePayload = await getNodeCount(dataNode.nodeCount);
  const discordPayload = await getDiscordCounts(dataDiscord.memberCount, dataDiscord.presenceCount);

  const staticNodePath = path.join(process.cwd(), 'static', 'api', 'node-count.json');
  const staticDiscordPath = path.join(process.cwd(), 'static', 'api', 'discord-count.json');

  await writeJson(staticNodePath, nodePayload);
  await writeJson(staticDiscordPath, discordPayload);

  console.log('Generated static/api/node-count.json and static/api/discord-count.json');
};

generate();