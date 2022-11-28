import request from 'supertest'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { emptyHandler } from '../../mocks/middlewares'
import { projectCreatedWithValidZipCode, projectInput } from '../../mocks/project'
import { projectService } from '../../../../src/services'
import { projectValidation } from '../../../../src/middlewares'
import { Success } from '../../../../src/enums/http_status_codes'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(projectValidation, 'username').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'cost').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'deadline').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'title').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'zipCode').mockImplementation(emptyHandler)

import app from '../../../../src/app' // eslint-disable-line import/first

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('Project', () => {
  describe('Controller', () => {
    describe('create', () => {
      test('should return new project', async () => {
        vi.spyOn(projectService, 'create')
          .mockResolvedValue(projectCreatedWithValidZipCode)
        await request(app)
          .post('/project')
          .send(projectInput)
          .expect(Success.CREATED)
          .then(async (response) => {
            expect(response.body.title).toBe(projectInput.title)
            expect(response.body.zip_code).toBe(projectInput.zip_code)
            expect(response.body.deadline).toBe(projectInput.deadline.toISOString())
            expect(response.body.cost).toBe(projectInput.cost)
          })
      })
    })
  })
})
