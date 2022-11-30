import { AuthInput, AuthResult } from '../interfaces/auth'
import { CustomError } from '../interfaces/error'

export const sendUserData = async (data: AuthInput): Promise<AuthResult> => {
  const headersList = { 'Content-Type': 'application/json' }

  const bodyContent = JSON.stringify(data)

  const url = data.name !== undefined
    ? 'http://localhost:3001/users'
    : 'http://localhost:3001/users/login'

  const res = await fetch(url, {
    method: 'POST',
    body: bodyContent,
    headers: headersList
  })

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as CustomError
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return await res.json()
}
