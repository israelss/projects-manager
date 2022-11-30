import React, { PropsWithChildren } from 'react'
import useSWR from 'swr'
import Project from '../../components/Project'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { CustomError } from '../../interfaces/error'
import { ProjectData } from '../../interfaces/project'
import { projectsFetcher } from '../../utils/project'
import { API_URLS } from '../../utils/urls'

interface ProjectDetailsProps extends PropsWithChildren {
  id: string
}

const ProjectDetails = ({ id }: ProjectDetailsProps): JSX.Element => {
  const { username, logout } = useRequireAuth()
  const { data, error } = useSWR<ProjectData, CustomError>(
    [API_URLS.GET_PROJECT_BY_ID(id), username],
    projectsFetcher
  )

  if (error != null) return <div>Erro ao carregar projeto com id: {id}</div>

  if (data == null) return <div>Carregando projeto com id: {id}...</div>

  return (
    <div>
      <button onClick={logout}>Sair</button>
      <h2>Detalhes do projeto: {data.title}</h2>
      <Project project={data} />
    </div>
  )
}

export default ProjectDetails
