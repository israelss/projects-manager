import { CustomError } from './error'

export type AuthInputReturn = string | false | CustomError

export interface AuthInput {
  name?: string
  username: string
  password: string
}

export interface AuthResult {
  username: string
}

export interface AuthContext {
  username: string | false | null
  login: (data: AuthInput) => Promise<AuthInputReturn>
  logout: () => void
  register: (data: AuthInput) => Promise<AuthInputReturn>
}
