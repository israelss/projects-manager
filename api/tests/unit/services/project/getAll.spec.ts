import { dbMock } from '../../../singleton'
import { getAll } from '../../../../src/services/project'
import * as utils from '../../../../src/utils/transformCepToLocation'
import { afterEach, describe, expect, test, vi } from 'vitest'
import {
  allProjectsFromDB,
  allProjectsReturned,
  projectUsername,
  projectWithLocation,
  projectWithNoLocation
} from '../../mocks/project'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Project', () => {
  describe('Service', () => {
    describe('getAll', () => {
      test('should get all projects from a user', async () => {
        dbMock.project.findMany.mockResolvedValue(allProjectsFromDB)
        vi.spyOn(utils, 'transformCepToLocation').mockResolvedValueOnce(projectWithNoLocation)
        vi.spyOn(utils, 'transformCepToLocation').mockResolvedValueOnce(projectWithLocation)
        await expect(getAll(projectUsername))
          .resolves
          .toEqual(allProjectsReturned)
      })
      test('should return an empty array if no project is found', async () => {
        dbMock.project.findMany.mockResolvedValue([])
        await expect(getAll(projectUsername)).resolves.toEqual([])
      })
    })
  })
})
