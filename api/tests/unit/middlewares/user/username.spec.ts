import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import usernameValidator from '../../../../src/middlewares/user/username'
import CustomError, { BadRequest } from '../../../../src/utils/customError'

afterEach(() => {
  vi.clearAllMocks()
})

describe('User', () => {
  describe('Middleware', () => {
    describe('username', () => {
      test('should pass with a valid username', async () => {
        const req = {
          body: {
            username: 'user.one'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        usernameValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid username', async () => {
        const req = {
          body: {
            username: 'one'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        usernameValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(BadRequest.usernameInvalid))
      })
    })
  })
})
