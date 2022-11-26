import { Response, Request } from 'express'
import { Success } from '../enums/http_status_codes'
import { projectService } from '../services'

export const create = async (req: Request, res: Response): Promise<Response> => {
  const project = req.body
  const { username } = req.headers
  await projectService.create(username as string, project)
  return res.status(Success.CREATED).end()
}
