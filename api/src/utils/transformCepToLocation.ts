import { Project } from '@prisma/client'
import axios from 'axios'
import { ClientError } from '../enums/http_status_codes'

interface CepData {
  city: string
  state: string
}

type ProjectWithLocation = Project & { location: string }
export type ProjectData = Omit<ProjectWithLocation, 'zip_code'>

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

export const transformCepToLocation = async (project: Project): Promise<ProjectData> => {
  const projectWithLocation = await includeLocation(project)
  return removeZipCode(projectWithLocation)
}
