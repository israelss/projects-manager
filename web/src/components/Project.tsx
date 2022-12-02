import { navigate } from 'raviger'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { useToggleForm } from '../hooks/useToggleForm'
import { ProjectData, ProjectProps } from '../interfaces/project'
import { sendRequest } from '../utils/project'
import { API_URLS, ROUTE_URLS } from '../utils/urls'
import ProjectForm from './ProjectForm'

const Project = ({ project }: ProjectProps): JSX.Element => {
  const [isFormShown, toggleForm] = useToggleForm()
  const { username } = useRequireAuth()
  const { mutate } = useSWRConfig()

  const update = async (): Promise<void> => {
    if (isFormShown) toggleForm()
    await mutate<ProjectData>([API_URLS.GET_PROJECT_BY_ID(project.id), username])
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
      navigate(ROUTE_URLS.ALL_PROJECTS)
      return await update()
    }
    toast.error(message ?? 'Um erro desconhecido aconteceu')
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2 items-start'>
        <div className='flex-1 grid grid-flow-row gap-2'>
          <div className='flex gap-2 divide-x-2'>
            <span>Custo: {project.cost}</span>
            <span className='px-2'>Prazo: {new Date(project.deadline).toLocaleDateString()}</span>
            <span className='px-2'>Localização: {project.location}</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className={`badge ${project.done ? 'badge-success' : 'badge-warning'}`}>
              {project.done ? 'Concluído' : 'Não Concluído'}
            </span>
          </div>
        </div>
        <div className='grid grid-rows-3 gap-1'>
          {!project.done && (
            <>
              <button
                className='btn btn-xs btn-secondary'
                onClick={markAsDone} // eslint-disable-line @typescript-eslint/no-misused-promises
              >
                Marcar como concluído
              </button>
              <button
                className={`btn btn-xs ${isFormShown ? 'btn-warning' : 'btn-accent'}`}
                onClick={toggleForm}
                >
                {isFormShown ? 'Cancelar edição' : 'Editar'}
              </button>
            </>
          )}
          <button
            className='btn btn-xs btn-error'
            onClick={removeProject} // eslint-disable-line @typescript-eslint/no-misused-promises
          >
            Excluir
          </button>
        </div>
      </div>
      {
        isFormShown && <ProjectForm isEditForm data={{ ...project }} update={update} />
      }
    </div>
  )
}

export default Project
