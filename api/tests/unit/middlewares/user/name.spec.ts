import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import nameValidator from '../../../../src/middlewares/user/name'
import CustomError, { BadRequest } from '../../../../src/utils/customError'

afterEach(() => {
  vi.clearAllMocks()
})

describe('User', () => {
  describe('Middleware', () => {
    describe('name', () => {
      test('should pass with a valid name', async () => {
        const req = {
          body: {
            name: 'user.one'
          }
        } as Request
        const res = {} as Response
        const next = vi.fn()

        nameValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid name', async () => {
        const req = {
          body: {
            name: '1'
          }
        } as Request
        const res = {} as Response
        const next = vi.fn()

        nameValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(BadRequest.nameInvalid))
      })
    })
  })
})
