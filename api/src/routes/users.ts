import { RequestHandler, Router } from 'express'
import { userController } from '../controllers'
import { userValidation } from '../middlewares'

const router = Router()

router.post(
  '/login',
  userValidation.username,
  userValidation.password,
  userController.login as RequestHandler
)

router.post(
  '/',
  userValidation.username,
  userValidation.usernameUniqueness as RequestHandler,
  userValidation.name,
  userValidation.password,
  userController.create as RequestHandler
)

export default router
