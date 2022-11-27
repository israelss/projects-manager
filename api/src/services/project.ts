import { Project } from '@prisma/client'
import { db } from '../utils/db.server'
import axios from 'axios'
import { ClientError } from '../enums/http_status_codes'

type NewProjectData = Pick<Project, 'title' | 'zip_code' | 'deadline' | 'cost'>
type ProjectWithLocation = Project & { location: string }
type ProjectData = Omit<ProjectWithLocation, 'zip_code'>
interface CepData {
  city: string
  state: string
}

const includeLocation = async (project: Project): Promise<ProjectWithLocation> => {
  const cep = project.zip_code
  let location = `Não foi possível encontrar a localização do CEP ${cep}`
  try {
    const CEP_API_URL = `https://brasilapi.com.br/api/cep/v2/${cep}`
    const headers = { 'Accept-Encoding': 'application/json' }

    const response = await axios.get<CepData>(CEP_API_URL, { headers })
    if (response.status !== ClientError.NOT_FOUND) {
      const { city, state } = response.data
      location = `${city}/${state}`
    }
  } catch (error) {
    console.error(error)
  }

  return { location, ...project }
}

const removeZipCode = (project: Partial<Project>): ProjectData => {
  delete project.zip_code
  return project as Required<ProjectData>
}

const transformCepToLocation = async (project: Project): Promise<ProjectData> => {
  const projectWithLocation = await includeLocation(project)
  return removeZipCode(projectWithLocation)
}

export const create = async (username: string, project: NewProjectData): Promise<void> => {
  await db.project.create({
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

export const markAsDone = async (id: string): Promise<void> => {
  await db.project.update({
    data: { done: true },
    where: { id }
  })
}
