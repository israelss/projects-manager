import { Project } from '@prisma/client'
import { db } from '../utils/db.server'

type NewProjectData = Pick<Project, 'title' | 'zip_code' | 'deadline' | 'cost'>

export const create = async (username: string, project: NewProjectData): Promise<void> => {
  await db.project.create({
    data: {
      username,
      ...project
    }
  })
}
