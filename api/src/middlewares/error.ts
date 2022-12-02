import { NextFunction, Request, Response } from 'express'
import { ServerError } from '../enums/http_status_codes'

export const handle = (
  error: Error & { code?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  const { code, message } = error

  if (code !== undefined) return res.status(code).json({ message })
  return res.status(ServerError.INTERNAL_SERVER_ERROR).json({ message })
}
