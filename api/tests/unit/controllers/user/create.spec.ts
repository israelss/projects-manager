import { afterEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { userValidation } from '../../../../src/middlewares'
import { emptyHandler, emptyHandlerAsync } from '../../mocks/middlewares'
import { userService } from '../../../../src/services'
import { Success } from '../../../../src/enums/http_status_codes'
import { User } from '@prisma/client'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(userValidation, 'usernameUniqueness').mockImplementation(emptyHandlerAsync)
vi.spyOn(userValidation, 'username').mockImplementation(emptyHandler)
vi.spyOn(userValidation, 'name').mockImplementation(emptyHandler)
vi.spyOn(userValidation, 'password').mockImplementation(emptyHandler)

import app from '../../../../src/app' // eslint-disable-line import/first

afterEach(() => {
  vi.restoreAllMocks()
})

describe('User', () => {
  describe('Controller', () => {
    describe('create', () => {
      test('should return new user username', async () => {
        vi.spyOn(userService, 'create')
          .mockImplementation(async (user: Omit<User, 'id'>) => {
            return await Promise.resolve(user.username)
          })

        const data = {
          username: 'user.one',
          password: '12345678',
          name: 'User One'
        }

        await request(app)
          .post('/users')
          .send(data)
          .expect(Success.CREATED)
          .then(async (response) => {
            expect(response.body.username).toBe(data.username)
          })
      })
    })
  })
})
