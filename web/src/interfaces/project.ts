import { PropsWithChildren } from 'react'

export interface ProjectData {
  location: string
  id: string
  title: string
  cost: number
  done: boolean
  deadline: string
  username: string
  created_at: string
  updated_at: string
}

export interface AllProjectsData {
  projects: ProjectData[]
}

export interface ProjectProps extends PropsWithChildren {
  project: ProjectData
}

export interface ProjectSummaryProps extends PropsWithChildren {
  data: {
    id: string
    deadline: string
    title: string
  }
}

export interface ProjectRequestArgs {
  url: string
  method: string
  username: string
  data?: ProjectInput
}

export interface ProjectRequestResult {
  ok: boolean
  message?: string
}

export interface ProjectInput {
  cost: number
  deadline: Date
  title: string
  zip_code: number
}

export interface ProjectFormProps extends PropsWithChildren {
  isEditForm?: boolean
  data?: {
    id: string
    cost: number
    deadline: string
    title: string
  }
  update: () => Promise<void>
}
