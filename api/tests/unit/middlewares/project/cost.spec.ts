import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import costValidator from '../../../../src/middlewares/project/cost'
import CustomError, { BadRequest } from '../../../../src/utils/customError'

afterEach(() => {
  vi.clearAllMocks()
})

describe('Project', () => {
  describe('Middleware', () => {
    describe('cost', () => {
      test('should pass with a valid cost', () => {
        const req = {
          body: {
            cost: '123'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        costValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid cost', () => {
        const req = {
          body: {
            cost: 'abc'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        costValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(BadRequest.costInvalid))
      })
    })
  })
})
