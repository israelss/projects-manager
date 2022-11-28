import request from 'supertest'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { emptyHandler, emptyHandlerAsync } from '../../mocks/middlewares'
import { projectCreatedWithValidZipCode } from '../../mocks/project'
import { projectService } from '../../../../src/services'
import { projectValidation } from '../../../../src/middlewares'
import { Success } from '../../../../src/enums/http_status_codes'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(projectValidation, 'id').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'username').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'cost').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'deadline').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'title').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'zipCode').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'ownership').mockImplementation(emptyHandlerAsync)

import app from '../../../../src/app' // eslint-disable-line import/first

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('Project', () => {
  describe('Controller', () => {
    describe('update', () => {
      test('should return updated project', async () => {
        vi.spyOn(projectService, 'update')
          .mockResolvedValue(projectCreatedWithValidZipCode)
        await request(app)
          .put('/projects/:id')
          .expect(Success.OK)
          .then(async (response) => {
            const serializedProject = JSON.parse(JSON.stringify(projectCreatedWithValidZipCode))
            expect(response.body).toStrictEqual(serializedProject)
          })
      })
    })
  })
})
