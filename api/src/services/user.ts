import { User } from '@prisma/client'
import { db } from '../utils/db.server'

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
