import request from 'supertest'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { emptyHandler } from '../../mocks/middlewares'
import { allProjectsReturned } from '../../mocks/project'
import { projectService } from '../../../../src/services'
import { projectValidation } from '../../../../src/middlewares'
import { Success } from '../../../../src/enums/http_status_codes'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(projectValidation, 'username').mockImplementation(emptyHandler)

import app from '../../../../src/app' // eslint-disable-line import/first

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('Project', () => {
  describe('Controller', () => {
    describe('getAll', () => {
      test('should return all projects from user', async () => {
        vi.spyOn(projectService, 'getAll')
          .mockResolvedValue(allProjectsReturned)

        await request(app)
          .get('/projects')
          .expect(Success.OK)
          .then(async (response) => {
            const serializedProjects = JSON.parse(JSON.stringify(allProjectsReturned))
            expect(response.body).toStrictEqual({ projects: serializedProjects })
          })
      })
    })
  })
})
