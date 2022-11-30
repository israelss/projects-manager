// Hook adapted from https://usehooks.com/useRequireAuth/
import { navigate, usePath } from 'raviger'
import { useEffect } from 'react'
import { AuthContext } from '../interfaces/auth'
import { isUnloggedRoute, isValidUsername } from '../utils/auth'
import { ROUTE_URLS } from '../utils/urls'
import { useAuth } from './useAuth'

export const useRequireAuth = (): AuthContext => {
  const auth = useAuth()
  const path = usePath() ?? ''

  useEffect(() => {
    if (auth.username === false && !isUnloggedRoute(path)) {
      navigate(ROUTE_URLS.LOGIN)
    }
    if (isValidUsername(auth.username) && isUnloggedRoute(path)) {
      navigate(ROUTE_URLS.ALL_PROJECTS)
    }
  }, [auth])

  return auth
}
