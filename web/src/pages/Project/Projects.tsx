import React from 'react'
import useSWR from 'swr'
import ProjectItem from '../../components/ProjectItem'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { CustomError } from '../../interfaces/error'
import { ProjectFetcherReturn } from '../../interfaces/project'

const projectsFetcher = async (url: string, username: string): Promise<ProjectFetcherReturn> => {
  const headersList = { username }

  const res = await fetch(url, {
    method: 'GET',
    headers: headersList
  })

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as CustomError
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return await res.json()
}

const Projects = (): JSX.Element => {
  const { username, logout } = useRequireAuth()
  const { data, error, mutate } = useSWR<ProjectFetcherReturn, CustomError>(
    ['http://localhost:3001/projects', username],
    projectsFetcher
  )

  if (error != null) return <div>Erro ao carregar projetos do usuário {username}</div>

  if (data == null) return <div>Carregando projetos do usuário {username}...</div>

  return (
    <div>
      <button onClick={logout}>Sair</button>
      <h2>Projects</h2>
      {
        data
          .projects
          .sort((projectA, projectB) => new Date(projectA.deadline).valueOf() - new Date(projectB.deadline).valueOf())
          .map((project) => <ProjectItem project={project} key={project.id} updateFunction={mutate} />)
      }
    </div>
  )
}

export default Projects
