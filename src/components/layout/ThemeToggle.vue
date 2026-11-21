<script setup>
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <!--
    There is deliberately no <style> block. The icon swap is already handled
    globally in style.css (.theme-toggle__icon--sun is hidden, and the
    html[data-theme="dark"] override reveals it) - so all this component has to
    do is supply the click handler and the ARIA state.
  -->
  <button
    class="theme-toggle"
    aria-label="Toggle dark mode"
    title="Toggle dark mode"
    :aria-pressed="isDark ? 'true' : 'false'"
    @click="toggleTheme"
  >
    <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.4 15.1A8.7 8.7 0 0 1 8.9 3.6 8.8 8.8 0 1 0 20.4 15.1Z" />
      </svg>
    </span>
    <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
    </span>
  </button>
</template>
