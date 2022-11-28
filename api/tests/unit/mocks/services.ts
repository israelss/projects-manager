import { User } from '@prisma/client'

export const userServiceFindMock = async (data: string) => {
  const userFound = existentUser.find(({ username }) => username === data)
  return Promise.resolve(userFound || null)
}

export const existentUser: User[] = [{ username: 'user.one' } as User]
