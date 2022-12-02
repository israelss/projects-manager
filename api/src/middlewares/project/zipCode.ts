import CustomError, { BadRequest } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const zipCodeRegex = /^\d{8}$/

const schema = z.object({
  zipCode: z.string().regex(zipCodeRegex).transform(val => Number(val))
})

const zipCodeValidator = (req: Request, _res: Response, next: NextFunction): void => {
  const { zip_code: zipCode } = req.body

  const result = schema.safeParse({ zipCode })

  if (!result.success) {
    return next(new CustomError(BadRequest.zipCodeInvalid))
  }

  req.body.zip_code = result.data.zipCode

  next()
}

export default zipCodeValidator
