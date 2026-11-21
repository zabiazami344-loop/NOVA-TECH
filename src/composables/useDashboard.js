import { ref, computed, watch } from 'vue'
import { localStorageAvailable, readStorage, writeStorage } from '@/utils/storage'
import {
  PROJECTS_KEY,
  initialProjects,
  CONTACT_MESSAGES_KEY,
  teamMembers,
  sampleUsers,
  intents,
} from '@/data/dashboard'
import { services } from '@/data/services'

/**
 * useDashboard - all the state and logic behind the admin dashboard.
 *
 * The original dashboard.js was ~525 lines, of which roughly 300 were DOM
 * plumbing:
 *
 *   renderOverview()          -> one computed per value, rendered by <template>
 *   renderRecentProjectsTable -> a v-for
 *   renderManageProjects()    -> a v-for; the two querySelectorAll blocks that
 *                                bound every <select> and every delete button
 *                                become @change / @click in the template
 *   renderServicesPanel()     -> a v-for
 *   renderTeamPanel()         -> a v-for
 *   renderIntentsPanel()      -> a v-for
 *   renderMessagesPanel()     -> a v-for
 *   renderUsersPanel()        -> a v-for
 *   getAllMessages()          -> a computed
 *   saveProjects()            -> a watch
 *
 * The important consequence: the original had to remember to call renderOverview()
 * AND renderManageProjects() after every mutation. Here a mutation just changes a
 * ref, and every dependent computed re-evaluates by itself - a forgotten call is
 * no longer possible.
 */

/**
 * Loads the managed project list, falling back to a fresh copy of the seed list.
 *
 * A .slice() is required rather than referencing initialProjects directly: the
 * list is mutated (unshift / status writes / filter), and without the copy those
 * edits would permanently corrupt the seed data for the rest of the session.
 */
function loadProjects() {
  const stored = readStorage(PROJECTS_KEY, null)
  if (Array.isArray(stored)) return stored
  return initialProjects.slice()
}

const projects = ref(loadProjects())
const storageError = ref(!localStorageAvailable)

/** Persist whenever the list changes, replacing the original's saveProjects() calls. */
watch(projects, (value) => {
  if (!writeStorage(PROJECTS_KEY, value)) storageError.value = true
}, { deep: true })

/**
 * Saved contact-form messages only. The inbox stays empty until a real local
 * submission exists; sample customer inquiries are never presented as real.
 * Reactive, so the Messages panel and the Overview card update together.
 */
const initialMessages = readStorage(CONTACT_MESSAGES_KEY, null)
const storedMessages = ref(Array.isArray(initialMessages) ? initialMessages : [])
const READ_MESSAGES_KEY = 'novatech_read_contact_messages'
const ACTIVITY_KEY = 'novatech_dashboard_activity'
const initialReadIds = readStorage(READ_MESSAGES_KEY, [])
const readMessageIds = ref(Array.isArray(initialReadIds) ? initialReadIds : [])
const activities = ref(readStorage(ACTIVITY_KEY, []))
if (initialMessages !== null && !Array.isArray(initialMessages)) storageError.value = true

function recordActivity(title, detail) {
  const entry = {
    id: Date.now(),
    title,
    detail,
    createdAt: new Date().toISOString(),
  }
  const current = Array.isArray(activities.value) ? activities.value : []
  activities.value = [entry, ...current].slice(0, 8)
  if (!writeStorage(ACTIVITY_KEY, activities.value)) storageError.value = true
}

function refreshMessages() {
  const stored = readStorage(CONTACT_MESSAGES_KEY, null)
  storedMessages.value = Array.isArray(stored) ? stored : []
  if (stored !== null && !Array.isArray(stored)) storageError.value = true
  const readIds = readStorage(READ_MESSAGES_KEY, [])
  readMessageIds.value = Array.isArray(readIds) ? readIds : []
  const savedActivities = readStorage(ACTIVITY_KEY, [])
  activities.value = Array.isArray(savedActivities) ? savedActivities : []
}

function onContactMessage(event) {
  refreshMessages()
  const message = event.detail?.message
  if (message) {
    recordActivity('New inquiry received', `${message.name} · ${message.subject}`)
  }
}

