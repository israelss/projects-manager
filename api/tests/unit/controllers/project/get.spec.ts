import request from 'supertest'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { emptyHandler } from '../../mocks/middlewares'
import { projectWithLocation } from '../../mocks/project'
import { projectService } from '../../../../src/services'
import { projectValidation } from '../../../../src/middlewares'
import { ClientError, Success } from '../../../../src/enums/http_status_codes'
import { NotFound } from '../../../../src/utils/customError'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(projectValidation, 'id').mockImplementation(emptyHandler)

import app from '../../../../src/app' // eslint-disable-line import/first

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('Project', () => {
  describe('Controller', () => {
    describe('get', () => {
      test('should return project', async () => {
        vi.spyOn(projectService, 'get')
          .mockResolvedValue(projectWithLocation)
        await request(app)
          .get('/project/:id')
          .set({ username: 'user.one' })
          .expect(Success.OK)
          .then(async (response) => {
            const serializedProject = JSON.parse(JSON.stringify(projectWithLocation))
            expect(response.body).toStrictEqual(serializedProject)
          })
      })
      test('should return a message when project is not found', async () => {
        vi.spyOn(projectService, 'get')
          .mockResolvedValue(null)
        await request(app)
          .get('/project/:id')
          .set({ username: 'user.one' })
          .expect(ClientError.NOT_FOUND)
          .then(async (response) => {
            expect(response.body.message).toStrictEqual(NotFound.projectNotFound.message)
          })
      })
    })
  })
})
