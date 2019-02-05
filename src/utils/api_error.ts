import Errors from 'restify-errors';

const ERROR_INTERNAL = 500;
// 1xxxx: auth related
const ERROR_USER_NOT_FOUND = 10000;


// 2xxxx: db/server related
const ERROR_ENTITY_NOT_FOUND = 20000;
export const ERROR_SERVER_EXCEPTION = 20001;
const ERROR_ENTITY_ALREADY_EXISTS = 20002;
const ERROR_ENTITY_DUPLICATED = 20003;
const ERROR_ENTITY_INVALID_REQUEST = 20004;

export const EntityNotFoundError = () => new Errors.BadRequestError({ code: ERROR_ENTITY_NOT_FOUND }, 'entity not found');

export const UnauthoirzedRequestError = () => new Errors.UnauthorizedError({ code: ERROR_USER_NOT_FOUND }, 'user not found');

export const dbConnectionFailed = () => new Errors.InternalServerError({ code: ERROR_SERVER_EXCEPTION }, 'server exception');

export const EntityAlreadyExists = () => new Errors.InternalServerError({ code: ERROR_ENTITY_ALREADY_EXISTS }, 'entity already exists');

export const DuplicatedEntryError = () => new Errors.BadRequestError({ code: ERROR_ENTITY_DUPLICATED }, 'entity already exists');

export const InvalidRequestError = (msg) => new Errors.BadRequestError({ code: ERROR_ENTITY_INVALID_REQUEST }, msg);

export const InternalError = err => new Errors.InternalServerError({ code: ERROR_INTERNAL }, err.message);
