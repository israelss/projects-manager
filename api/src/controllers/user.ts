import { Response, Request, NextFunction } from 'express'
import { Success } from '../enums/http_status_codes'
import { userService } from '../services'
import CustomError, { UnprocessableEntity } from '../utils/customError'

export const create = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const user = req.body
  const username = await userService.create(user)
  res.status(Success.CREATED).json({ username })
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userData = req.body
  const username = await userService.login(userData)
  if (username === null) return next(new CustomError(UnprocessableEntity.wrongCredentials))
  res.status(Success.OK).json({ username })
}
