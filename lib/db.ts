import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function getProjects() {
  const result = await sql`
    SELECT * FROM projects
    ORDER BY created_at DESC
  `
  return result
}

export async function getProjectById(id: number) {
  const [result] = await sql`
    SELECT * FROM projects
    WHERE id = ${id}
  `
  return result
}

export async function getDiagramsByProjectId(projectId: number) {
  const result = await sql`
    SELECT * FROM diagrams
    WHERE project_id = ${projectId}
    ORDER BY created_at DESC
  `
  return result
}

export async function getDiagramById(id: number) {
  const [result] = await sql`
    SELECT * FROM diagrams
    WHERE id = ${id}
  `
  return result
}

export async function createProjectInDb(name: string, description: string | null) {
  const [result] = await sql`
    INSERT INTO projects (name, description)
    VALUES (${name}, ${description})
    RETURNING id
  `
  return result.id
}

export async function createDiagramInDb(projectId: number, name: string, description: string | null) {
  const [result] = await sql`
    INSERT INTO diagrams (project_id, name, description)
    VALUES (${projectId}, ${name}, ${description})
    RETURNING id
  `
  return result.id
}

export async function updateDiagramInDb(diagramId: number, nodes: any[], edges: any[]) {
  await sql`
    UPDATE diagrams
    SET nodes = ${JSON.stringify(nodes)}, edges = ${JSON.stringify(edges)}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${diagramId}
  `
}

