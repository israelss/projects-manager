import { Response, Request } from 'express'
import { Success } from '../enums/http_status_codes'
import { userService } from '../services'

export const create = async (req: Request, res: Response): Promise<Response> => {
  const user = req.body
  const username = await userService.create(user)
  return res.status(Success.CREATED).json({ username })
}
