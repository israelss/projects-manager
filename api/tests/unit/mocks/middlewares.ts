import { NextFunction, Request, Response } from 'express'

export const emptyHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => { next() }

export const emptyHandlerAsync = async (
  _req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => { next() }
