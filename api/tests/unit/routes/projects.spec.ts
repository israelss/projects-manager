import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { projectController } from '../../../src/controllers'
import { projectValidation } from '../../../src/middlewares'
import { emptyHandler, emptyHandlerAsync } from '../mocks/middlewares'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(projectController, 'getAll').mockImplementation(emptyHandlerAsync)
vi.spyOn(projectController, 'markAsDone').mockImplementation(emptyHandlerAsync)
vi.spyOn(projectController, 'remove').mockImplementation(emptyHandlerAsync)
vi.spyOn(projectController, 'update').mockImplementation(emptyHandlerAsync)
vi.spyOn(projectValidation, 'username').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'id').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'ownership').mockImplementation(emptyHandlerAsync)
vi.spyOn(projectValidation, 'cost').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'deadline').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'title').mockImplementation(emptyHandler)
vi.spyOn(projectValidation, 'zipCode').mockImplementation(emptyHandler)

import app from '../../../src/app' // eslint-disable-line import/first

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks()
})

describe('Projects', () => {
  describe('Routes', () => {
    describe('GET /', () => {
      test('should call all middlewares and right controller method', async () => {
        await request(app).get('/projects')

        expect(projectValidation.username).toHaveBeenCalledOnce()
        expect(projectController.getAll).toHaveBeenCalledOnce()
      })
    })
    describe('PATCH /:id/done', () => {
      test('should call all middlewares and right controller method', async () => {
        await request(app).patch('/projects/:id/done')

        expect(projectValidation.id).toHaveBeenCalledOnce()
        expect(projectValidation.username).toHaveBeenCalledOnce()
        expect(projectValidation.ownership).toHaveBeenCalledOnce()
        expect(projectController.markAsDone).toHaveBeenCalledOnce()
      })
    })
    describe('DELETE /:id', () => {
      test('should call all middlewares and right controller method', async () => {
        await request(app).delete('/projects/:id')

        expect(projectValidation.id).toHaveBeenCalledOnce()
        expect(projectValidation.username).toHaveBeenCalledOnce()
        expect(projectValidation.ownership).toHaveBeenCalledOnce()
        expect(projectController.remove).toHaveBeenCalledOnce()
      })
    })
    describe('PUT /:id', () => {
      test('should call all middlewares and right controller method', async () => {
        await request(app).put('/projects/:id')

        expect(projectValidation.id).toHaveBeenCalledOnce()
        expect(projectValidation.username).toHaveBeenCalledOnce()
        expect(projectValidation.cost).toHaveBeenCalledOnce()
        expect(projectValidation.deadline).toHaveBeenCalledOnce()
        expect(projectValidation.title).toHaveBeenCalledOnce()
        expect(projectValidation.zipCode).toHaveBeenCalledOnce()
        expect(projectValidation.ownership).toHaveBeenCalledOnce()
        expect(projectController.update).toHaveBeenCalledOnce()
      })
    })
  })
})
