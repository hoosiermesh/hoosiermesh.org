---
title: Hoosier Mesh
---

<style>
  .td-heading-self-link {
    display: none;
  }

  .td-home .td-cover-block {
    height: 520px;
    min-height: 520px;
  }

  .td-home .td-cover-block .col-12,
  .td-home .td-cover-block .container {
    height: 100%;
  }

  .td-home .td-cover-block .container {
    position: relative;
    z-index: 2;
  }

  .hero-logo-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 1;
    padding-bottom: clamp(90px, 18vh, 150px);
    box-sizing: border-box;
  }

  .hero-logo-overlay img {
    width: 32vw;
    max-width: 380px;
    height: auto;
    transform: translateY(-40px);
  }

  .td-home .td-cover-block .text-center {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .td-home .td-cover-block .text-center .lead {
    margin-top: auto;
    padding-bottom: 1.5rem;
  }
</style>

{{< blocks/cover image_anchor="top" height="max" >}}

<div class="hero-logo-overlay">
  <img src="/images/hoosermesh-logo.svg" alt="Hoosier Mesh logo" loading="eager" decoding="async">
</div>

<a class="btn btn-lg btn-primary me-3 mb-4" href="/docs/getting-started/get-a-node/">
  Get a node <i class="fas fa-arrow-alt-circle-right ms-2"></i>
</a>
<a class="btn btn-lg btn-secondary me-3 mb-4" href="https://discord.gg/VrFcGTrw6V" target="_blank">
  Join Discord <i class="fab fa-discord ms-2 "></i>
</a>

{{< /blocks/cover >}}

{{% blocks/lead color="primary" %}}

Hoosier Mesh is a community-driven initiative focused on promoting the use of [Meshtastic](https://meshtastic.org), an open-source mesh communication technology. The goal is  create a resilient, decentralized communication infrastructure throughout the state of Indiana.

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
  <a href="https://btownmesh.org/" target="_blank"><img src="/images/btownmesh.webp" alt="BTown Mesh" style="max-height: 100px; max-width: 150px;"></a>
  <a href="https://www.cimesh.net/" target="_blank"><img src="/images/cimn.webp" alt="CIMN" style="max-height: 100px;"></a>
  <a href="https://nwimesh.net/" target="_blank"><img src="/images/nwimesh.webp" alt="NWI Mesh" style="max-height: 100px;"></a>
  <a href="https://simnetwork.org/" target="_blank"><img src="/images/simnet.webp" alt="SIMNET" style="max-height: 130px;"></a>
</div>

{{% /blocks/section %}}