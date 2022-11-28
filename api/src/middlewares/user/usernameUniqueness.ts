import CustomError, { UnprocessableEntity } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { userService } from '../../services'

const usernameUniquenessValidator = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { username } = req.body

  const userFound = await userService.find(username)

  if (userFound != null) {
    return next(new CustomError(UnprocessableEntity.usernameNotUnique))
  }

  next()
}

export default usernameUniquenessValidator
