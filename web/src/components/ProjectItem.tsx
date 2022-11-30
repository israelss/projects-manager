import React from 'react'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr/dist/types'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { ProjectFetcherReturn, ProjectItemProps } from '../interfaces/project'

const markAsDone = async (
  id: string,
  username: string,
  updateFunction: KeyedMutator<ProjectFetcherReturn>
): Promise<void> => {
  const headersList = { username }

  const res = await fetch(`http://localhost:3001/projects/${id}/done`, {
    method: 'PATCH',
    headers: headersList
  })

  if (!res.ok) {
    const { message } = await res.json()
    toast.error(message)
    return
  }

  toast.success('Marcado como concluído com successo!')
  await updateFunction()
}

const removeProject = async (
  id: string,
  username: string,
  updateFunction: KeyedMutator<ProjectFetcherReturn>
): Promise<void> => {
  const headersList = { username }

  const res = await fetch(`http://localhost:3001/projects/${id}`, {
    method: 'DELETE',
    headers: headersList
  })

  if (!res.ok) {
    const { message } = await res.json()
    toast.error(message)
    return
  }

  toast.success('Projeto removido com successo!')
  await updateFunction()
}

const ProjectItem = ({ project, updateFunction }: ProjectItemProps): JSX.Element => {
  const { username } = useRequireAuth()

  return (
    <div>
      <div>
        <div>Nome do projeto: {project.title}</div>
        <div>
          <span>Custo: {project.cost}</span>
          <span>Prazo: {new Date(project.deadline).toLocaleString()}</span>
          <span>Localização: {project.location}</span>
        </div>
        <div>
          Concluído: {project.done ? 'Sim' : 'Não'}
          <button
            disabled={project.done}
            onClick={async () => await markAsDone(project.id, username as string, updateFunction)} // eslint-disable-line @typescript-eslint/no-misused-promises
          >
            {project.done ? 'Projeto já concluído' : 'Marcar como concluído'}
          </button>
        </div>
      </div>
      <div>
        <button>Editar</button>
        <button
          onClick={async () => await removeProject(project.id, username as string, updateFunction)} // eslint-disable-line @typescript-eslint/no-misused-promises
        >
          Excluir
        </button>
      </div>
      <hr />
    </div>
  )
}

export default ProjectItem
