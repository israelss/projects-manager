// Hook adapted from https://usehooks.com/useRequireAuth/
import { navigate, usePath } from 'raviger'
import { useEffect } from 'react'
import { AuthContext } from '../interfaces/auth'
import { useAuth } from './useAuth'

export const useRequireAuth = (redirectUrl = '/login'): AuthContext => {
  const auth = useAuth()
  const path = usePath() ?? ''

  useEffect(() => {
    if (auth.username === false && !['/login', '/register'].includes(path)) {
      navigate(redirectUrl)
    }
    if (auth.username !== false && auth.username !== null && ['/login', '/register'].includes(path)) {
      navigate('/projects')
    }
  }, [auth])

  return auth
}
