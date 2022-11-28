import request from 'supertest'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { emptyHandler, emptyHandlerAsync } from '../../mocks/middlewares'
import { projectDone } from '../../mocks/project'
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
    describe('markAsDone', () => {
      test('should return project', async () => {
        vi.spyOn(projectService, 'markAsDone')
          .mockResolvedValue(projectDone)
        await request(app)
          .patch('/projects/:id/done')
          .expect(Success.OK)
          .then(async (response) => {
            const serializedProject = JSON.parse(JSON.stringify(projectDone))
            expect(response.body).toStrictEqual(serializedProject)
            expect(response.body.done).toBeTruthy()
          })
      })
    })
  })
})
