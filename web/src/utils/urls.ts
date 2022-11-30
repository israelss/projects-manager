const API_BASE_PATH = 'http://localhost:3001'

export const API_URLS = {
  REGISTER_USER: `${API_BASE_PATH}/users`,
  LOGIN_USER: `${API_BASE_PATH}/users/login`,
  ADD_PROJECT: `${API_BASE_PATH}/project`,
  GET_ALL: `${API_BASE_PATH}/projects`,
  GET_PROJECT_BY_ID: (id: string) => `${API_BASE_PATH}/project/${id}`,
  PUT_PROJECT: (id: string) => `${API_BASE_PATH}/projects/${id}`,
  MARK_AS_DONE: (id: string) => `${API_BASE_PATH}/projects/${id}/done`,
  DELETE_PROJECT: (id: string) => `${API_BASE_PATH}/projects/${id}`
} as const

export const ROUTE_URLS = {
  LOGIN: '/login',
  REGISTER: '/register',
  ALL_PROJECTS: '/projects',
  NEW_PROJECT: '/projects/new',
  PROJECT_STATIC: '/projects/:id',
  PROJECT: (id: string) => `/projects/${id}`
} as const
