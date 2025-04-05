"use server"

import { createProjectInDb, createDiagramInDb, updateDiagramInDb } from "@/lib/db"

export async function createProject({
  name,
  description,
}: {
  name: string
  description: string
}) {
  return createProjectInDb(name, description || null)
}

export async function createDiagram({
  projectId,
  name,
  description,
}: {
  projectId: number
  name: string
  description: string
}) {
  return createDiagramInDb(projectId, name, description || null)
}

export async function saveDiagram({
  diagramId,
  nodes,
  edges,
}: {
  diagramId: number
  nodes: any[]
  edges: any[]
}) {
  return updateDiagramInDb(diagramId, nodes, edges)
}

