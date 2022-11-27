import { afterEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import app from '../../../../src/app'
import { userService } from '../../../../src/services'
import { ClientError, Success } from '../../../../src/enums/http_status_codes'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('User', () => {
  describe('Controller', () => {
    describe('login', () => {
      test('should return logged user username', async () => {
        vi.spyOn(userService, 'login').mockResolvedValue('user.one')
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
