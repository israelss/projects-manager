import { PropsWithChildren } from 'react'

export interface UserInput {
  name?: string
  username: string
  password: string
}

export interface UserFormProps extends PropsWithChildren {
  successMessage: string
  errorMessage: string
  loadingMessage: string
  variant: 'login' | 'register'
}
