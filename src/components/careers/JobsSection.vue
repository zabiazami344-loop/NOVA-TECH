<script setup>
import SectionHead from '@/components/ui/SectionHead.vue'
import JobCard from '@/components/careers/JobCard.vue'
import { jobs } from '@/data/careers'
</script>

<template>
  <section class="jobs section-pad">
    <div class="container">
      <SectionHead tag="Example Roles" title="Career Page Preview" />

      <p class="content-disclosure">
        These sample role descriptions are for layout preview only. No vacancies or application system are configured.
      </p>

      <div class="jobs-grid">
        <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </div>
  </section>
</template>
