import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import titleValidator from '../../../../src/middlewares/project/title'
import CustomError, { BadRequest } from '../../../../src/utils/customError'

afterEach(() => {
  vi.clearAllMocks()
})

describe('Project', () => {
  describe('Middleware', () => {
    describe('title', () => {
      test('should pass with a valid title', () => {
        const req = {
          body: {
            title: '1234'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        titleValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid title', () => {
        const req = {
          body: {
            title: 'abc'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        titleValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(BadRequest.titleInvalid))
      })
    })
  })
})
