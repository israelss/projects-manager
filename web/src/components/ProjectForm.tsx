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

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ProjectInput>({
    mode: 'onTouched',
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
    <div className='p-3 bg-base-200'>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        <div className='form-control'>
          <label className='label' htmlFor='title'>
            <span className={`label-text ${(errors.title != null) ? 'text-error' : ''}`}>Nome do projeto</span>
          </label>
          <input
            className={`input input-bordered ${(errors.title != null) ? 'input-error' : ''}`}
            type='text'
            id='title'
            defaultValue={data?.title}
            {...register('title')}
          />
          <div className='block text-error text-[0.6rem] h-0.5'>
            {errors.title?.message}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className='form-control'>
            <label className='label' htmlFor='zip_code'>
              <span className={`label-text ${(errors.zip_code != null) ? 'text-error' : ''}`}>CEP</span>
            </label>
            <input
              className={`input input-bordered ${(errors.zip_code != null) ? 'input-error' : ''}`}
              type='text'
              id='zip_code'
              {...register('zip_code')}
            />
            <div className='block text-error text-[0.6rem] h-0.5'>
              {errors.zip_code?.message}
            </div>
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='cost'>
              <span className={`label-text ${(errors.cost != null) ? 'text-error' : ''}`}>Custo</span>
            </label>
            <input
              className={`input input-bordered ${(errors.cost != null) ? 'input-error' : ''}`}
              type='text'
              id='cost'
              defaultValue={data?.cost}
              {...register('cost')}
            />
            <div className='block text-error text-[0.6rem] h-0.5'>
              {errors.cost?.message}
            </div>
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='deadline'>
              <span className={`label-text ${(errors.deadline != null) ? 'text-error' : ''}`}>Prazo</span>
            </label>
            <input
              className={`input input-bordered ${(errors.deadline != null) ? 'input-error' : ''}`}
              type='date'
              id='deadline'
              defaultValue={getLocaleDateString(data?.deadline)}
              {...register('deadline')}
            />
            <div className='block text-error text-[0.6rem] h-0.5'>
              {errors.deadline?.message}
            </div>
          </div>
        </div>

        <input
          disabled={!isValid}
          className='btn btn-success mt-4'
          type='submit'
          value='Salvar Projeto'
        />
      </form>
    </div>
  )
}

export default ProjectForm
