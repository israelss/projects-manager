// Hook adapted from https://usehooks.com/useAuth/
import React, { useState, useContext, createContext, PropsWithChildren, useEffect } from 'react'
import { AuthContext, AuthInput, AuthInputReturn } from '../interfaces/auth'
import { CustomError } from '../interfaces/error'
import { sendUserData } from '../utils/auth'
import { useLocalStorage } from './useLocalStorage'

const useProvideAuth = (): AuthContext => {
  const [username, setUsername] = useState<string | false | null>(false)
  const [storedUsername, setStoredUsername] = useLocalStorage<string>('username')
  useEffect(() => {
    if (storedUsername !== undefined) {
      setUsername(storedUsername)
    }
  }, [storedUsername])

  const login = async ({ username, password }: AuthInput): Promise<AuthInputReturn> => {
    setUsername(null)
    try {
      const loggedUser = await sendUserData({ username, password })
      setUsername(loggedUser.username)
      return loggedUser.username
    } catch (error) {
      setUsername(false)
      if ((error as CustomError).info !== undefined) return error as CustomError
      return false
    }
  }

  const register = async ({ name, username, password }: AuthInput): Promise<AuthInputReturn> => {
    setUsername(null)
    try {
      const loggedUser = await sendUserData({ name, username, password })
      setUsername(loggedUser.username)
      return loggedUser.username
    } catch (error) {
      setUsername(false)
      if ((error as CustomError).info !== undefined) return error as CustomError
      return false
    }
  }

  const logout = (): void => {
    setStoredUsername(undefined)
    setUsername(false)
  }

  return {
    username,
    login,
    logout,
    register
  }
}

const defaultContext = {
  username: false,
  login: async (data: AuthInput) => data.username,
  logout: () => {},
  register: async (data: AuthInput) => data.username
} as const

const authContext = createContext<AuthContext>(defaultContext)

export const ProvideAuth = ({ children }: PropsWithChildren): JSX.Element => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = (): AuthContext => {
  return useContext(authContext)
}
