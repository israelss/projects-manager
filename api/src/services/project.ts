import { Project } from '@prisma/client'
import { db } from '../utils/db.server'
import axios from 'axios'
import { ClientError } from '../enums/http_status_codes'

type NewProjectData = Pick<Project, 'title' | 'zip_code' | 'deadline' | 'cost'>
type ProjectData = Omit<Project, 'zip_code'> & { location: string }
interface CepData {
  city: string
  state: string
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
  const projectStored: Partial<Project | null> = await db.project.findUnique({ where: { id } })
  if (projectStored === null) return null
  const cep = projectStored.zip_code as number
  let location: string = `Não foi possível encontrar a localização do CEP ${cep}`
  try {
    const CEP_API_URL = `https://brasilapi.com.br/api/cep/v2/${cep}`
    const headers = {
      'Accept-Encoding': 'application/json'
    }
    const response = await axios.get<CepData>(CEP_API_URL, { headers })
    if (response.status !== ClientError.NOT_FOUND) {
      const { city, state } = response.data
      location = `${city}/${state}`
    }
  } catch (error) {
    console.error(error)
  }

  const project = {
    location,
    ...projectStored
  }

  delete project.zip_code

  return project as Required<ProjectData>
}
