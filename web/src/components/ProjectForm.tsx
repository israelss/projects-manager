import { projectSchema } from '../schemas/project'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProjectFormProps, ProjectInput } from '../interfaces/project'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { sendRequest } from '../utils/project'
import { API_URLS } from '../utils/urls'
import { useRequireAuth } from '../hooks/useRequireAuth'

const getLocaleDateString = (dateString?: string): string => {
  if (dateString === undefined) return ''
  return new Date(dateString).toISOString().slice(0, 10)
}

const ProjectForm = ({ isEditForm = false, data, update }: ProjectFormProps): JSX.Element => {
  const { username } = useRequireAuth()

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema)
  })

  const onSubmit: SubmitHandler<ProjectInput> = async (formData): Promise<void> => {
    const url = isEditForm
      ? API_URLS.PUT_PROJECT(data?.id as string)
      : API_URLS.ADD_PROJECT

    const method = isEditForm ? 'PUT' : 'POST'

    const requestReturn = sendRequest({ url, method, username: username as string, data: formData })
    const loadingToast = toast.loading('Salvando projeto...')
    const { ok, message } = await requestReturn
    toast.dismiss(loadingToast)
    if (!ok) {
      toast.error(message ?? 'Um erro desconhecido aconteceu...')
    } else {
      toast.success('Projeto salvo com sucesso!')
    }
    await update()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
      <label htmlFor='cost'>
        Custo:
        <input {...register('cost')} defaultValue={data?.cost} />
        <p>{errors.cost?.message}</p>
      </label>
      <label htmlFor='deadline'>
        Prazo:
        <input type='date' {...register('deadline')} defaultValue={getLocaleDateString(data?.deadline)} />
        <p>{errors.deadline?.message}</p>
      </label>
      <label htmlFor='title'>
        Nome do projeto:
        <input {...register('title')} defaultValue={data?.title} />
        <p>{errors.title?.message}</p>
      </label>
      <label htmlFor='zip_code'>
        CEP:
        <input {...register('zip_code')} />
        <p>{errors.zip_code?.message}</p>
      </label>
      <input type='submit' disabled={!isDirty || !isValid} />
    </form>
  )
}

export default ProjectForm
