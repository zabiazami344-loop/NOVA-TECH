<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/strings'
import { serviceOptions } from '@/data/contact'

const props = defineProps({
  message: { type: Object, required: true },
})

const projectName = computed(() => {
  const selected = serviceOptions.find((option) => option.value === props.message.service)
  return selected?.label || props.message.project || 'Not specified'
})

const phone = computed(() => props.message.phone?.trim() || 'Not provided')
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
        <strong>{{ formatDate(message.createdAt) }}</strong>
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
  </div>
</template>
