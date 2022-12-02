import { dbMock } from '../../../singleton'
import { create } from '../../../../src/services/project'
import { describe, expect, test } from 'vitest'
import {
  projectCreatedWithValidZipCode,
  projectInput,
  projectUsername
} from '../../mocks/project'

describe('Project', () => {
  describe('Service', () => {
    describe('create', () => {
      test('should create new project', async () => {
        dbMock.project.create.mockResolvedValue(projectCreatedWithValidZipCode)
        await expect(create(projectUsername, projectInput))
          .resolves
          .toEqual(projectCreatedWithValidZipCode)
      })
    })
  })
})
