<script setup>
import { computed } from 'vue'
import { formatDateTime } from '@/utils/strings'
import { useModal } from '@/composables/useModal'
import { useDashboard } from '@/composables/useDashboard'
import { serviceOptions } from '@/data/contact'
import MessageDetailModal from '@/components/modals/MessageDetailModal.vue'

/**
 * MessageItem - one row in a message list.
 *
 * Used twice: the Overview panel (newest 3) and the Messages panel (all of
 * them). The original had buildMessageItem() returning a template string, and
 * called it from both renderRecentMessagesList() and renderMessagesPanel().
 */
const props = defineProps({
  message: { type: Object, required: true },
  unread: { type: Boolean, default: false },
})

const { openModal } = useModal()
const { markMessageRead } = useDashboard()
const initials = computed(() => {
  const nameParts = String(props.message.name ?? '').trim().split(/\s+/).filter(Boolean)
  return nameParts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join('') || '?'
})
const serviceName = computed(
  () => serviceOptions.find((option) => option.value === props.message.service)?.label ?? '',
)

function openMessage(message) {
  markMessageRead(message)
  openModal(MessageDetailModal, { message, unread: false })
}
</script>

<template>
  <button
    type="button"
    class="message-list__item"
    :class="{ 'message-list__item--unread': unread }"
    :aria-label="`Show more details for message from ${message.name}`"
    @click="openMessage(message)"
  >
    <span class="message-list__avatar" aria-hidden="true">{{ initials }}</span>
    <div class="message-list__item-content">
      <div class="message-list__heading">
        <div class="message-list__info">
          <strong>{{ message.name || 'Unknown sender' }}</strong>
          <span>{{ message.email || 'No email provided' }}</span>
        </div>
        <time class="message-list__date" :datetime="message.createdAt">
          {{ formatDateTime(message.createdAt) }}
        </time>
      </div>
      <div class="message-list__subject">
        <strong>{{ message.subject || 'No subject' }}</strong>
        <span v-if="serviceName" class="message-list__service">{{ serviceName }}</span>
      </div>
      <p class="message-list__text">{{ message.text || 'No message provided.' }}</p>
      <span class="message-list__details">
        Show more details <span aria-hidden="true">→</span>
      </span>
    </div>
    <span v-if="unread" class="message-list__unread-dot" aria-label="Unread"></span>
  </button>
</template>
