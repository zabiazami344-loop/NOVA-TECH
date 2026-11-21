<script setup>
import ServiceIcon from '@/components/ui/ServiceIcon.vue'
import { services } from '@/data/services'

/**
 * ServicesPanel - a read-only overview of the six service lines.
 *
 * Replaces renderServicesPanel(), which built the grid as a template string and
 * assigned grid.innerHTML. Vue needs no such step: the list is static data and
 * the markup is a v-for.
 */
</script>

<template>
  <div class="panel__header">
    <div>
      <h2 class="panel__title">Service Catalogue</h2>
      <p class="panel__sub">An overview of what NOVA TECH offers.</p>
    </div>
  </div>

  <div class="dash-services">
    <div v-for="service in services" :key="service.id" class="service-card">
      <div class="service-card__icon" aria-hidden="true">
        <ServiceIcon :name="service.icon" />
      </div>
      <h3 class="service-card__title">{{ service.title }}</h3>
      <p class="service-card__desc">{{ service.description }}</p>
    </div>
  </div>
</template>
