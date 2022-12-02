import React from 'react'
import UserForm from '../../components/UserForm'

const RegisterUser = (): JSX.Element => {
  return (
    <div className='flex flex-col gap-6 h-full items-center justify-center'>
      <h2 className='text-4xl text-center'>Cadastrar</h2>
      <UserForm
        variant='register'
        successMessage='Cadastro realizado com sucesso'
        errorMessage='Um erro desconhecido ocorreu ao cadastrar, tente novamente'
        loadingMessage='Realizando cadastro...'
      />
    </div>
  )
}

export default RegisterUser
