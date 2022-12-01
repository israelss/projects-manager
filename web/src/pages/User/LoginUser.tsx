import React from 'react'
import UserForm from '../../components/UserForm'

const LoginUser = (): JSX.Element => {
  return (
    <div>
      <h2>LoginUser</h2>
      <UserForm
        variant='login'
        successMessage='Login realizado com sucesso'
        errorMessage='Um erro desconhecido ocorreu ao logar, tente novamente'
        loadingMessage='Realizando login...'
      />
    </div>
  )
}

export default LoginUser
