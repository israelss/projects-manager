export default class CustomError extends Error {
  public code: number

  constructor ({ code, message }: { code: number, message: string }) {
    super(message)
    this.code = code
  }
}