function markMessagesRead() {
  const realMessages = Array.isArray(storedMessages.value) ? storedMessages.value : []
  const ids = realMessages.map((message) => message.id).filter(Boolean)
  readMessageIds.value = ids
  if (!writeStorage(READ_MESSAGES_KEY, ids)) storageError.value = true
}

function setMessageRead(message, isRead) {
  if (message.id === undefined || message.id === null) return

  const ids = new Set(readMessageIds.value)
  if (isRead) ids.add(message.id)
  else ids.delete(message.id)

  readMessageIds.value = [...ids]
  if (!writeStorage(READ_MESSAGES_KEY, readMessageIds.value)) storageError.value = true
}

function markMessageRead(message) {
  setMessageRead(message, true)
}

function markMessageUnread(message) {
  setMessageRead(message, false)
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (
      event.key === CONTACT_MESSAGES_KEY
      || event.key === READ_MESSAGES_KEY
      || event.key === ACTIVITY_KEY
    ) refreshMessages()
  })
  window.addEventListener('novatech:contact-message', onContactMessage)
}

const messages = computed(() => storedMessages.value)

const unreadCount = computed(() => {
  if (!Array.isArray(storedMessages.value) || storedMessages.value.length === 0) return 0
  const readIds = new Set(readMessageIds.value)
  return storedMessages.value.filter((message) => !readIds.has(message.id)).length
})

function isMessageUnread(message) {
  return Boolean(message.id) && !readMessageIds.value.includes(message.id)
}

/** Counts come from current local/catalogue records, not fabricated growth data. */
const overviewStats = computed(() => ({
  projectCount: projects.value.length,
  serviceCount: services.length,
  messageCount: messages.value.length,
  teamCount: teamMembers.length,
  userCount: sampleUsers.length,
  intentCount: intents.length,
}))

/** Newest first 5 for the overview table. */
const recentProjects = computed(() => projects.value.slice(0, 5))

/** Newest first 3 for the overview list. */
const recentMessages = computed(() => messages.value.slice(0, 3))

/** Sets a project's status. The original re-rendered two panels here. */
function setProjectStatus(id, status) {
  const project = projects.value.find((item) => item.id === id)
  if (project && project.status !== status) {
    project.status = status
    recordActivity('Project status updated', `${project.name} · ${status}`)
  }
}

/** Removes a project by id. */
function deleteProject(id) {
  const project = projects.value.find((item) => item.id === id)
  if (!project) return
  projects.value = projects.value.filter((item) => item.id !== id)
  recordActivity('Project removed', project.name)
}

function deleteMessage(id) {
  const current = Array.isArray(storedMessages.value) ? storedMessages.value : []
  const message = current.find((item) => item.id === id)
  if (!message) return false

  const nextMessages = current.filter((item) => item.id !== id)
  if (!writeStorage(CONTACT_MESSAGES_KEY, nextMessages)) {
    storageError.value = true
    return false
  }

  storedMessages.value = nextMessages
  readMessageIds.value = readMessageIds.value.filter((messageId) => messageId !== id)
  if (!writeStorage(READ_MESSAGES_KEY, readMessageIds.value)) storageError.value = true
  recordActivity('Inquiry deleted', `${message.name} · ${message.subject}`)
  return true
}

/**
 * Adds a project to the FRONT of the list.
 * @returns the new project.
 */
function addProject({ name, category, client, year, status }) {
  const newProject = {
    id: Date.now(),
    name,
    category,
    client: client || 'Unknown client',
    year,
    status,
  }
  projects.value.unshift(newProject)
  recordActivity('Project added', newProject.name)
  return newProject
}

export function useDashboard() {
  return {
    projects,
    messages,
    activities,
    storageError,
    overviewStats,
    recentProjects,
    recentMessages,
    unreadCount,
    isMessageUnread,
    markMessagesRead,
    markMessageRead,
    markMessageUnread,
    deleteMessage,
    refreshMessages,
    setProjectStatus,
    deleteProject,
    addProject,
  }
}
