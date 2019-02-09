import { UnthenticatedRequestError, InvalidRequestError } from './../utils/api_error';
// const { logger } = require('./../utils/logger');
import User from './../models/user';
import { sign } from './../auth/auth';
import { formatResponse } from '../utils/api_helper';
import PersistenceAdapter from './../persistence/persistence_adapter';

/**
 * POST /auth/login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const login = async (req, res, next) => {
  const { username, password }: { username: string, password: string }= req.body;
  // TODO: may be use a library to validate the request
  if (username === undefined) {
    throw InvalidRequestError('username field is missing');
  }

  if (password === undefined) {
    throw InvalidRequestError('password field is missing');
  }

  // Will throw user not found error
  const user:User = await PersistenceAdapter.getUserByUsername(username);
  let authenticated = false;
  if (user !== null) {
    authenticated = await user.verifyPassword(req.body.password);
  }

  if (!authenticated) {
    throw UnthenticatedRequestError();
  } else {
    const access_token = await sign(user);
    res.send(formatResponse({ user, access_token }));
    return next();
  }
}

/**
 * POST /auth/register
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const register = async (req, res, next) => {
  const { username, password } = req.body;
  if (username === undefined) {
    throw InvalidRequestError('username field is missing');
  }
  if (password === undefined) {
    throw InvalidRequestError('password field is missing');
  }

  const user = new User(username);
  await user.setPassword(password);

  await PersistenceAdapter.insertUser(user);

  const access_token = await sign(user);
  res.send(formatResponse({
    user,
    access_token
  }));
  return next();
}


