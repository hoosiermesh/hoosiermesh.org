---
title: Initial Setup
description: Core configuration for new nodes
categories: [Getting Started]
tags: [configuration, setup]
weight: 4
---

Access the settings menu by pressing the settings **cog** icon. The recommended
configuration for nodes in the Indiana mesh network is documented in detail on
the [Node Configuration Reference](/docs/reference/node-configuration/) page.

Key settings to review:
- **LoRa settings**: Set region to US 915, preset to "Long Range - Fast"
- **Channels**: Configure the default "Long Fast" channel
- **User configuration**: Set your node name and long/short identifiers
- **Device role**: Set to CLIENT (or CLIENT_BASE for roof nodes)
- **Position**: Enable position broadcasting at 6-hour intervals

For the complete list of recommended settings for each category, see the
[Node Configuration Reference](/docs/reference/node-configuration/).

## Advanced configuration

For information on advanced configuration options including MQTT, Serial,
Telemetry, and External Notifications, see the
[Advanced Configuration Guide](/docs/reference/mqtt-advanced/).
