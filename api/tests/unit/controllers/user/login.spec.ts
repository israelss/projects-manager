import request from 'supertest'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { emptyHandler } from '../../mocks/middlewares'
import { userService } from '../../../../src/services'
import { userValidation } from '../../../../src/middlewares'
import { ClientError, Success } from '../../../../src/enums/http_status_codes'

// Any handler mock implementation must be before the import of app,
// otherwise the handler real implementation is used instead of the mocked one
vi.spyOn(userValidation, 'username').mockImplementation(emptyHandler)
vi.spyOn(userValidation, 'password').mockImplementation(emptyHandler)

import app from '../../../../src/app' // eslint-disable-line import/first
import { User } from '@prisma/client'

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('User', () => {
  describe('Controller', () => {
    describe('login', () => {
      test('should return logged user username', async () => {
        vi.spyOn(userService, 'login')
        .mockImplementation(async (user: Pick<User, 'username'|'password'>) => {
          return await Promise.resolve(user.username)
        })

        const data = {
          username: 'user.one',
          password: '12345678'
        }

        await request(app)
          .post('/users/login')
          .send(data)
          .expect(Success.OK)
          .then(async (response) => {
            expect(response.body.username).toBe('user.one')
          })
      })

      test('should return an error with wrong username or password', async () => {
        vi.spyOn(userService, 'login').mockResolvedValue(null)
        const data = {
          username: 'one.user',
          password: '87654321'
        }

        await request(app)
          .post('/users/login')
          .send(data)
          .expect(ClientError.UNPROCESSABLE_ENTITY)
          .then(async (response) => {
            expect(response.body.message).toBe('Incorrect username or password')
          })
      })
    })
  })
})
