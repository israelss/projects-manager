import { Link } from 'raviger'
import React from 'react'
import UserForm from '../../components/UserForm'

const LoginUser = (): JSX.Element => {
  return (
    <div className='flex flex-col gap-6 h-full items-center justify-center'>
      <h2 className='text-4xl text-center'>Login</h2>
      <UserForm
        variant='login'
        successMessage='Login realizado com sucesso'
        errorMessage='Um erro desconhecido ocorreu ao logar, tente novamente'
        loadingMessage='Realizando login...'
      />
      <Link href='/register' className='link link-hover text-sm'>
        Não tenho cadastro ainda
      </Link>
    </div>
  )
}

export default LoginUser
