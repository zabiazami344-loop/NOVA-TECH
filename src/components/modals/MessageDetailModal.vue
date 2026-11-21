<script setup>
import { computed, ref } from 'vue'
import { formatDateTime } from '@/utils/strings'
import { serviceOptions } from '@/data/contact'
import { useModal } from '@/composables/useModal'
import { useDashboard } from '@/composables/useDashboard'

const props = defineProps({
  message: { type: Object, required: true },
  unread: { type: Boolean, default: false },
})

const { closeModal } = useModal()
const { markMessageUnread, deleteMessage } = useDashboard()
const deleteConfirmationVisible = ref(false)
const deleteError = ref('')
const projectName = computed(() => {
  const selected = serviceOptions.find((option) => option.value === props.message.service)
  return selected?.label || props.message.project || 'Not specified'
})

const phone = computed(() => props.message.phone?.trim() || 'Not provided')

function markUnread() {
  markMessageUnread(props.message)
  closeModal()
}

function confirmDelete() {
  deleteError.value = ''
  if (!deleteMessage(props.message.id)) {
    deleteError.value = 'The inquiry could not be deleted. Check browser storage and try again.'
    return
  }
  closeModal()
}
</script>

<template>
  <div class="message-detail">
    <span class="message-detail__label">Customer inquiry</span>
    <h3>{{ message.name }}</h3>

    <div class="message-detail__grid">
      <div class="message-detail__field">
        <span>Email</span>
        <a :href="`mailto:${message.email}`">{{ message.email || 'Not provided' }}</a>
      </div>

      <div class="message-detail__field">
        <span>Phone number</span>
        <a v-if="message.phone" :href="`tel:${message.phone}`">{{ phone }}</a>
        <strong v-else>{{ phone }}</strong>
      </div>

      <div class="message-detail__field">
        <span>Project / Service</span>
        <strong>{{ projectName }}</strong>
      </div>

      <div class="message-detail__field">
        <span>Received</span>
        <strong>{{ formatDateTime(message.createdAt) }}</strong>
      </div>
    </div>

    <div class="message-detail__subject">
      <span>Subject</span>
      <strong>{{ message.subject || 'No subject' }}</strong>
    </div>

    <div class="message-detail__body">
      <span>Message</span>
      <p>{{ message.text || 'No message provided.' }}</p>
    </div>

    <footer class="message-detail__actions">
      <a v-if="message.email" class="message-detail__reply" :href="`mailto:${message.email}`">
        Reply to customer <span aria-hidden="true">↗</span>
      </a>
      <button v-if="message.id && !unread" type="button" class="message-detail__mark-unread" @click="markUnread">
        Mark as unread
      </button>
      <button
        v-if="message.id"
        type="button"
        class="message-detail__delete"
        @click="deleteConfirmationVisible = true"
      >
        Delete inquiry
      </button>
    </footer>

    <div v-if="deleteConfirmationVisible" class="message-detail__confirm" role="group" aria-labelledby="message-delete-title">
      <strong id="message-delete-title">Delete this inquiry?</strong>
      <p>This permanently removes it from this browser’s saved messages.</p>
      <p v-if="deleteError" class="message-detail__delete-error">{{ deleteError }}</p>
      <div>
        <button type="button" class="message-detail__cancel" @click="deleteConfirmationVisible = false">
          Keep message
        </button>
        <button type="button" class="message-detail__confirm-delete" @click="confirmDelete">
          Delete permanently
        </button>
      </div>
    </div>
  </div>
</template>
