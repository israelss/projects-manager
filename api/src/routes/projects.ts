import { RequestHandler, Router } from 'express'
import { projectController } from '../controllers'
import { projectValidation } from '../middlewares'

const router = Router()

router.get(
  '/',
  projectController.getAll as RequestHandler
)

router.patch(
  '/:id/done',
  projectValidation.id,
  projectValidation.ownership as RequestHandler,
  projectController.markAsDone as RequestHandler
)

router.delete(
  '/:id',
  projectValidation.id,
  projectValidation.ownership as RequestHandler,
  projectController.remove as RequestHandler
)

router.put(
  '/:id',
  projectValidation.id,
  projectValidation.cost,
  projectValidation.deadline,
  projectValidation.title,
  projectValidation.zipCode,
  projectValidation.ownership as RequestHandler,
  projectController.update as RequestHandler
)

export default router
