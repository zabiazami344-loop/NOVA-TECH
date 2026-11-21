<script setup>
import { computed } from 'vue'
import ThemeToggle from '@/components/layout/ThemeToggle.vue'
import { panelTitles } from '@/data/dashboard'
import { useDashboard } from '@/composables/useDashboard'

/**
 * DashboardTopbar - the title bar above the panels.
 *
 * The original set two of these nodes by hand on load:
 *   document.getElementById('user-email').textContent  = user.email;
 *   document.getElementById('user-avatar').textContent = user.name.charAt(0).toUpperCase();
 *   document.getElementById('topbar-title').textContent = panelTitles[panelName];
 *
 * All three are now bindings. The title is a computed off the active panel, and
 * the avatar is `name.charAt(0).toUpperCase()` evaluated in place.
 */
const props = defineProps({
  user: { type: Object, required: true },
  activePanel: { type: String, required: true },
})

const emit = defineEmits(['logout', 'select'])
const { unreadCount } = useDashboard()

const title = computed(() => panelTitles[props.activePanel] ?? 'Dashboard')
const initial = computed(() => props.user.name.charAt(0).toUpperCase())

function openMessages() {
  emit('select', 'messages')
}
</script>

<template>
  <header class="dashboard__topbar">
    <h1 class="topbar__title">{{ title }}</h1>

    <div class="topbar__user">
      <!-- The dashboard has its own dark-mode button, same as the original. -->
      <ThemeToggle />

      <button
        type="button"
        class="notification-button"
        :aria-label="unreadCount ? `${unreadCount} unread messages` : 'No unread messages'"
        title="Messages"
        @click="openMessages"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
        <span v-if="unreadCount" class="notification-button__badge">
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>
      </button>

      <span class="topbar__avatar" :title="user.name" :aria-label="`Signed in as ${user.name}`">{{ initial }}</span>

      <button type="button" class="btn btn--ghost btn--sm" @click="$emit('logout')">Logout</button>
    </div>
  </header>
</template>
