import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2)
})

const nameValidator = (req: Request, _res: Response, next: NextFunction): void => {
  const { name } = req.body

  const result = schema.safeParse({ name })

  if (!result.success) {
    return next(new CustomError(BadRequest.nameInvalid))
  }

  next()
}

export default nameValidator
