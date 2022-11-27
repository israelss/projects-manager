import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended'
import { db } from '../src/utils/db.server'
import { afterAll, beforeEach, vi } from 'vitest'


vi.mock('../src/utils/db.server', () => ({
  __esModule: true,
  db: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(dbMock)
})

afterAll(() => {
  mockReset(dbMock)
})

export const dbMock = db as unknown as DeepMockProxy<PrismaClient>
