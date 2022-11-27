import { Response, Request } from 'express'
import { Success } from '../enums/http_status_codes'
import { projectService } from '../services'

export const create = async (req: Request, res: Response): Promise<Response> => {
  const project = req.body
  const { username } = req.headers
  const createdProject = await projectService.create(username as string, project)
  return res.status(Success.CREATED).json(createdProject)
}

export const get = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const project = await projectService.get(id)
  return res.status(Success.OK).json(project)
}

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  const { username } = req.headers
  const projects = await projectService.getAll(username as string)
  return res.status(Success.OK).json({ projects })
}

export const markAsDone = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const updatedProject = await projectService.markAsDone(id)
  return res.status(Success.OK).json(updatedProject)
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  await projectService.remove(id)
  return res.status(Success.NO_CONTENT).end()
}

export const update = async (req: Request, res: Response): Promise<Response> => {
  const projectData = req.body
  const { id } = req.params
  const updatedProject = await projectService.update(id, projectData)
  return res.status(Success.OK).json(updatedProject)
}
