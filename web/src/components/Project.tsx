import { navigate } from 'raviger'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { AllProjectsData, ProjectProps } from '../interfaces/project'
import { sendRequest } from '../utils/project'
import { API_URLS } from '../utils/urls'

const Project = ({ project }: ProjectProps): JSX.Element => {
  const { username } = useRequireAuth()
  const { mutate } = useSWRConfig()

  const update = async (): Promise<void> => {
    await mutate<AllProjectsData>([API_URLS.GET_PROJECT_BY_ID(project.id), username])
  }

  const markAsDone = async (): Promise<void> => {
    const { ok, message } = await sendRequest({
      url: API_URLS.MARK_AS_DONE(project.id),
      method: 'PATCH',
      username: username as string
    })
    if (ok) {
      toast.success('Marcado como concluído com successo!')
      return await update()
    }
    toast.error(message ?? 'Um erro desconhecido aconteceu')
  }

  const removeProject = async (): Promise<void> => {
    const { ok, message } = await sendRequest({
      url: API_URLS.DELETE_PROJECT(project.id),
      method: 'DELETE',
      username: username as string
    })

    if (ok) {
      toast.success('Projeto removido com successo!')
      return await update()
    }
    toast.error(message ?? 'Um erro desconhecido aconteceu')
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate('..')}>Voltar</button>
        <div>
          <span>Custo: {project.cost}</span>
          <span>Prazo: {new Date(project.deadline).toLocaleString()}</span>
          <span>Localização: {project.location}</span>
        </div>
        <div>
          Concluído: {project.done ? 'Sim' : 'Não'}
          <button
            disabled={project.done}
            onClick={markAsDone} // eslint-disable-line @typescript-eslint/no-misused-promises
          >
            {project.done ? 'Projeto já concluído' : 'Marcar como concluído'}
          </button>
        </div>
      </div>
      <div>
        <button>Editar</button>
        <button
          onClick={removeProject} // eslint-disable-line @typescript-eslint/no-misused-promises
        >
          Excluir
        </button>
      </div>
    </div>
  )
}

export default Project
