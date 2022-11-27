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

router.delete(
  '/:id',
  projectValidation.id,
  projectValidation.username,
  projectValidation.ownership as RequestHandler,
  projectController.remove as RequestHandler
)

export default router
