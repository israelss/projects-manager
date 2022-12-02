import { RequestHandler, Router } from 'express'
import { projectController } from '../controllers'
import { projectValidation } from '../middlewares'

const router = Router()

router.post(
  '/',
  projectValidation.cost,
  projectValidation.deadline,
  projectValidation.title,
  projectValidation.zipCode,
  projectController.create as RequestHandler
  )

router.get(
  '/:id',
  projectValidation.id,
  projectController.get as RequestHandler
)

export default router
