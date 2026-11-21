<script setup>
import { sidebarGroups } from '@/data/dashboard'
import { useDashboard } from '@/composables/useDashboard'
import DashboardIcon from '@/components/dashboard/DashboardIcon.vue'

/**
 * DashboardSidebar - the left-hand navigation.
 *
 * The original had initSidebarNav(), which for every one of the 8 links
 * attached a click handler that manually moved the .active class around:
 *
 *   for (const other of navLinks) other.classList.remove('active');
 *   link.classList.add('active');
 *   for (const panel of panels) panel.classList.remove('active');
 *   document.getElementById('panel-' + panelName).classList.add('active');
 *   document.getElementById('topbar-title').textContent = panelTitles[panelName];
 *
 * Now the parent holds a single `activePanel` ref and the :class binding does
 * the rest, and the topbar title is a computed off the same value - so the
 * heading can no longer disagree with the highlighted link.
 */
defineProps({
  activePanel: { type: String, required: true },
  user: { type: Object, required: true },
})

const emit = defineEmits(['select', 'logout'])
const { unreadCount } = useDashboard()

/** Routes a click to the right event: the logout link is an action, not a panel. */
function onLinkClick(link) {
  if (link.logout) emit('logout')
  else emit('select', link.id)
}
</script>

<template>
  <aside class="dashboard__sidebar">
    <!-- A RouterLink, not href="/": clicking the logo navigates without a page reload. -->
    <RouterLink to="/" class="sidebar__brand">
      <span class="sidebar__brand-icon">N</span>
      <span>NOVA<span>TECH</span></span>
    </RouterLink>

    <nav class="sidebar__nav">
      <template v-for="group in sidebarGroups" :key="group.title">
        <p class="sidebar__title">
          <span>{{ group.title }}</span>
          <span class="sidebar__title-rule" aria-hidden="true"></span>
        </p>

        <button
          v-for="link in group.links"
          :key="link.id"
          type="button"
          class="sidebar__link"
          :class="{
            active: activePanel === link.id,
            'sidebar__link--logout': link.logout,
          }"
          @click="onLinkClick(link)"
        >
          <span class="sidebar__nav-icon">
            <DashboardIcon :name="link.id === 'logout' ? 'logout' : link.id" />
          </span>
          <span class="sidebar__link-label">{{ link.label }}</span>
          <span
            v-if="link.id === 'messages' && unreadCount > 0"
            class="sidebar__badge"
            :aria-label="`${unreadCount} unread messages`"
          >
            {{ unreadCount > 99 ? '99+' : unreadCount }}
          </span>
        </button>
      </template>
    </nav>

    <div class="sidebar__profile">
      <span class="sidebar__profile-avatar" aria-hidden="true">
        {{ user.name.charAt(0).toUpperCase() }}
      </span>
      <span class="sidebar__profile-copy">
        <strong>{{ user.name }}</strong>
        <span>{{ user.role || 'Administrator' }}</span>
      </span>
      <span class="sidebar__profile-status" aria-label="Online"></span>
    </div>
  </aside>
</template>
