<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import CtaStrip from '@/components/layout/CtaStrip.vue'
import BlogExplorer from '@/components/explorers/BlogExplorer.vue'
</script>

<template>
  <main class="blog-view blog-live-background">
    <div class="blog-live-orbs" aria-hidden="true">
      <span class="blog-live-orb blog-live-orb--one"></span>
      <span class="blog-live-orb blog-live-orb--two"></span>
      <span class="blog-live-orb blog-live-orb--three"></span>
    </div>

    <PageHero
      title="Blog & Insights"
      crumb="Blog"
      desc="Explore editorial topics across software engineering, design, AI and security."
    />

    <BlogExplorer />

    <CtaStrip
      title="Explore the Portfolio Preview"
      desc="Browse example product concepts across our service areas."
      cta="View Projects"
      to="/projects"
    />
  </main>
</template>

<style scoped>
.blog-live-background {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 28%, rgba(16, 185, 129, 0.07), transparent 24rem),
    radial-gradient(circle at 88% 72%, rgba(100, 210, 255, 0.06), transparent 28rem);
}

.blog-live-background > :not(.blog-live-orbs) {
  position: relative;
  z-index: 1;
}

.blog-live-orbs {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.blog-live-orb {
  position: absolute;
  width: 22rem;
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.32;
  will-change: transform;
}

.blog-live-orb--one {
  top: 8%;
  left: -12rem;
  background: rgba(16, 185, 129, 0.22);
  animation: blogOrbOne 18s ease-in-out infinite alternate;
}

.blog-live-orb--two {
  top: 42%;
  right: -14rem;
  background: rgba(100, 210, 255, 0.18);
  animation: blogOrbTwo 22s ease-in-out infinite alternate;
}

.blog-live-orb--three {
  bottom: 4%;
  left: 38%;
  width: 17rem;
  background: rgba(183, 223, 101, 0.14);
  animation: blogOrbThree 16s ease-in-out infinite alternate;
}

@keyframes blogOrbOne {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(9rem, 16rem, 0) scale(1.12); }
}

@keyframes blogOrbTwo {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(-10rem, -12rem, 0) scale(1.18); }
}

@keyframes blogOrbThree {
  from { transform: translate3d(0, 0, 0) scale(0.95); }
  to { transform: translate3d(-6rem, -8rem, 0) scale(1.08); }
}

@media (prefers-reduced-motion: reduce) {
  .blog-live-orb {
    animation: none;
  }
}
</style>
