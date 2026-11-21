<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
import DashboardTopbar from '@/components/dashboard/DashboardTopbar.vue'
import OverviewPanel from '@/components/dashboard/panels/OverviewPanel.vue'
import ProjectsPanel from '@/components/dashboard/panels/ProjectsPanel.vue'
import ServicesPanel from '@/components/dashboard/panels/ServicesPanel.vue'
import TeamPanel from '@/components/dashboard/panels/TeamPanel.vue'
import IntentsPanel from '@/components/dashboard/panels/IntentsPanel.vue'
import MessagesPanel from '@/components/dashboard/panels/MessagesPanel.vue'
import UsersPanel from '@/components/dashboard/panels/UsersPanel.vue'
import SettingsPanel from '@/components/dashboard/panels/SettingsPanel.vue'
import { useDashboard } from '@/composables/useDashboard'

/**
 * DashboardView - the admin area.
 *
 * The original had initDashboard(user) wire up two logout buttons, the sidebar
 * and then call eight render*() functions in a row. Here:
 *   - logout is one function used by both buttons
 *   - the sidebar/topbar share a single `activePanel` ref
 *   - the eight panels are static imports resolved by a lookup, so there is
 *     nothing to "render"
 *
 * The auth guard itself lives in the router (see meta.requiresAuth there), which
 * is the only place that can redirect before a component is created - the
 * original did it inside dashboard.js on DOMContentLoaded, which meant the
 * dashboard markup briefly rendered for a logged-out visitor.
 */
const router = useRouter()
const { currentUser, logout } = useAuth()
const { storageError } = useDashboard()

const activePanel = ref('overview')

/** The panel component for the active id. Null if the id is unknown. */
const activeComponent = computed(
  () =>
    ({
      overview: OverviewPanel,
      projects: ProjectsPanel,
      services: ServicesPanel,
      team: TeamPanel,
      intents: IntentsPanel,
      messages: MessagesPanel,
      users: UsersPanel,
      settings: SettingsPanel,
    })[activePanel.value] ?? OverviewPanel,
)

function onLogout() {
  logout()
  router.push('/login')
}

function onSelectPanel(panel) {
  activePanel.value = panel
}
</script>

<template>
  <div class="dashboard dashboard--premium">
    <DashboardSidebar
      v-if="currentUser"
      :active-panel="activePanel"
      :user="currentUser"
      @select="onSelectPanel"
      @logout="onLogout"
    />

    <main class="dashboard__main">
      <DashboardTopbar
        v-if="currentUser"
        :user="currentUser"
        :active-panel="activePanel"
        @logout="onLogout"
        @select="onSelectPanel"
      />

      <div v-if="storageError" class="dashboard__storage-error" role="alert">
        <strong>Browser storage is unavailable.</strong>
        <span>Some dashboard changes may not be saved in this browser session.</span>
      </div>

      <!--
        One <component :is> instead of eight <section> elements each toggling a
        .active class. No props are passed: each panel pulls what it needs from
        useDashboard() / useAuth(), which keeps the call site uniform.
        The router guard guarantees currentUser exists by the time this renders,
        but the v-if is a cheap safety net.
      -->
      <Transition name="dashboard-panel" mode="out-in">
        <section v-if="currentUser" :key="activePanel" class="panel active">
          <component :is="activeComponent" />
        </section>
      </Transition>
    </main>
  </div>
</template>
