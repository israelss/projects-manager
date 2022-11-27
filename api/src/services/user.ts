import { User } from '@prisma/client'
import { db } from '../utils/db.server'

interface LoginInput {
  username: string
  password: string
}

export const create = async (user: User): Promise<string> => {
  const { username } = await db.user.create({
    data: user
  })
  return username
}

export const find = async (username: string): Promise<User | null> => await db
  .user.findUnique({
    where: { username }
  })

export const login = async (userData: LoginInput): Promise<string | null> => {
  const { username, password } = userData
  const user = await db.user.findUnique({
    where: { username }
  })

  if (user === null || user.password !== password) return null
  return user.username
}
