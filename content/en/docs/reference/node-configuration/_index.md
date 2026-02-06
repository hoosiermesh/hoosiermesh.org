---
title: Node Configuration Reference
description: Complete reference for Meshtastic node configuration options
categories: [Reference]
tags: [configuration, lora, channels, settings]
weight: 10
---

This page provides a comprehensive reference of all node configuration options recommended for the Indiana Hoosier Mesh network.

## LoRa Settings

| Option | Setting |
|--------|---------|
| Region | US Region 915 |
| Use Preset | ON |
| Preset | Long Range - Fast |
| Ignore MQTT | OFF |
| OK to MQTT | ON |
| Transmit Enabled | ON |
| Number of Hops | 5 |
| Frequency Slot | 20 |
| RX Boost Gain | ON |
| Frequency Override | 906.875 |
| Transmit Power | 30 |

## Channel Settings

| Option | Setting |
|--------|---------|
| Channel Name | Long Fast |
| PSK | AQ== |
| Uplink Enabled | ON |
| Downlink Enabled | ON |
| Position Enabled | ON |
| Precise Location | OFF |
| Distance Slider | 148 ft |

## Security Settings

| Option | Setting |
|--------|---------|
| Direct Message Key (Public) | Populated* |
| Direct Message Key (Private) | Populated* |
| Log Serial Console | ON |
| Debug Log API | OFF |
| Admin Managed Mode | OFF |
| Legacy Admin Channel | OFF |

*Note: Unique to each node

## User Configuration

| Option | Setting |
|--------|---------|
| Node ID | Populated |
| Long Name | Your Choice |
| Short Name | Your Choice (max 4 characters) |
| Hardware Model | Populated |
| Unmessageable | OFF (Optional ON for roof nodes) |
| Licensed Amateur Radio | OFF* |

**Important:** Meshtastic allows encrypted transmissions. However, US Amateur Radio licensing prohibits encryption. See [FCC guidelines](https://www.fcc.gov/) and our [Amateur Radio & Meshtastic guide]({{< ref "/docs/ham-radio" >}}) for complete details.

## Device Settings

| Option | Setting |
|--------|---------|
| Device Role | CLIENT |
| Rebroadcast Mode | All |
| Node Info Broadcast Interval | Three Hours |
| LED Heartbeat | ON |
| Time Zone | Phone or GMT-5 |
| Button GPIO | 0 |
| Buzzer GPIO | 0 |

### Device Role Notes

- **CLIENT** (default): Standard mesh participant
- **CLIENT_BASE**: Use for roof/attic-based nodes. Don't forget to favorite your local owned nodes
- **ROUTER** / **ROUTER_LATE**: Avoid unless on a very tall tower. Check with experienced RF operators on the [Indiana Mesh Discord](https://discord.gg/VrFcGTrw6V) before using these roles

## Position Settings

| Option | Setting |
|--------|---------|
| Broadcast Interval | Six Hours |
| Smart Position | OFF |
| Fixed Position Lat | User Defined (via phone) |
| Fixed Position Long | User Defined (via phone) |
| Position Flags | 3 – User Defined |
| GPS Receive GPIO | Pin 0 |
| GPS Transmit GPIO | Pin 0 |
| GPS EN GPIO | Pin 0 |
| Altitude | Enabled |
| Altitude MSL | Enabled |

## Serial Settings (Optional)

| Option | Setting |
|--------|---------|
| Serial Enabled | ON |
| Echo Enabled | OFF |
| RX | 0 |
| TX | 0 |
| Baud Rate | BAUD_DEFAULT |
| Timeout | 0 |
