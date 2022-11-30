import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { navigate } from 'raviger'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { CustomError } from '../../interfaces/error'
import { useRequireAuth } from '../../hooks/useRequireAuth'

interface LoginInput {
  username: string
  password: string
}

const schema = z.object({
  username: z.string().min(2),
  password: z.string().min(8)
})

const LoginUser = (): JSX.Element => {
  const { login } = useRequireAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(schema)
  })
  const [, setStoredUsername] = useLocalStorage<string>('username')

  const onSubmit: SubmitHandler<LoginInput> = async (formData): Promise<void> => {
    const authReturn = login(formData)
    const loadingToast = toast.loading('Realizando login...')
    const username = await authReturn
    toast.dismiss(loadingToast)
    if (username === false) {
      toast.error('Um erro ocorreu ao logar, tente novamente')
    } else if ((username as CustomError).info !== undefined) {
      toast.error((username as CustomError).info.message)
    } else {
      setStoredUsername(username as string)
      toast.success('Login realizado com sucesso')
      navigate('/projects')
    }
  }

  return (
    <div>
      <h2>LoginUser</h2>
      <form onSubmit={handleSubmit(onSubmit)}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
        <input {...register('username')} />
        <p>{errors.username?.message}</p>

        <input type='password' {...register('password')} />
        <p>{errors.password?.message}</p>

        <input type='submit' />
      </form>
    </div>
  )
}

export default LoginUser
