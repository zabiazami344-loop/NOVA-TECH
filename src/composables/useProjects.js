import { ref } from 'vue'
import { projects as projectCatalogue } from '@/data/projects'

const projects = ref(projectCatalogue.slice())
const loading = ref(false)
const error = ref('')

export function useProjects() {
  function loadProjects() {
    return Promise.resolve(projects.value)
  }

  return { projects, loading, error, loadProjects }
}
