<script setup>
import Badge from '@/components/ui/Badge.vue'
import MessageItem from '@/components/dashboard/MessageItem.vue'
import DashboardIcon from '@/components/dashboard/DashboardIcon.vue'
import { capitalize, formatDateTime } from '@/utils/strings'
import { overviewCards } from '@/data/dashboard'
import { useDashboard } from '@/composables/useDashboard'

/**
 * OverviewPanel - the six stat cards, the recent projects table and the recent
 * messages list.
 *
 * renderOverview() in the original assigned each value with
 * document.getElementById('card-x').textContent = ... . Here the cards are
 * declared as data (overviewCards) and each reads its value out of one computed
 * via `stats[card.source]`, so a new card is one line of data, not a new id in
 * the HTML plus a new line in dashboard.js.
 */
const {
  overviewStats,
  recentProjects,
  recentMessages,
  unreadCount,
  isMessageUnread,
  activities,
} = useDashboard()
</script>

<template>
  <div class="overview__notice">
    <span aria-hidden="true">i</span>
    <p>
      Local workspace overview. The project list starts with sample entries;
      inquiries are stored in this browser. Users, team and intents are sample
      records. No remote database is configured.
    </p>
  </div>

  <div class="dash-cards">
    <article v-for="card in overviewCards" :key="card.id" class="dash-card">
      <div class="dash-card__top">
        <div class="dash-card__label">{{ card.label }}</div>
        <span class="dash-card__icon"><DashboardIcon :name="card.icon" /></span>
      </div>
      <div class="dash-card__value">{{ overviewStats[card.source] }}</div>
      <div class="dash-card__note">
        {{ card.note }}
        <span v-if="card.id === 'messages'"> · {{ unreadCount }} unread</span>
      </div>
    </article>
  </div>

  <div class="overview__columns">
    <section class="panel-card">
      <div class="panel-card__heading">
        <div>
          <h2 class="panel-card__title">Recent Projects</h2>
          <p>Current local project records</p>
        </div>
      </div>

      <div v-if="recentProjects.length" class="dash-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Year</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in recentProjects" :key="project.id">
              <td><strong>{{ project.name }}</strong><small>{{ project.client }}</small></td>
              <td>{{ capitalize(project.category) }}</td>
              <td>{{ project.year }}</td>
              <td><Badge :label="project.status" :tone="project.status" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="overview__empty">No project records yet.</div>
    </section>

    <section class="panel-card overview__activity-card">
      <div class="panel-card__heading">
        <div>
          <h2 class="panel-card__title">Recent Activity</h2>
          <p>Actions recorded in this browser</p>
        </div>
      </div>

      <div v-if="activities.length" class="activity-list">
        <article v-for="activity in activities.slice(0, 6)" :key="activity.id" class="activity-list__item">
          <span class="activity-list__marker" aria-hidden="true"></span>
          <div>
            <strong>{{ activity.title }}</strong>
            <p>{{ activity.detail }}</p>
            <time :datetime="activity.createdAt">{{ formatDateTime(activity.createdAt) }}</time>
          </div>
        </article>
      </div>
      <div v-else class="overview__empty">
        <span>No project or inquiry activity has been recorded yet.</span>
        <span>Changes made from this dashboard will appear here.</span>
      </div>
    </section>
  </div>

  <section class="panel-card overview__messages">
    <div class="panel-card__heading">
      <div>
        <h2 class="panel-card__title">Recent Messages</h2>
        <p>Latest contact form submissions</p>
      </div>
    </div>

    <div v-if="recentMessages.length" class="message-list">
      <MessageItem
        v-for="message in recentMessages"
        :key="message.id ?? message.createdAt + message.email"
        :message="message"
        :unread="isMessageUnread(message)"
      />
    </div>
    <div v-else class="overview__empty">No messages have been received yet.</div>
  </section>
</template>
