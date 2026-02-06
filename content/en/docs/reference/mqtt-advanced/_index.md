---
title: Advanced Configuration - MQTT & Telemetry
description: MQTT, Serial, and Telemetry configuration for Meshtastic nodes
categories: [Reference]
tags: [mqtt, telemetry, advanced, serial]
weight: 20
---

This page covers advanced configuration options for MQTT (internet connectivity), Serial interfaces, and Telemetry collection.

## MQTT (Optional but Recommended)

MQTT allows you to access and control your Meshtastic nodes over the internet, integrating them with other services and creating mesh monitors.

### MQTT Configuration

| Option | Setting |
|--------|---------|
| MQTT Enabled | OFF (optional ON) |
| Address | mqtt.meshtastic.org |
| Username | meshdev |
| Password | User Defined |
| Encryption Enabled | ON |
| JSON Output | OFF |
| TLS Enabled | ON |
| MQTT Root Topic | msh/US/IN |

### Important MQTT Considerations

{{% alert title="Network Overload Warning" color="warning" %}}
When you enable MQTT, you'll receive messages from many nodes across the network and can become overwhelmed with traffic. Use this feature deliberately and carefully.
{{% /alert %}}

**Best Practices:**
- Use [MeshMap.net](https://meshmap.net/) to check specific root topics of users in your area before enabling MQTT
- Consider the impact on your device's performance and battery life
- Start with MQTT disabled and enable only when needed
- Monitor your device's resource usage after enabling MQTT

### Finding Your Root Topic

Check [MeshMap.net](https://meshmap.net/) to see what root topics other users in your region are publishing to. This will help you understand the network topology and choose an appropriate topic for your node.

## Telemetry (Optional)

Telemetry allows your node to collect and broadcast device metrics like temperature, humidity, battery status, and GPS location.

| Option | Setting |
|--------|---------|
| Send Device Telemetry | OFF |
| Environment Metrics Module | OFF |
| Environment Metrics Update Interval | OFF |
| Environment Metrics On Screen | OFF |

### When to Enable Telemetry

- Enabled by default on devices with environmental sensors
- Useful for nodes you want to monitor remotely via MQTT
- Increases power consumption on battery-powered devices
- Consider your use case before enabling

## Serial/USB Configuration (Optional)

The Serial interface allows you to communicate with your Meshtastic device via USB or serial connection for advanced debugging and integration with external systems.

| Option | Setting |
|--------|---------|
| Serial Enabled | ON |
| Echo Enabled | OFF |
| RX | 0 |
| TX | 0 |
| Baud Rate | BAUD_DEFAULT |
| Timeout | 0 |

### Use Cases

- Debug and monitor device behavior via serial port
- Integrate with external applications or sensors
- Advanced troubleshooting of device issues
- Integration with automations or home assistant systems

## External Notifications (Optional)

Configure how your device alerts you to incoming messages.

| Option | Setting |
|--------|---------|
| External Notification Enabled | OFF |
| Alert message LED | ON |
| Alert message buzzer | OFF |
| Alert message vibration | OFF |
| Alert bell LED | OFF |
| Alert bell buzzer | OFF |
| Alert bell vibration | OFF |

These settings allow you to customize notification behavior based on message type and your preferences.
