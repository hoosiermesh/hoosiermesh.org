---
title: Flash Firmware
description: Install drivers and flash Meshtastic firmware
categories: [Getting Started]
tags: [firmware, setup]
weight: 3
---

## Browser requirements

{{% alert title="Important" color="warning" %}}
You must use **Chrome** or **Microsoft Edge** to access the Meshtastic
installer. Other browsers are not supported.
{{% /alert %}}

1. Visit the [Meshtastic website](https://meshtastic.org) and navigate to the
   **Getting Started** section
2. Follow the instructions for your device type to download and install any
   required drivers

## Driver notes

{{% alert title="nRF52 and RP2040 devices" color="info" %}}
**These devices typically do not require serial drivers.** They use the UF2
bootloader which makes the devices appear as flash drives. **Do not download
USB device drivers unless required to install UF2 support.**
{{% /alert %}}

- Only download serial drivers if your device requires them
- After installing drivers (if needed), restart your computer

## Flash the firmware

1. Return to the [Meshtastic.org Getting Started](https://meshtastic.org)
   section
2. Use the web flasher or follow the provided instructions to flash the
   Meshtastic firmware onto your device
