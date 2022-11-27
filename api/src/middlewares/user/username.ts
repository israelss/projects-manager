import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(4)
})

const usernameValidator = (req: Request, _res: Response, next: NextFunction): void => {
  const { username } = req.body

  const result = schema.safeParse({ username })

  if (!result.success) {
    return next(new CustomError(BadRequest.usernameInvalid))
  }

  next()
}

export default usernameValidator
