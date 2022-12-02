import { CustomError } from '../interfaces/error'
import { loginSchema, registerSchema } from '../schemas/user'
import { navigate } from 'raviger'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { UserFormProps, UserInput } from '../interfaces/user'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

const UserForm = ({ successMessage, errorMessage, loadingMessage, variant }: UserFormProps): JSX.Element => {
  const [, setStoredUsername] = useLocalStorage<string>('username')
  const { login, register: signup } = useRequireAuth()

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<UserInput>({
    mode: 'onTouched',
    resolver: zodResolver(variant === 'login' ? loginSchema : registerSchema)
  })

  const onSubmit: SubmitHandler<UserInput> = async (formData): Promise<void> => {
    const authReturn = variant === 'login' ? login(formData) : signup(formData)
    const loadingToast = toast.loading(loadingMessage)
    const username = await authReturn
    toast.dismiss(loadingToast)
    if (username === false) {
      toast.error(errorMessage)
    } else if ((username as CustomError).info !== undefined) {
      toast.error((username as CustomError).info.message)
    } else {
      setStoredUsername(username as string)
      toast.success(successMessage)
      navigate('/projects')
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
      {
        variant === 'register'
          ? (
            <div className='form-control'>
              <label className='label' htmlFor='name'>
                <span className={`label-text ${(errors.name != null) ? 'text-error' : ''}`}>Nome</span>
              </label>
              <input
                className={`input input-bordered ${(errors.name != null) ? 'input-error' : ''}`}
                type='text'
                id='name'
                {...register('name')}
              />
              <div className='block text-error text-[0.6rem] h-0.5'>
                {errors.name?.message}
              </div>
            </div>
            )
          : null
      }

      <div className='form-control'>
        <label className='label' htmlFor='username'>
          <span className={`label-text ${(errors.username != null) ? 'text-error' : ''}`}>Nome de usuário</span>
        </label>
        <input
          className={`input input-bordered ${(errors.username != null) ? 'input-error' : ''}`}
          type='text'
          id='username'
          {...register('username')}
        />
        <div className='block text-error text-[0.6rem] h-0.5'>
          {errors.username?.message}
        </div>
      </div>

      <div className='form-control'>
        <label className='label' htmlFor='password'>
          <span className={`label-text ${(errors.password != null) ? 'text-error' : ''}`}>Senha</span>
        </label>
        <input
          className={`input input-bordered ${(errors.password != null) ? 'input-error' : ''}`}
          type='password'
          id='password'
          {...register('password')}
        />
        <div className='block text-error text-[0.6rem] h-0.5'>{errors.password?.message}</div>
      </div>

      <input
        disabled={!isValid}
        className='btn btn-success mt-4'
        type='submit'
        value={variant === 'register' ? 'Cadastrar' : 'Entrar'}
      />
    </form>
  )
}

export default UserForm
