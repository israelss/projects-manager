import { PropsWithChildren } from 'react'
import { KeyedMutator } from 'swr/dist/types'

export interface Project {
  location: string
  id: string
  title: string
  cost: number
  done: boolean
  deadline: Date
  username: string
  created_at: Date
  updated_at: Date
}

export interface ProjectFetcherReturn {
  projects: Project[]
}

export interface ProjectItemProps extends PropsWithChildren {
  project: Project
  updateFunction: KeyedMutator<ProjectFetcherReturn>
}
