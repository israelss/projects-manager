import React from 'react'
import useSWR from 'swr'
import ProjectSummary from '../../components/ProjectSummary'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { CustomError } from '../../interfaces/error'
import { AllProjectsData } from '../../interfaces/project'
import { projectsFetcher, sortProjectsByDeadline } from '../../utils/project'
import { API_URLS } from '../../utils/urls'

const Projects = (): JSX.Element => {
  const { username, logout } = useRequireAuth()
  const { data, error } = useSWR<AllProjectsData, CustomError>(
    [API_URLS.GET_ALL, username],
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
          .sort(sortProjectsByDeadline)
          .map(({ id, deadline, title }) => (
            <ProjectSummary
              key={id}
              data={{ id, deadline, title }}
            />
          ))
      }
    </div>
  )
}

export default Projects
