<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import CtaStrip from '@/components/layout/CtaStrip.vue'
import StorySection from '@/components/about/StorySection.vue'
import MissionSection from '@/components/about/MissionSection.vue'
import ValuesSection from '@/components/about/ValuesSection.vue'
</script>

<template>
  <PageHero
    title="About NOVA TECH"
    crumb="About"
    desc="A thoughtful approach to building useful, reliable digital products."
  />

  <StorySection />
  <MissionSection />
  <ValuesSection />

  <CtaStrip
    title="Want To Build Something Great Together?"
    desc="Let's talk about your project — no strings attached."
    cta="Get In Touch"
    to="/contact"
  />
</template>
