export const projectInput = {
  title: 'Nome do projeto',
  zip_code: 26700000,
  deadline: new Date('2022-11-30T00:00:00.000Z'),
  cost: 1000
}

export const projectUsername = 'user.one'

export const projectCreatedWithValidZipCode = {
  id: '3a2b1c',
  title: 'Nome do projeto',
  zip_code: 26700000,
  cost: 1000,
  done: false,
  deadline: new Date('2022-11-30T00:00:00.000Z'),
  username: 'user.one',
  created_at: new Date('2022-11-27T00:00:00.000Z'),
  updated_at: new Date('2022-11-27T00:00:00.000Z')
}

const projectCreatedWithInvalidZipCode = {
  id: '4z3a2b',
  title: 'Nome do projeto 2',
  zip_code: 12345678,
  cost: 1000,
  done: false,
  deadline: new Date('2022-11-30T00:00:00.000Z'),
  username: 'user.one',
  created_at: new Date('2022-11-27T00:00:00.000Z'),
  updated_at: new Date('2022-11-27T00:00:00.000Z')
}

export const projectWithLocation = {
  id: '3a2b1c',
  title: 'Nome do projeto',
  location: 'Mendes/RJ',
  cost: 1000,
  done: false,
  deadline: new Date('2022-11-30T00:00:00.000Z'),
  username: 'user.one',
  created_at: new Date('2022-11-27T00:00:00.000Z'),
  updated_at: new Date('2022-11-27T00:00:00.000Z')
}

export const projectWithNoLocation = {
  id: '4z3a2b',
  title: 'Nome do projeto 2',
  location: 'Não foi possível encontrar a localização do CEP 12345678',
  cost: 1000,
  done: false,
  deadline: new Date('2022-11-30T00:00:00.000Z'),
  username: 'user.one',
  created_at: new Date('2022-11-27T00:00:00.000Z'),
  updated_at: new Date('2022-11-27T00:00:00.000Z')
}

export const allProjectsFromDB = [
  projectCreatedWithValidZipCode,
  projectCreatedWithInvalidZipCode
]

export const allProjectsReturned = [
  projectWithLocation,
  projectWithNoLocation
]
