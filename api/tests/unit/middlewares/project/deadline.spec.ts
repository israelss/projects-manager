import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import deadlineValidator from '../../../../src/middlewares/project/deadline'
import CustomError, { BadRequest } from '../../../../src/utils/customError'

afterEach(() => {
  vi.clearAllMocks()
})

describe('Project', () => {
  describe('Middleware', () => {
    describe('deadline', () => {
      test('should pass with a valid deadline', async () => {
        const req = {
          body: {
            deadline: '2022-11-28'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        deadlineValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid deadline', async () => {
        const req = {
          body: {
            deadline: 'abc'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        deadlineValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(BadRequest.deadlineInvalid))
      })
    })
  })
})
