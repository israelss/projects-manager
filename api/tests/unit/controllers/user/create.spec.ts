import { describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import app from '../../../../src/app'
import { userService } from '../../../../src/services'
import { Success } from '../../../../src/enums/http_status_codes'

describe('User', () => {
  describe('Controller', () => {
    describe('create', () => {
      vi.spyOn(userService, 'create').mockResolvedValue('user.one')
      test('should return new user username', async () => {
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
            expect(response.body.username).toBe('user.one')
          })
      })
    })
  })
})
