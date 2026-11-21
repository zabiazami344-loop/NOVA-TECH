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
        <span aria-hidden="true">🔔</span>
        <span v-if="unreadCount" class="notification-button__badge">
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>
      </button>

      <span class="topbar__avatar" :title="`${user.name} · ${user.email}`">{{ initial }}</span>

      <button type="button" class="btn btn--ghost btn--sm" @click="$emit('logout')">Logout</button>
    </div>
  </header>
</template>
