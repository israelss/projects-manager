import { CustomError } from '../interfaces/error'
import { loginSchema, registerSchema } from '../schemas/user'
import { navigate } from 'raviger'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { UserFormProps, UserInput } from '../interfaces/user'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import toast from 'react-hot-toast'

const UserForm = ({ successMessage, errorMessage, loadingMessage, variant }: UserFormProps): JSX.Element => {
  const [, setStoredUsername] = useLocalStorage<string>('username')
  const { login, register: signup } = useRequireAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<UserInput>({
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
    <form onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
      {
        variant === 'register'
          ? (
            <>
              <input {...register('name')} />
              <p>{errors.name?.message}</p>
            </>
            )
          : null
      }

      <input {...register('username')} />
      <p>{errors.username?.message}</p>

      <input type='password' {...register('password')} />
      <p>{errors.password?.message}</p>

      <input type='submit' />
    </form>
  )
}

export default UserForm
