---
title: Get a node
date: 2026-02-02
description: >
  A list of potential nodes to get you started on your Meshtastic journey.
categories: [Getting Started]
tags: [beginner, hardware, buying-guide]
weight: 2
---

Ready to join the mesh? This guide will help you find the right Meshtastic device for your needs. Whether you're looking for a portable tracker, a fixed solar repeater, or something in between, there's a device for you.

## Where to Buy

### Official Partner Brands

These manufacturers produce officially supported Meshtastic hardware with excellent documentation and community support:

- [**Heltec**](https://heltec.org/product-category/lora/meshtastic/) - Popular ESP32-based devices, great for grid power
- [**RAK Wireless**](https://www.rakwireless.com/en-us) - nRF52-based WisBlock system with modular design
- [**Lilygo**](https://lilygo.cc/collections/lilygo-with-meshtastic) - Wide variety of ESP32 devices with screens and GPS
- [**Seeed Studios**](https://www.seeedstudio.com/meshtastic-products) - Premium solar nodes and trackers

### Community Supported Brands

- [**Meshnology**](https://meshnology.com/) - Custom designed Meshtastic devices
- [**Muzi Works**](https://muzi.works/) - High-quality nRF52 nodes with GPS
- [**Atlavox**](https://atlavox.com/) - Solar-powered beacon nodes
- [**Elecrow**](https://www.elecrow.com/lora/meshtastic.html) - Affordable options with varied feature sets
- [**B&Q Station G2**](https://shop.uniteng.com/product/meshtastic-mesh-device-station-edition/) - High-power licensed ham operator station
- [**LowMesh**](https://lowmesh.com/) - Compact pocket nodes
- [**Peak Mesh**](https://www.etsy.com/shop/PeakMesh) - Custom builds on Etsy
- [**Spec5**](https://www.etsy.com/shop/SpecFive) - Custom builds on Etsy

### Retailers

- [**Rokland**](https://store.rokland.com/pages/meshtastic-hardware-rak-lilygo) - US-based retailer with good selection
- **Amazon** - Various models available with Prime shipping

---

## Popular Device Models

{{% alert title="Choosing a Chipset" color="info" %}}
**ESP32**: Better for grid-powered setups with WiFi access. Lower cost, more features, but higher power consumption.

**nRF52**: Better for battery/solar powered deployments. Much more power efficient, easier firmware updates via UF2.
{{% /alert %}}

### General Purpose Devices

These devices are great for everyday use - portable, on-body, desktop, or vehicle mounting. They typically include screens, GPS, and good battery life.

| Brand | Model | Chipset | Best For |
| :--- | :--- | :--- | :--- |
| **Heltec** | [V3](https://heltec.org/project/wifi-lora-32-v3/) | ESP32 | Desktop/vehicle, WiFi needed |
| **Heltec** | [V4](https://heltec.org/) | ESP32 | Desktop/vehicle, WiFi needed |
| **Heltec** | [T114](https://heltec.org/project/ht-ct62/) | nRF52 | Battery-powered handheld |
| **RAK Wireless** | [RAK4631](https://www.rakwireless.com/en-us/products/wisblock/rak4631) | nRF52 | Modular builds |
| **RAK Wireless** | [WisMesh Tag](https://www.rakwireless.com/en-us/products/meshtastic-starter-kits/wismesh-tag) | nRF52 | Location tracking |
| **RAK Wireless** | [WisMesh Pocket](https://www.rakwireless.com/en-us/products/meshtastic-starter-kits/wismesh-pocket) | nRF52 | Portable handheld |
| **LowMesh** | [Pocket-S](https://lowmesh.com/) | nRF52 | Ultra-compact portable |
| **Seeed Studios** | [T1000-E](https://www.seeedstudio.com/SenseCAP-Card-Tracker-T1000-E-for-Meshtastic-p-5913.html) | nRF52 | GPS tracking |
| **Seeed Studios** | [Wio Tracker L1 Pro](https://www.seeedstudio.com/) | nRF52 | Advanced tracking |
| **Lilygo** | [T-Beam](https://lilygo.cc/products/t-beam-v1-1-esp32-lora-module) | ESP32 | Popular all-in-one |
| **Lilygo** | [T-Echo](https://lilygo.cc/products/t-echo) | ESP32 | E-ink display |
| **Lilygo** | [T-Deck](https://lilygo.cc/products/t-deck) | ESP32 | Keyboard + screen |
| **Lilygo** | [T-LoRa Pager](https://lilygo.cc/) | ESP32 | Compact pager |
| **Lilygo** | [T-Watch](https://lilygo.cc/products/t-watch-s3) | ESP32 | Wearable |
| **Lilygo** | [T-Echo Lite](https://lilygo.cc/) | nRF52 | Battery-efficient |
| **Elecrow** | [ThinkNode M5](https://www.elecrow.com/) | ESP32 | Affordable option |
| **Elecrow** | [ThinkNode M1](https://www.elecrow.com/) | nRF52 | Affordable option |
| **Meshnology** | [N37](https://meshnology.com/) | nRF52 | Custom design |
| **Meshnology** | [N36](https://meshnology.com/) | nRF52 | Custom design |
| **Meshnology** | [N30/N32/N33](https://meshnology.com/) | ESP32 | Various models |
| **Meshnology** | [N35/N36](https://meshnology.com/) | ESP32 | Various models |
| **Muzi Works** | [H2T](https://muzi.works/) | nRF52 | Premium handheld |
| **Muzi Works** | [R1 Neo](https://muzi.works/) | nRF52 | Premium with GPS |

### Solar Repeaters & Fixed Nodes

These devices are designed for outdoor installation, solar power, and long-term unattended operation. Perfect for extending network coverage.

| Brand | Model | Chipset | Features |
| :--- | :--- | :--- | :--- |
| **Atlavox** | [Beacon Solar](https://atlavox.com/) | nRF52 | Weatherproof solar repeater |
| **Seeed Studios** | [SenseCap Solar P1/P1 Pro](https://www.seeedstudio.com/) | nRF52 | Premium solar node |
| **Elecrow** | [ThinkNode M6](https://www.elecrow.com/) | nRF52 | Affordable solar option |
| **Heltec** | [Mesh Tower](https://heltec.org/) | nRF52 | Dedicated repeater |
| **RAK Wireless** | [WisMesh Repeater](https://www.rakwireless.com/) | nRF52 | Modular repeater |

## Need Help Choosing?

- **New to mesh?** Start with a Heltec V3/V4 or RAK WisMesh Pocket
- **Want maximum battery life?** Choose any nRF52 device
- **Need WiFi?** Go with ESP32 devices like Heltec or Lilygo
- **Building a repeater?** Check out solar nodes from Seeed or Atlavox
- **On a budget?** Elecrow ThinkNodes offer great value

Still not sure? Ask for recommendations on the [Indiana Mesh Discord](https://discord.gg/VrFcGTrw6V)!
