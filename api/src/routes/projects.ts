import { RequestHandler, Router } from 'express'
import { projectController } from '../controllers'
import { projectValidation } from '../middlewares'

const router = Router()

router.get(
  '/',
  projectValidation.username,
  projectController.getAll as RequestHandler
)

router.patch(
  '/:id/done',
  projectValidation.id,
  projectValidation.username,
  projectValidation.ownership as RequestHandler,
  projectController.markAsDone as RequestHandler
)

export default router
