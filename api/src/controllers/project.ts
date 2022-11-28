import { Response, Request, NextFunction } from 'express'
import { Success } from '../enums/http_status_codes'
import { projectService } from '../services'
import CustomError, { NotFound } from '../utils/customError'

export const create = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const project = req.body
  const { username } = req.headers
  const createdProject = await projectService.create(username as string, project)
  res.status(Success.CREATED).json(createdProject)
}

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  const project = await projectService.get(id)
  if (project === null) return next(new CustomError(NotFound.projectNotFound))
  res.status(Success.OK).json(project)
}

export const getAll = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { username } = req.headers
  const projects = await projectService.getAll(username as string)
  res.status(Success.OK).json({ projects })
}

export const markAsDone = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { id } = req.params
  const updatedProject = await projectService.markAsDone(id)
  res.status(Success.OK).json(updatedProject)
}

export const remove = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { id } = req.params
  await projectService.remove(id)
  res.status(Success.NO_CONTENT).end()
}

export const update = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const projectData = req.body
  const { id } = req.params
  const updatedProject = await projectService.update(id, projectData)
  res.status(Success.OK).json(updatedProject)
}
