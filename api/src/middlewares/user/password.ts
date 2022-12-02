import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const schema = z.object({
  password: z.string().min(8)
})

const passwordValidator = (req: Request, _res: Response, next: NextFunction): void => {
  const { password } = req.body

  const result = schema.safeParse({ password })

  if (!result.success) {
    return next(new CustomError(BadRequest.passwordInvalid))
  }

  next()
}

export default passwordValidator
