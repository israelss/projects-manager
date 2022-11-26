import { RequestHandler, Router } from 'express'
import { projectController } from '../controllers'
import { projectValidation } from '../middlewares'

const router = Router()

router.get(
  '/',
  projectValidation.username,
  projectController.getAll as RequestHandler
)

export default router
