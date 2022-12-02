import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const schema = z.object({
  deadline: z.preprocess((arg: any) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    return arg
  }, z.date().transform(val => new Date(val)))
})

const deadlineValidator = (req: Request, _res: Response, next: NextFunction): void => {
  const { deadline } = req.body

  const result = schema.safeParse({ deadline })

  if (!result.success) {
    return next(new CustomError(BadRequest.deadlineInvalid))
  }

  req.body.deadline = result.data.deadline

  next()
}

export default deadlineValidator
