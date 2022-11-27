import { Project } from '@prisma/client'
import { db } from '../utils/db.server'
import { ProjectData, transformCepToLocation } from '../utils/transformCepToLocation'

type NewProjectData = Pick<Project, 'title' | 'zip_code' | 'deadline' | 'cost'>

export const create = async (username: string, project: NewProjectData): Promise<Project> => {
  return await db.project.create({
    data: {
      username,
      ...project
    }
  })
}

export const get = async (id: string): Promise<ProjectData | null> => {
  const project = await db.project.findUnique({ where: { id } })
  if (project === null) return null
  return await transformCepToLocation(project)
}

export const getAll = async (username: string): Promise<ProjectData[]> => {
  const projects = await db.project.findMany({ where: { username } })

  const projectsData = await Promise.all(
    projects.map(async (project) => await transformCepToLocation(project))
  )
  return projectsData
}

export const markAsDone = async (id: string): Promise<Project> => {
  return await db.project.update({
    data: { done: true },
    where: { id }
  })
}

export const remove = async (id: string): Promise<void> => {
  await db.project.delete({
    where: { id }
  })
}

export const update = async (id: string, data: NewProjectData): Promise<void> => {
  await db.project.update({
    data,
    where: { id }
  })
}
