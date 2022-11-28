import { User } from '@prisma/client'

export const userServiceFindMock = async (data: string): Promise<User | null> => {
  const userFound = existentUser.find(({ username }) => username === data)
  return await Promise.resolve(userFound ?? null)
}

export const existentUser: User[] = [{ username: 'user.one' } as unknown as User]
