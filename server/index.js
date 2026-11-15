import { createServer } from 'node:http'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'
import { projects as seedProjects } from '../src/data/projects.js'

const serverDirectory = dirname(fileURLToPath(import.meta.url))
const databaseDirectory = join(serverDirectory, 'data')
mkdirSync(databaseDirectory, { recursive: true })

const database = new DatabaseSync(join(databaseDirectory, 'nova-tech.sqlite'))
database.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    imageText TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    longDescription TEXT NOT NULL,
    technologies TEXT NOT NULL,
    client TEXT NOT NULL,
    year INTEGER NOT NULL
  )
`)

const projectCount = database.prepare('SELECT COUNT(*) AS count FROM projects').get().count
if (projectCount === 0) {
  const insertProject = database.prepare(`
    INSERT INTO projects (
      id, name, category, imageText, image, description, longDescription,
      technologies, client, year
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  database.exec('BEGIN')
  try {
    for (const project of seedProjects) {
      insertProject.run(
        project.id,
        project.name,
        project.category,
        project.imageText,
        project.image,
        project.description,
        project.longDescription,
        JSON.stringify(project.technologies),
        project.client,
        project.year,
      )
    }
    database.exec('COMMIT')
  } catch (error) {
    database.exec('ROLLBACK')
    throw error
  }
}

const listProjects = database.prepare(`
  SELECT id, name, category, imageText, image, description, longDescription,
         technologies, client, year
  FROM projects
  ORDER BY id ASC
`)
const findProject = database.prepare(`
  SELECT id, name, category, imageText, image, description, longDescription,
         technologies, client, year
  FROM projects
  WHERE id = ?
`)

function serializeProject(project) {
  return { ...project, technologies: JSON.parse(project.technologies) }
}

function respond(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(JSON.stringify(data))
}

const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost')

  if (request.method !== 'GET') {
    respond(response, 405, { error: 'Method not allowed' })
    return
  }

  if (url.pathname === '/api/health') {
    respond(response, 200, { status: 'ok' })
    return
  }

  if (url.pathname === '/api/projects') {
    respond(response, 200, listProjects.all().map(serializeProject))
    return
  }

  const projectMatch = url.pathname.match(/^\/api\/projects\/(\d+)$/)
  if (projectMatch) {
    const project = findProject.get(Number(projectMatch[1]))
    if (!project) {
      respond(response, 404, { error: 'Project not found' })
      return
    }
    respond(response, 200, serializeProject(project))
    return
  }

  respond(response, 404, { error: 'Route not found' })
})

const port = Number(process.env.API_PORT ?? 3001)
server.listen(port, '127.0.0.1', () => {
  console.log(`NOVA TECH API ready at http://127.0.0.1:${port}`)
})

function shutdown() {
  server.close(() => {
    database.close()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
