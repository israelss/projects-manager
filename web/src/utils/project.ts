import { CustomError } from '../interfaces/error'
import { ProjectData, ProjectRequestArgs, ProjectRequestResult } from '../interfaces/project'

export const projectsFetcher = async <T,>(url: string, username: string | false): Promise<T> => {
  const headers = username !== false ? { username } : undefined

  const res = await fetch(url, { method: 'GET', headers })

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as CustomError
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return await res.json()
}

export const sendRequest = async ({
  url,
  method,
  username,
  data
}: ProjectRequestArgs): Promise<ProjectRequestResult> => {
  const shouldSendBody = ['PUT', 'POST'].includes(method)
  const headers: HeadersInit = { username }
  if (shouldSendBody) headers['Content-Type'] = 'application/json'

  const body = shouldSendBody ? JSON.stringify(data) : null

  const res = await fetch(url, { method, headers, body })

  if (!res.ok) {
    const { message } = await res.json()
    return { ok: false, message }
  }

  return { ok: true }
}

const getValueOf = (dateString: string): number => new Date(dateString).valueOf()

export const sortProjectsByDeadline = (a: ProjectData, b: ProjectData): number =>
  getValueOf(a.deadline) - getValueOf(b.deadline)
