import React from 'react'
import UserForm from '../../components/UserForm'

const RegisterUser = (): JSX.Element => {
  return (
    <div>
      <h2>RegisterUser</h2>
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
