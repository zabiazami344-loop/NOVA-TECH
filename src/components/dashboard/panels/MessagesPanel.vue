<script setup>
import { computed, ref, watch } from 'vue'
import MessageItem from '@/components/dashboard/MessageItem.vue'
import DashboardIcon from '@/components/dashboard/DashboardIcon.vue'
import { serviceOptions } from '@/data/contact'
import { useDashboard } from '@/composables/useDashboard'

const {
  messages,
  unreadCount,
  isMessageUnread,
  markMessagesRead,
} = useDashboard()
const searchQuery = ref('')
const activeFilter = ref('all')
const selectedService = ref('')
const allReadNotice = ref(false)
const currentPage = ref(1)
const PAGE_SIZE = 10

const services = serviceOptions.filter((option) => option.value)

const filteredMessages = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return messages.value.filter((message) => {
    const service = services.find((option) => option.value === message.service)?.label ?? ''
    const matchesSearch = !query || [
      message.name,
      message.email,
      message.phone,
      message.subject,
      message.text,
      message.service,
      service,
    ].some((value) => String(value ?? '').toLowerCase().includes(query))
    const unread = isMessageUnread(message)
    const matchesReadState = activeFilter.value === 'all'
      || (activeFilter.value === 'unread' && unread)
      || (activeFilter.value === 'read' && !unread)
    const matchesService = !selectedService.value || message.service === selectedService.value

    return matchesSearch && matchesReadState && matchesService
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredMessages.value.length / PAGE_SIZE)))
const visibleMessages = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredMessages.value.slice(start, start + PAGE_SIZE)
})
const rangeStart = computed(() => (filteredMessages.value.length ? (currentPage.value - 1) * PAGE_SIZE + 1 : 0))
const rangeEnd = computed(() => Math.min(currentPage.value * PAGE_SIZE, filteredMessages.value.length))
const hasFilters = computed(
  () => Boolean(searchQuery.value || selectedService.value || activeFilter.value !== 'all'),
)

watch([searchQuery, activeFilter, selectedService], () => {
  currentPage.value = 1
})

watch(pageCount, (count) => {
  if (currentPage.value > count) currentPage.value = count
})

function clearFilters() {
  searchQuery.value = ''
  activeFilter.value = 'all'
  selectedService.value = ''
}

function markAllRead() {
  markMessagesRead()
  allReadNotice.value = true
}
</script>

<template>
  <section class="messages-page" aria-label="Message inbox">
    <header class="inbox__intro">
      <div>
        <p class="inbox__eyebrow">CUSTOMER INBOX</p>
        <p class="inbox__description">
          Review project inquiries and get back to customers.
        </p>
      </div>
      <button
        v-if="unreadCount > 0"
        type="button"
        class="inbox__mark-all"
        @click="markAllRead"
      >
        Mark all as read
      </button>
    </header>

    <p v-if="allReadNotice" class="inbox__confirmation" role="status">
      <span aria-hidden="true">✓</span> All current messages are marked as read.
    </p>

    <div class="inbox__stats" aria-label="Message counts">
      <div class="inbox__stat">
        <span class="inbox__stat-icon"><DashboardIcon name="messages" /></span>
        <div>
          <strong>{{ messages.length }}</strong>
          <span>Total messages</span>
        </div>
      </div>
      <div class="inbox__stat inbox__stat--unread">
        <span class="inbox__stat-icon"><DashboardIcon name="overview" /></span>
        <div>
          <strong>{{ unreadCount }}</strong>
          <span>Unread</span>
        </div>
      </div>
    </div>

    <div class="inbox__toolbar">
      <div class="inbox__filters" role="group" aria-label="Filter messages">
        <button
          type="button"
          class="inbox__filter"
          :class="{ 'is-active': activeFilter === 'all' }"
          :aria-pressed="activeFilter === 'all'"
          @click="activeFilter = 'all'"
        >
          All <span>{{ messages.length }}</span>
        </button>
        <button
          type="button"
          class="inbox__filter"
          :class="{ 'is-active': activeFilter === 'unread' }"
          :aria-pressed="activeFilter === 'unread'"
          @click="activeFilter = 'unread'"
        >
          Unread <span>{{ unreadCount }}</span>
        </button>
        <button
          type="button"
          class="inbox__filter"
          :class="{ 'is-active': activeFilter === 'read' }"
          :aria-pressed="activeFilter === 'read'"
          @click="activeFilter = 'read'"
        >
          Read <span>{{ messages.length - unreadCount }}</span>
        </button>
      </div>

      <div class="inbox__controls">
        <label class="inbox__search">
          <span aria-hidden="true">⌕</span>
          <input
            v-model="searchQuery"
            type="search"
            aria-label="Search messages"
            placeholder="Search name, email or message..."
          >
        </label>
        <label class="inbox__service-select">
          <span class="sr-only">Filter by service</span>
          <select v-model="selectedService" aria-label="Filter by service">
            <option value="">All services</option>
            <option v-for="service in services" :key="service.value" :value="service.value">
              {{ service.label }}
            </option>
          </select>
        </label>
      </div>
    </div>

    <div class="inbox__results" aria-live="polite">
      <span>
        Showing {{ rangeStart }}–{{ rangeEnd }} of {{ filteredMessages.length }}
        {{ filteredMessages.length === 1 ? 'conversation' : 'conversations' }}
      </span>
      <span v-if="hasFilters">
        filtered from {{ messages.length }}
      </span>
    </div>

    <div v-if="filteredMessages.length" class="message-list inbox__list">
      <MessageItem
        v-for="message in visibleMessages"
        :key="message.id ?? message.createdAt + message.email"
        :message="message"
        :unread="isMessageUnread(message)"
      />
    </div>

    <nav v-if="pageCount > 1" class="inbox__pagination" aria-label="Message pages">
      <button
        type="button"
        :disabled="currentPage === 1"
        @click="currentPage -= 1"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ pageCount }}</span>
      <button
        type="button"
        :disabled="currentPage === pageCount"
        @click="currentPage += 1"
      >
        Next
      </button>
    </nav>

    <div v-else class="inbox__empty">
      <span class="inbox__empty-icon"><DashboardIcon :name="hasFilters ? 'messages' : 'overview'" /></span>
      <h2>{{ hasFilters ? 'No conversations found' : 'No messages yet' }}</h2>
      <p>
        {{ hasFilters
          ? 'Try a different search or update your filters.'
          : 'Contact form inquiries will appear here when they are submitted.' }}
      </p>
      <button v-if="hasFilters" type="button" class="inbox__clear" @click="clearFilters">
        Clear filters
      </button>
    </div>
  </section>
</template>
