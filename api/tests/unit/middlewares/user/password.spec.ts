import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import passwordValidator from '../../../../src/middlewares/user/password'
import CustomError, { BadRequest } from '../../../../src/utils/customError'

afterEach(() => {
  vi.clearAllMocks()
})

describe('User', () => {
  describe('Middleware', () => {
    describe('password', () => {
      test('should pass with a valid password', async () => {
        const req = {
          body: {
            password: '12345678'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        passwordValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid password', async () => {
        const req = {
          body: {
            password: '1'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        passwordValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(BadRequest.passwordInvalid))
      })
    })
  })
})
