import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import idValidator from '../../../../src/middlewares/project/id'
import CustomError, { BadRequest } from '../../../../src/utils/customError'

afterEach(() => {
  vi.clearAllMocks()
})

describe('Project', () => {
  describe('Middleware', () => {
    describe('id', () => {
      test('should pass with a valid id', () => {
        const req = {
          params: {
            id: randomUUID()
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        idValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid id', () => {
        const req = {
          params: {
            id: '123'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        idValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(BadRequest.idInvalid))
      })
    })
  })
})
