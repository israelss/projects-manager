import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { userService } from '../../services'

const schema = z.object({
  username: z.string().min(4)
})

const usernameValidator = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { username } = req.body

  const result = schema.safeParse({ username })

  if (!result.success) {
    return next(new CustomError(BadRequest.usernameInvalid))
  }

  const userFound = await userService.find(username)

  if (userFound != null) {
    return next(new CustomError(BadRequest.usernameNotUnique))
  }

  next()
}

export default usernameValidator
