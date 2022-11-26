import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const schema = z.object({
  id: z.string().uuid()
})

const idValidator = (req: Request, _res: Response, next: NextFunction): void => {
  const { id } = req.params

  const result = schema.safeParse({ id })

  if (!result.success) {
    return next(new CustomError(BadRequest.idInvalid))
  }

  next()
}

export default idValidator
