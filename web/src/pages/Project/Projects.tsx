import useSWR, { useSWRConfig } from 'swr'
import ProjectForm from '../../components/ProjectForm'
import ProjectSummary from '../../components/ProjectSummary'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import { useToggleForm } from '../../hooks/useToggleForm'
import { CustomError } from '../../interfaces/error'
import { AllProjectsData } from '../../interfaces/project'
import BaseLayout from '../../layouts/BaseLayout'
import { projectsFetcher, sortProjectsByDeadline } from '../../utils/project'
import { API_URLS } from '../../utils/urls'

const Projects = (): JSX.Element => {
  const [isFormShown, toggleForm] = useToggleForm()
  const { username } = useRequireAuth()
  const { data, error } = useSWR<AllProjectsData, CustomError>(
    [API_URLS.GET_ALL, username],
    projectsFetcher
  )
  const { mutate } = useSWRConfig()

  const update = async (): Promise<void> => {
    if (isFormShown) toggleForm()
    await mutate<AllProjectsData>([API_URLS.GET_ALL, username])
  }

  if (error != null) return <div>Erro ao carregar projetos do usuário {username}</div>

  if (data == null) return <div>Carregando projetos do usuário {username}...</div>

  return (
    <BaseLayout>
      <div className="flex items-center">
        <h2 className='text-3xl flex-1'>Projetos</h2>
        <button
          className={`btn btn-sm ${isFormShown ? 'btn-warning' : 'btn-accent'}`}
          onClick={toggleForm}
        >
          {isFormShown ? 'Cancelar adição' : 'Adicionar Projeto'}
        </button>
      </div>
      {
        isFormShown && <ProjectForm update={update} />
      }
      <div className="divide-y-2">
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
    </BaseLayout>
  );
}

export default Projects
