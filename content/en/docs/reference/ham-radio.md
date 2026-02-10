---
title: Amateur Radio & Meshtastic
description: Information for licensed amateur radio operators using Meshtastic
categories: [Reference]
tags: [ham-radio, amateur-radio, legal, licensing]
weight: 50
---

Information for licensed amateur radio (ham) operators using Meshtastic devices. Understanding the legal and technical considerations is essential for compliant operation.

## Important: Encryption & Licensing

{{% alert title="Critical for Ham Operators" color="danger" %}}
**US Amateur Radio licensing specifically prohibits encryption of transmitted information.** While Meshtastic supports encrypted communications, licensed amateur radio operators must disable encryption when operating under their amateur radio license.

See [FCC Part 97 Rules](https://www.fcc.gov/wireless/bureau-divisions/mobility-division/amateur-radio-service) for complete regulations.
{{% /alert %}}

## Educational Presentations

### Meshtastic Overview for Amateur Radio

🎥 [**Meshtastic Overview Presentation**](https://www.youtube.com/watch?v=c4vCbixlzw8) - Community presentation on Meshtastic fundamentals and usage ([slides](https://docs.google.com/presentation/d/1deby20UybyJFH5N7hyazTKJZdNG5Yil7eMtU_Y0D5KI/edit?usp=sharing))

### FCC/Licensing Compliance

For a comprehensive overview of Meshtastic specifically for amateur radio operators, including legal considerations, technical details, and best practices:

📊 [**Meshtastic for Amateur Radio Operators - Google Slides Presentation**](https://docs.google.com/presentation/d/1T1R0I4YQFTkaUcaEB-Bv3_yFOH-dvbqb67uY3WRFMM0/edit)

This presentation covers:
- FCC Part 97 regulations and compliance
- Encryption restrictions for ham operators
- Power output considerations
- Frequency allocations
- Proper station identification
- Technical configurations for licensed operation

## Configuration for Licensed Operation

When operating under an amateur radio license, configure your Meshtastic device as follows:

### User Configuration

In your node's User Configuration settings:

| Setting | Value | Reason |
|---------|-------|--------|
| Licensed Amateur Radio | **ON** | Enables ham radio mode |
| Long Name | Include callsign | Station identification (e.g., "KC1XXX - Josh") |

### Channel Configuration

{{% alert title="Encryption Must Be Disabled" color="warning" %}}
Default Meshtastic channels use encryption (PSK: AQ==). For ham operation, you must configure an **unencrypted channel**.
{{% /alert %}}

- **PSK (Pre-Shared Key)**: Must be set to a default/empty value for no encryption
- Consider creating a separate channel for ham-only communications

### Power & Frequency Considerations

#### Transmit Power
- **Unlicensed**: Limited to 1 watt EIRP (Effective Isotropic Radiated Power) on ISM bands
- **Licensed**: May use higher power levels within amateur radio band limits (check local regulations)
- Configure appropriately in LoRa settings based on your license class

#### Frequency Bands
- **ISM Band (915 MHz)**: Available for both licensed and unlicensed use
- **Amateur Allocations**: Consult your local amateur radio band plan
- Ensure your device is configured for legal frequencies in your region

## Station Identification

Per FCC Part 97.119:
- Station identification is required at the end of each communication and at least every 10 minutes during communication
- Include your callsign in your node's **Long Name** for automatic identification
- Consider periodic position beacons to meet ID requirements

## Power Output & EIRP

### Understanding EIRP
Effective Isotropic Radiated Power (EIRP) = Transmitter Power + Antenna Gain - Cable Loss

### Power Limits
- **Part 15 (Unlicensed)**: 1 watt EIRP maximum
- **Part 97 (Amateur)**: Varies by band and license class
  - Technician: Check specific band limits
  - General/Extra: Higher power privileges on most bands

### Example Calculation
```
Transmitter: 30 dBm (1 watt)
Antenna Gain: +3 dBi
Cable Loss: -0.5 dB
EIRP = 30 + 3 - 0.5 = 32.5 dBm (≈1.78 watts)
```

For unlicensed operation, this would exceed the 1-watt EIRP limit.

## Best Practices for Ham Operators

1. **Clearly mark licensed operation** - Use callsign in node name
2. **Document your configuration** - Note power levels, antenna specs, and EIRP calculations
3. **Separate licensed/unlicensed operation** - Consider different devices or channels
4. **Join the community** - Connect with other ham operators on [Indiana Mesh Discord](https://discord.gg/VrFcGTrw6V)
5. **Stay current** - FCC rules and interpretations can evolve

## High-Power Station Options

For licensed operators seeking high-power operation:

- **B&Q Station G2** - [High-power licensed station](https://shop.uniteng.com/product/meshtastic-mesh-device-station-edition/) designed for amateur radio use
- **Custom Builds** - Many operators build custom high-power stations with external amplifiers

{{% alert title="Reminder" color="info" %}}
Always ensure your configuration complies with your license class privileges and local regulations. When in doubt, consult with your local amateur radio club or the [ARRL](https://www.arrl.org/).
{{% /alert %}}

## Additional Resources

- [FCC Part 97 Rules](https://www.fcc.gov/wireless/bureau-divisions/mobility-division/amateur-radio-service) - Official amateur radio regulations
- [ARRL](https://www.arrl.org/) - American Radio Relay League
- [Meshtastic Amateur Radio Discussion](https://discord.gg/ktMAKGBnBs) - Global Meshtastic Discord
- [Indiana Mesh Discord](https://discord.gg/VrFcGTrw6V) - Local community with ham operators

## Questions?

Have questions about operating Meshtastic under your amateur radio license? Ask on the [Indiana Mesh Discord](https://discord.gg/VrFcGTrw6V) where experienced ham operators can help guide you.
