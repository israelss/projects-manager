import { RequestHandler, Router } from 'express'
import { userController } from '../controllers'
import { userValidation } from '../middlewares'

const router = Router()

router.post(
  '/',
  userValidation.username as RequestHandler,
  userValidation.name,
  userValidation.password,
  userController.create as RequestHandler
)

export default router
