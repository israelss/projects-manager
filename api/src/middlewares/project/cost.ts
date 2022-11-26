import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const costRegex = /^\d{1,}$/

const schema = z.object({
  cost: z.string().regex(costRegex).transform(val => Number(val))
})

const costValidator = (req: Request, _res: Response, next: NextFunction): void => {
  const { cost } = req.body

  const result = schema.safeParse({ cost })

  if (!result.success) {
    return next(new CustomError(BadRequest.costInvalid))
  }

  req.body.cost = result.data.cost

  next()
}

export default costValidator
