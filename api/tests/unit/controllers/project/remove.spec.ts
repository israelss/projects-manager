import request from 'supertest'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { emptyHandler, emptyHandlerAsync } from '../../mocks/middlewares'
import { projectService } from '../../../../src/services'
import { projectValidation } from '../../../../src/middlewares'
import { Success } from '../../../../src/enums/http_status_codes'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(projectValidation, 'id').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'username').mockImplementation(emptyHandler)
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
    describe('remove', () => {
      test('should return no content', async () => {
        vi.spyOn(projectService, 'remove')
          .mockImplementation(async () => {})
        await request(app)
          .delete('/projects/:id')
          .expect(Success.NO_CONTENT)
          .then(async (response) => {
            expect(response.body).toStrictEqual({})
          })
      })
    })
  })
})
