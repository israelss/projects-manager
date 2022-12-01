export interface CustomError extends Error {
  info: { message: string }
  status: number
}
