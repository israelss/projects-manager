import request from 'supertest'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { emptyHandler } from '../../mocks/middlewares'
import { projectWithLocation } from '../../mocks/project'
import { projectService } from '../../../../src/services'
import { projectValidation } from '../../../../src/middlewares'
import { Success } from '../../../../src/enums/http_status_codes'

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
          .expect(Success.OK)
          .then(async (response) => {
            const serializedProject = JSON.parse(JSON.stringify(projectWithLocation))
            expect(response.body).toStrictEqual(serializedProject)
          })
      })
    })
  })
})
