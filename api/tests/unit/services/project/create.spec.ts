import { dbMock } from '../../../singleton'
import { create } from '../../../../src/services/project'
import { describe, expect, test } from 'vitest'
import { projectCreatedWithZipCode, projectInput, projectUsername } from '../../mocks/project'

describe('Project', () => {
  describe('Service', () => {
    describe('create', () => {
      test('should create new project', async () => {
        const createdProject = projectCreatedWithZipCode(26700000)
        dbMock.project.create.mockResolvedValue(createdProject)
        await expect(create(projectUsername, projectInput)).resolves.toEqual(createdProject)
      })
    })
  })
})
