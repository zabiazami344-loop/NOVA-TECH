<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
})

const iconPaths = {
  overview: ['M3 3h8v8H3z', 'M14 3h7v5h-7z', 'M14 10h7v11h-7z', 'M3 14h8v7H3z'],
  projects: ['M3 7.5h7l2 2H21v10.5H3z', 'M3 7.5V5h7l2 2'],
  services: ['M4 5h16v14H4z', 'M8 9h8', 'M8 13h5', 'M8 17h3'],
  team: ['M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20', 'M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M17 11a3 3 0 1 0-1.2-5.75', 'M17 14.5a4 4 0 0 1 4 4V20'],
  intents: ['M12 3v3', 'M12 18v3', 'M3 12h3', 'M18 12h3', 'm5.64 5.64 2.12 2.12', 'm16.24 16.24 2.12 2.12', 'm18.36 5.64-2.12 2.12', 'm7.76 16.24-2.12 2.12', 'M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z'],
  messages: ['M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z'],
  users: ['M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20', 'M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M17 11a3 3 0 1 0-1.2-5.75', 'M17 14.5a4 4 0 0 1 4 4V20'],
  settings: ['M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z', 'M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 2.94-.08-.02a1.7 1.7 0 0 0-1.79.63l-.04.07h-3.4l-.04-.07a1.7 1.7 0 0 0-1.79-.63l-.08.02-1.7-2.94.06-.06A1.7 1.7 0 0 0 9.6 15l-.08-.04v-3.4l.08-.04a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.7-2.94.08.02a1.7 1.7 0 0 0 1.79-.63l.04-.07h3.4l.04.07a1.7 1.7 0 0 0 1.79.63l.08-.02 1.7 2.94-.06.06A1.7 1.7 0 0 0 19.4 11.5l.08.04v3.4z'],
  logout: ['M10 17l5-5-5-5', 'M15 12H3', 'M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6'],
  greeting: ['M20 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1.2-4A8.5 8.5 0 1 1 20 11.5z', 'M8 11h.01', 'M12 11h.01', 'M16 11h.01'],
  pricing: ['M12 3v18', 'M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  refund: ['M3 12a9 9 0 1 0 2.64-6.36L3 8', 'M3 3v5h5', 'M12 7v5l3 2'],
  booking: ['M7 3v4', 'M17 3v4', 'M4 9h16', 'M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1z', 'm9 15 2 2 4-4'],
  support: ['M4 13v-2a8 8 0 0 1 16 0v2', 'M4 13h3v6H6a2 2 0 0 1-2-2z', 'M20 13h-3v6h1a2 2 0 0 0 2-2z', 'M17 19a5 5 0 0 1-5 2'],
  service: ['M4 7h16', 'M4 12h16', 'M4 17h16', 'M8 4 5 7l3 3', 'M16 14l3 3-3 3'],
}

const paths = computed(() => iconPaths[props.name] ?? iconPaths.overview)
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(path, index) in paths" :key="index" :d="path" />
  </svg>
</template>
