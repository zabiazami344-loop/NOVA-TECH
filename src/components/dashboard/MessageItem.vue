<script setup>
import { formatDate } from '@/utils/strings'
import { useModal } from '@/composables/useModal'
import MessageDetailModal from '@/components/modals/MessageDetailModal.vue'

/**
 * MessageItem - one row in a message list.
 *
 * Used twice: the Overview panel (newest 3) and the Messages panel (all of
 * them). The original had buildMessageItem() returning a template string, and
 * called it from both renderRecentMessagesList() and renderMessagesPanel().
 */
defineProps({
  message: { type: Object, required: true },
  unread: { type: Boolean, default: false },
})

const { openModal } = useModal()

function openMessage(message) {
  openModal(MessageDetailModal, { message })
}

</script>

<template>
  <button
    type="button"
    class="message-list__item"
    :class="{ 'message-list__item--unread': unread }"
    :aria-label="`Open message from ${message.name}`"
    @click="openMessage(message)"
  >
    <div>
      <div class="message-list__info">
        <strong>{{ message.name }} ({{ message.email }})</strong>
        <span>{{ formatDate(message.createdAt) }} &middot; {{ message.subject }}</span>
      </div>
      <p class="message-list__text">{{ message.text }}</p>
    </div>
    <span v-if="unread" class="message-list__new">New</span>
  </button>
</template>
