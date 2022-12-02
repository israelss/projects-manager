import CustomError, { Forbidden } from '../../utils/customError'
import { NextFunction, Request, Response } from 'express'
import { projectService } from '../../services'

const ownershipValidator = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { username } = req.headers
  const { id } = req.params

  const userProjects = await projectService.getAll(username as string)
  const projectsIsFromUser = userProjects.some((project) => project.id === id)

  if (!projectsIsFromUser) {
    return next(new CustomError(Forbidden.invalidOwner))
  }

  next()
}

export default ownershipValidator
