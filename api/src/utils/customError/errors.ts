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
  usernameNotUnique: {
    code: ClientError.BAD_REQUEST,
    message: 'Username already taken, please chose another'
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
  headerInvalid: {
    code: ClientError.BAD_REQUEST,
    message: 'Username must be provided on header'
  },
}
