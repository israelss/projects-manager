export enum Success {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export enum ClientError {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  UNPROCESSABLE_ENTITY = 422,
}

export enum ServerError {
  INTERNAL_SERVER_ERROR = 500,
}
