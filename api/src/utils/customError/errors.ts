import { ClientError } from '../../enums/http_status_codes'

export const BadRequest = {
  nameInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Name must have at least 2 (two) characters'
  },
  usernameInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Username must have at least 4 (four) characters'
  },
  passwordInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Password must have at least 8 (eight) characters'
  },
  titleInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Title must have at least 4 (four) characters'
  },
  zipCodeInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Zip Code must have exactly 8 (eight) numbers'
  },
  costInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Cost must have at least 1 (one) number'
  },
  deadlineInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Deadline must be a valid DateTime value'
  },
  idInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Id should be a valid UUID'
  }
}

export const Forbidden = {
  invalidOwner: {
    code: ClientError.FORBIDDEN,
    message: 'You cannot do this!'
  }
}

export const UnprocessableEntity = {
  wrongCredentials: {
    code: ClientError.UNPROCESSABLE_ENTITY,
    message: 'Incorrect username or password'
  },
  usernameNotUnique: {
    code: ClientError.UNPROCESSABLE_ENTITY,
    message: 'Username already taken, please chose another'
  }
}

export const NotFound = {
  projectNotFound: {
    code: ClientError.NOT_FOUND,
    message: 'The project was not found'
  }
}

export const NotAcceptable = {
  headerInvalid: {
    code: ClientError.NOT_ACCEPTABLE,
    message: 'Username must be provided on header'
  }
}
