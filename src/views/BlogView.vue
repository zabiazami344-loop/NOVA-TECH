<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import CtaStrip from '@/components/layout/CtaStrip.vue'
import BlogExplorer from '@/components/explorers/BlogExplorer.vue'
</script>

<template>
  <!--
    "Blog & Insights" is a static string, so writing it as-is in the template
    is clearer than routing it through the data file. Vue escapes the & for us.
  -->
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
</template>
