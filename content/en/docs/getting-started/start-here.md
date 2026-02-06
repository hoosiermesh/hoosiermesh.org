---
title: Start Here
description: Safety checks and device basics before you begin
categories: [Getting Started]
tags: [beginner, setup]
weight: 1
---

## Before you begin

{{% alert title="Critical Safety Warning" color="danger" %}}
**Never power on your device without attaching an antenna!** Powering on the
radio without an antenna attached could damage the radio chip.
{{% /alert %}}

## Verify your data cable

Before connecting your device to your computer, make sure your USB cable
supports both charging and data transfer. Some cables are charge-only and
won't work for flashing firmware.

To verify your cable:
- Try connecting it to your phone or another device
- Attempt to copy a file to or from the device
- If file transfer works, your cable can also transfer data and is ready to use

## Identify your board

Before you begin, decide on your first device. Check out the
[Get a Node](/docs/getting-started/get-a-node/) guide to help you choose the
right hardware for your needs and budget.

Once you have your device, identify its manufacturer and designation (for
example ESP32, nRF52, RP2040). You will need this information to select the
correct drivers and firmware.

Board name and designation: _______________________

## Chipset overview

Meshtastic supports several chipset types, each with different advantages:

- **ESP32-based devices**: Equipped with WiFi and Bluetooth; ideal for web
  interface access and WiFi configuration. ESP32-S3 variants offer improved
  performance. Higher power consumption than nRF52.
- **nRF52-based devices**: Much more power efficient than ESP32; ideal for
  battery-powered and solar deployments. Equipped with Bluetooth only (no WiFi).
  Uses the UF2 bootloader for easy updates.
- **RP2040-based devices**: Dual-core ARM chip developed by Raspberry Pi.
  Cost-effective for DIY projects. Use the UF2 bootloader and appear as flash
  drives.
- **Semtech-based devices**: Choose newer SX126x or LR11xx series for improved
  performance over the older SX127x series.
