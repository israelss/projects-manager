import { navigate } from 'raviger'
import { PropsWithChildren } from 'react'
import useSWR from 'swr'
import Project from '../../components/Project'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { CustomError } from '../../interfaces/error'
import { ProjectData } from '../../interfaces/project'
import BaseLayout from '../../layouts/BaseLayout'
import { projectsFetcher } from '../../utils/project'
import { API_URLS } from '../../utils/urls'

interface ProjectDetailsProps extends PropsWithChildren {
  id: string
}

const ProjectDetails = ({ id }: ProjectDetailsProps): JSX.Element => {
  const { username } = useRequireAuth()
  const { data, error } = useSWR<ProjectData, CustomError>(
    [API_URLS.GET_PROJECT_BY_ID(id), username],
    projectsFetcher
  )

  if (error != null) return <div>Erro ao carregar projeto com id: {id}</div>

  if (data == null) return <div>Carregando projeto com id: {id}...</div>

  return (
    <BaseLayout>
      <div className='flex items-center'>
        <h2 className='text-3xl flex-1'>Detalhes do projeto: {data.title}</h2>
        <button
          className='btn btn-xs btn-info'
          onClick={() => navigate('..')}
        >
          Voltar
        </button>
      </div>
      <Project project={data} />
    </BaseLayout>
  )
}

export default ProjectDetails
