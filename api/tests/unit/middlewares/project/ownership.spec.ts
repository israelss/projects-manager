import { Request, Response } from 'express'
import { afterEach, describe, expect, test, vi } from 'vitest'
import ownershipValidator from '../../../../src/middlewares/project/ownership'
import { projectService } from '../../../../src/services'
import CustomError, { Forbidden } from '../../../../src/utils/customError'
import { allProjectsReturned } from '../../mocks/project'

afterEach(() => {
  vi.clearAllMocks()
})

describe('Project', () => {
  describe('Middleware', () => {
    describe('ownership', () => {
      test('should pass with a valid ownership', async () => {
        vi.spyOn(projectService, 'getAll').mockResolvedValue(allProjectsReturned)
        const req = {
          headers: {
            username: 'user.one'
          },
          params: {
            id: '3a2b1c'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        await ownershipValidator(req, res, next)

        expect(next).toBeCalledWith()
      })
      test('should call next with error with an invalid ownership', async () => {
        const req = {
          headers: {
            username: 'user.one'
          },
          params: {
            id: '123456'
          }
        } as unknown as Request
        const res = {} as unknown as Response
        const next = vi.fn()

        await ownershipValidator(req, res, next)

        expect(next).toBeCalledWith(new CustomError(Forbidden.invalidOwner))
      })
    })
  })
})
