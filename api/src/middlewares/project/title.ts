import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(4)
})

const titleValidator = (req: Request, _res: Response, next: NextFunction): void => {
  const { title } = req.body

  const result = schema.safeParse({ title })

  if (!result.success) {
    return next(new CustomError(BadRequest.titleInvalid))
  }

  next()
}

export default titleValidator
