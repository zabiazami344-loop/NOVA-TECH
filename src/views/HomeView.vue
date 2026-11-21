<script setup>
import HeroSection from '@/components/home/HeroSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import FeaturedTeam from '@/components/home/FeaturedTeam.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import PricingSection from '@/components/home/PricingSection.vue'
import FaqSection from '@/components/home/FaqSection.vue'
import NewsletterSection from '@/components/home/NewsletterSection.vue'
</script>

<template>
  <!--
    The homepage is now a stack of 8 independent section components. Each one
    owns its own data and behaviour and knows nothing about the others.

    Compare with the original index.html: 663 lines of one flat file where the
    navbar, hero, six service cards, pricing table, FAQ accordion and newsletter
    form were all tangled together, plus 384 lines of main.js that had to find
    each piece again with querySelector and re-bind it after every render.
  -->
  <HeroSection />
  <ServicesSection />
  <FeaturedProjects />
  <FeaturedTeam />
  <AboutSection />
  <PricingSection />
  <FaqSection />
  <NewsletterSection />
</template>
