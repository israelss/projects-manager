import { dbMock } from '../../../singleton'
import { get } from '../../../../src/services/project'
import * as utils from '../../../../src/utils/transformCepToLocation'
import { afterEach, describe, expect, test, vi } from 'vitest'
import {
  projectCreatedWithValidZipCode,
  projectWithLocation
} from '../../mocks/project'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Project', () => {
  describe('Service', () => {
    describe('get', () => {
      test('should get a project', async () => {
        dbMock.project.findUnique.mockResolvedValue(projectCreatedWithValidZipCode)
        vi.spyOn(utils, 'transformCepToLocation').mockResolvedValue(projectWithLocation)
        await expect(get(projectCreatedWithValidZipCode.id))
          .resolves
          .toEqual(projectWithLocation)
      })
      test('should return null if project is not found', async () => {
        dbMock.project.findUnique.mockResolvedValue(null)
        await expect(get(projectCreatedWithValidZipCode.id)).resolves.toBeNull()
      })
    })
  })
})
