<script setup>
</script>

<template>
  <section class="hero">
    <div class="hero__background" aria-hidden="true"></div>

    <div class="container hero__inner">
      <div class="hero__content">
        <span class="hero__badge">Product engineering · AI · Security · Cloud</span>

        <h1 class="hero__title">
          Building the <span class="text-gradient">Future</span> of Technology
        </h1>

        <p class="hero__subtitle">
          NOVA TECH designs and ships cutting-edge web platforms, mobile apps, AI
          systems and secure cloud solutions that help your business grow faster
          and smarter.
        </p>

        <div class="hero__buttons">
          <router-link to="/contact" class="btn btn--primary hero__cta hero__cta--primary">
            <span>Get Started</span>
            <span class="hero__cta-arrow" aria-hidden="true">→</span>
          </router-link>
          <router-link to="/projects" class="btn btn--outline hero__cta hero__cta--secondary">
            View Projects
          </router-link>
        </div>

      </div>

      <!-- Decorative animated graphic. Purely CSS - no JS involved. -->
      <div class="hero__visual" aria-hidden="true">
        <div class="tech-visual">
          <div class="tech-visual__grid"></div>

          <div class="tech-visual__core">
            <span class="tech-visual__icon">&#9883;</span>
            <span class="tech-visual__icon tech-visual__icon--2">&#9670;</span>
            <span class="tech-visual__icon tech-visual__icon--3">&#9679;</span>
            <span class="tech-visual__icon tech-visual__icon--4">&#10022;</span>
            <span class="tech-visual__ring tech-visual__ring--1"></span>
            <span class="tech-visual__ring tech-visual__ring--2"></span>
          </div>

          <div class="tech-visual__card tech-visual__card--1">AI</div>
          <div class="tech-visual__card tech-visual__card--2">WEB</div>
          <div class="tech-visual__card tech-visual__card--3">CLOUD</div>
        </div>
      </div>
    </div>
  </section>
</template>
