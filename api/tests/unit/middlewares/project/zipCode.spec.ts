import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import zipCodeValidator from '../../../../src/middlewares/project/zipCode'
import CustomError, { BadRequest } from '../../../../src/utils/customError'

afterEach(() => {
  vi.clearAllMocks()
})

describe('Project', () => {
  describe('Middleware', () => {
    describe('zipCode', () => {
      test('should pass with a valid zipCode', () => {
        const req = {
          body: {
            zip_code: '12345678'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        zipCodeValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid zipCode', () => {
        const req = {
          body: {
            zip_code: '123'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        zipCodeValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(BadRequest.zipCodeInvalid))
      })
    })
  })
})
