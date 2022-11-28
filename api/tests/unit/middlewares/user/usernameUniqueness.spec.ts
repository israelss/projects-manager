import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import usernameUniquenessValidator from '../../../../src/middlewares/user/usernameUniqueness'
import { userService } from '../../../../src/services'
import CustomError, { UnprocessableEntity } from '../../../../src/utils/customError'
import { userServiceFindMock } from '../../mocks/services'

afterEach(() => {
  vi.clearAllMocks()
})

describe('User', () => {
  describe('Middleware', () => {
    describe('usernameUniqueness', () => {
      test('should pass with a valid new username', async () => {
        vi.spyOn(userService, 'find').mockImplementation(userServiceFindMock)
        const req = {
          body: {
            username: 'user.two'
          }
        } as Request
        const res = {} as Response
        const next = vi.fn()

        await usernameUniquenessValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an existent username', async () => {
        vi.spyOn(userService, 'find').mockImplementation(userServiceFindMock)
        const req = {
          body: {
            username: 'user.one'
          }
        } as Request
        const res = {} as Response
        const next = vi.fn()

        await usernameUniquenessValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(UnprocessableEntity.usernameNotUnique))
      })
    })
  })
})
