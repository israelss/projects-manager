import { dbMock } from '../../../singleton'
import { login } from '../../../../src/services/user'
import { describe, expect, test } from 'vitest'
import {
  userLoginInput,
  userWrongPasswordInput,
  userWrongUsernameInput,
  userOneCreated
} from '../../mocks/user'

describe('User', () => {
  describe('Service', () => {
    describe('login', () => {
      test('should log user in', async () => {
        dbMock.user.findUnique.mockResolvedValue(userOneCreated)
        await expect(login(userLoginInput)).resolves.toEqual(userLoginInput.username)
      })
      test('should NOT log user in if password incorrect', async () => {
        dbMock.user.findUnique.mockResolvedValue(userOneCreated)
        await expect(login(userWrongPasswordInput)).resolves.toBeNull()
      })
      test('should NOT log user in if username incorrect', async () => {
        dbMock.user.findUnique.mockResolvedValue(null)
        await expect(login(userWrongUsernameInput)).resolves.toBeNull()
      })
    })
  })
})
