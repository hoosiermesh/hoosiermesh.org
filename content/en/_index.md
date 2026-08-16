---
title: Hoosier Mesh
description: Community-powered connectivity for Indiana. Get connected today!
images: ["/images/hm_main.svg"]
---

<style>
  .td-heading-self-link {
    display: none;
  }

  .home-main-logo {
    width: 520px;
    max-width: 100%;
    height: auto;
    margin: -1.45rem auto -0.55rem;
    display: block;
  }

  .td-cover-block .pt-3.lead {
    padding-top: 0 !important;
    margin-top: -0.35rem;
  }

  .td-cover-block .td-overlay__inner {
    padding-top: 0.1rem;
    padding-bottom: 0.75rem;
  }

  .td-cover-block .pt-3.lead > .home-hero-copy {
    margin-top: 0.95rem;
  }

  .td-cover-block .display-2 {
    margin-bottom: 0.35rem !important;
  }

  .home-hero-tagline {
    margin-bottom: 0.95rem;
  }

  .td-cover-block .home-cta {
    margin-top: 1.15rem !important;
    margin-bottom: 0.35rem !important;
  }

  @media (max-width: 767.98px) {
    .home-main-logo {
      width: 88vw;
      max-width: 88vw;
    }
  }

</style>

{{< blocks/cover image_anchor="top" height="max" >}}

<img src="/images/hm_main.svg" alt="Hoosier Mesh logo" class="home-main-logo">
<h1 class="display-2 mt-0 mb-3">Hoosier Mesh</h1>

<div class="home-hero-copy">
  <p class="display-6 home-hero-tagline">Community-powered connectivity for Indiana</p>
  <p class="p-initial home-cta">
    <a class="btn btn-lg btn-primary me-3" href="/docs/getting-started/get-a-node/">
      Get a node <i class="fas fa-arrow-alt-circle-right ms-2"></i>
    </a>
    <a class="btn btn-lg btn-secondary me-3" href="https://discord.gg/VrFcGTrw6V" target="_blank">
      Join Discord <i class="fab fa-discord ms-2 "></i>
    </a>
    <a
      class="btn btn-lg btn-info"
      href="/events/"
      data-home-upcoming-event-button
      data-home-upcoming-event-url="/api/next-event.json"
      data-home-upcoming-event-fallback="Upcoming Event"
    >
      <span data-home-upcoming-event-label>Upcoming Event</span> <i class="fas fa-calendar-alt ms-2"></i>
    </a>
  </p>
</div>

<script src="/js/node-counter.js" defer></script>
<script src="/js/home-events-button.js" defer></script>

{{< /blocks/cover >}}

{{% blocks/lead color="primary" %}}

Hoosier Mesh is a community-driven initiative focused on promoting the use of [Meshtastic](https://meshtastic.org), an open-source mesh communication technology. The goal is  create a resilient, decentralized communication infrastructure throughout the state of Indiana.

<div class="home-stats">
{{< discord-counter >}}
{{< node-counter >}}
<div class="node-counter node-counter--static" aria-label="Counties 31" data-node-counter data-node-start="0" data-node-duration="2200" data-node-target="31">
<div class="node-counter__label">Counties</div>
<div class="node-counter__value">
<span data-node-count>31</span>
</div>
</div>
</div>

{{% /blocks/lead %}}

{{% blocks/section color="white" type="row" %}}

{{% blocks/feature icon="fa-circle-question" title="What the mesh?" url="https://meshtastic.org/docs/introduction" %}}

Learn more about Meshtastic here

{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-github" title="Contributions welcome!" url="https://github.com/hoosiermesh/hoosiermesh.org" %}}

You too can improve this website

{{% /blocks/feature %}}

{{% blocks/feature icon="fas fa-user-group" title="Join our ranks" url="https://hoosiermesh.org/community" %}}

Connect with user mesh users

{{% /blocks/feature %}}

{{% /blocks/section %}}

{{% blocks/section type="row text-center" color="secondary" %}}

# Our friends

<div style="display: flex; justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap; margin-top: 2rem;">
  <a href="https://btownmesh.org/" target="_blank"><img src="/images/btownmesh.webp" alt="BTown Mesh" style="max-height: 150px; max-width: 225px;"></a>
  <a href="https://www.cimesh.net/" target="_blank"><img src="/images/cimn.webp" alt="CIMN" style="max-height: 150px;"></a>
  <a href="https://nwimesh.net/" target="_blank"><img src="/images/nwimesh.webp" alt="NWI Mesh" style="max-height: 150px;"></a>
  <a href="https://simnetwork.org/" target="_blank"><img src="/images/simnet.webp" alt="SIMNET" style="max-height: 195px;"></a>
</div>

{{% /blocks/section %}}