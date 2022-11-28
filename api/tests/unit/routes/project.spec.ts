import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { projectController } from '../../../src/controllers'
import { projectValidation } from '../../../src/middlewares'
import { emptyHandler, emptyHandlerAsync } from '../mocks/middlewares'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(projectController, 'create').mockImplementation(emptyHandlerAsync)
vi.spyOn(projectController, 'get').mockImplementation(emptyHandlerAsync)
vi.spyOn(projectValidation, 'username').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'cost').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'deadline').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'title').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'zipCode').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'id').mockImplementation(emptyHandler)

import app from '../../../src/app' // eslint-disable-line import/first

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks()
})

describe('Project', () => {
  describe('Routes', () => {
    describe('POST /', () => {
      test('should call all middlewares and right controller method', async () => {
        await request(app).post('/project')

        expect(projectValidation.username).toHaveBeenCalledOnce()
        expect(projectValidation.cost).toHaveBeenCalledOnce()
        expect(projectValidation.deadline).toHaveBeenCalledOnce()
        expect(projectValidation.title).toHaveBeenCalledOnce()
        expect(projectValidation.zipCode).toHaveBeenCalledOnce()
        expect(projectController.create).toHaveBeenCalledOnce()
      })
    })
    describe('POST /:id', () => {
      test('should call all middlewares and right controller method', async () => {
        await request(app).get('/project/:id')

        expect(projectValidation.id).toHaveBeenCalledOnce()
        expect(projectController.get).toHaveBeenCalledOnce()
      })
    })
  })
})
