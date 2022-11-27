import { dbMock } from '../../../singleton'
import { create } from '../../../../src/services/user'
import { describe, expect, test } from 'vitest'
import { userOneCreated, userOneInput } from '../../mocks/user'

describe('User', () => {
  describe('Service', () => {
    describe('create', () => {
      test('should create new user ', async () => {
        dbMock.user.create.mockResolvedValue(userOneCreated)
        await expect(create(userOneInput)).resolves.toEqual(userOneCreated.username)
      })
    })
  })
})
