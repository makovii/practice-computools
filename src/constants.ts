import { DataType } from 'sequelize-typescript';

const PRIMARY_KEY = {
  type: DataType.INTEGER,
  unique: true,
  autoIncrement: true,
  primaryKey: true,
};

const WRONG_EMAIL_OR_PASS = { message: 'wrong email or passord' };

const ENCODING_SALT = 7;

const SAME_EMAIL = { message: 'user with same email already exist' };
const SAME_TEAM = { message: 'team with same name already exist' };

const MUST_BE_STR = { message: 'must be string' };
const WRONG_EMAIL = { message: 'wrong email' };
const MORE4LESS22 = { message: 'more than 4 but less than 22' };
const VALIDATION = { message: 'validation error' };

const NOT_FOUND = { message: 'page not found'};
const USER_NOT_FOUND = { message: 'user not found'};
const ROLE_USER_NOT_FOUND = { message: "there isn't user role"};
const REQUEST_NOT_FOUND = { message: "there isn't this request"};
const RECIPIENT_NOT_FOUND = { message: 'recipient not found'};
const NOT_AUTHORIZED = { message: 'user is not authorized' };
const RESENDING = { message: 'retry send request' };
const REQUEST_CANCELED = { message: 'request has been canceled' };
const REQUEST_WAS_APPROVED = { message: 'the request has already been approved'};
const REQUEST_WAS_DECLINE = { message: 'the request has already been decline'};
const ACCESS_CANCELED = {message: 'access canceled'};
const ACCESS_LEAVE = {message: 'access leave'};
const ACCESS_APPROVE = {message: 'access approve'}
const NO_ACCESS = { message: 'No access'};

const LOG_USER_CREATE = { message: "created user: "}

const MESSAGE = {
  subject: 'confirm join',
  text: '',
};

enum ROLE {
  admin = 1,
  player = 2,
  manager = 3,
}

enum RequestStatus {
  approve = 1,
  decline = 2,
  pending = 3,
  canceled = 4
}
enum RequestType {
  join = 1,
  leave = 2,
}

export {
  PRIMARY_KEY,
  WRONG_EMAIL_OR_PASS,
  ENCODING_SALT,
  SAME_EMAIL,
  MUST_BE_STR,
  WRONG_EMAIL,
  NOT_FOUND,
  NOT_AUTHORIZED,
  MORE4LESS22,
  USER_NOT_FOUND,
  ROLE_USER_NOT_FOUND,
  NO_ACCESS,
  LOG_USER_CREATE,
  SAME_TEAM,
  RECIPIENT_NOT_FOUND,
  RESENDING,
  REQUEST_CANCELED,
  REQUEST_NOT_FOUND,
  REQUEST_WAS_APPROVED,
  ACCESS_CANCELED,
  ACCESS_LEAVE,
  ACCESS_APPROVE,
  REQUEST_WAS_DECLINE,
  VALIDATION,
  MESSAGE,
  ROLE,
  RequestStatus,
  RequestType
};
