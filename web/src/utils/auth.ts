import { AuthInput, AuthResult } from '../interfaces/auth'
import { CustomError } from '../interfaces/error'
import { API_URLS, ROUTE_URLS } from './urls'

export const sendUserData = async (data: AuthInput): Promise<AuthResult> => {
  const headers = { 'Content-Type': 'application/json' }
  const body = JSON.stringify(data)
  const url = data.name !== undefined ? API_URLS.REGISTER_USER : API_URLS.LOGIN_USER

  const res = await fetch(url, { method: 'POST', body, headers })

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as CustomError
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return await res.json()
}

export const isUnloggedRoute = (path: string): boolean =>
  [ROUTE_URLS.LOGIN as string, ROUTE_URLS.REGISTER as string].includes(path)

export const isValidUsername = (username: any): boolean => typeof username === 'string'
