export const projectInput = {
  title: 'Nome do projeto',
  zip_code: 26700000,
  deadline: new Date('2022-11-30T00:00:00.000Z'),
  cost: 1000
}

export const projectUsername = 'user.one'

export const projectCreatedWithZipCode = (zip_code: number) => ({
  id: '3a2b1c',
  title: 'Nome do projeto',
  zip_code,
  cost: 1000,
  done: false,
  deadline: new Date('2022-11-30T00:00:00.000Z'),
  username: 'user.one',
  created_at: new Date('2022-11-27T00:00:00.000Z'),
  updated_at: new Date('2022-11-27T00:00:00.000Z')
})

export const locationFound = 'Mendes/RJ'
export const locationNotFound = 'Não foi possível encontrar a localização do CEP 12345678'
