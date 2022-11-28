import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { userController } from '../../../src/controllers'
import { userValidation } from '../../../src/middlewares'
import { emptyHandler, emptyHandlerAsync } from '../mocks/middlewares'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(userController, 'create').mockImplementation(emptyHandlerAsync)
vi.spyOn(userController, 'login').mockImplementation(emptyHandlerAsync)
vi.spyOn(userValidation, 'username').mockImplementation(emptyHandler)
vi.spyOn(userValidation, 'usernameUniqueness').mockImplementation(emptyHandlerAsync)
vi.spyOn(userValidation, 'name').mockImplementation(emptyHandler)
vi.spyOn(userValidation, 'password').mockImplementation(emptyHandler)

import app from '../../../src/app' // eslint-disable-line import/first

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks()
})

describe('User', () => {
  describe('Routes', () => {
    describe('POST /login', () => {
      test('should call all middlewares and right controller method', async () => {
        await request(app).post('/users/login')

        expect(userValidation.username).toHaveBeenCalledOnce()
        expect(userValidation.password).toHaveBeenCalledOnce()
        expect(userController.login).toHaveBeenCalledOnce()
      })
    })
    describe('POST /', () => {
      test('should call all middlewares and right controller method', async () => {
        await request(app).post('/users')

        expect(userValidation.username).toHaveBeenCalledOnce()
        expect(userValidation.usernameUniqueness).toHaveBeenCalledOnce()
        expect(userValidation.name).toHaveBeenCalledOnce()
        expect(userValidation.password).toHaveBeenCalledOnce()
        expect(userController.create).toHaveBeenCalledOnce()
      })
    })
  })
})
