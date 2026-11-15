import { ref } from 'vue'

const projects = ref([])
const loading = ref(false)
const error = ref('')
let pendingRequest

export function useProjects() {
  function loadProjects() {
    if (pendingRequest) return pendingRequest

    loading.value = true
    error.value = ''
    pendingRequest = fetch('/api/projects')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Projects request failed (${response.status})`)
        }

        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('Projects API returned an invalid response')
        }

        projects.value = data
      })
      .catch((requestError) => {
        error.value = 'Could not load projects. Make sure the backend server is running, then refresh the page.'
        console.error('Could not load projects from the API:', requestError)
      })
      .finally(() => {
        loading.value = false
        pendingRequest = undefined
      })

    return pendingRequest
  }

  return { projects, loading, error, loadProjects }
}
