
import User from '../models/user';
import {
  InternalError
} from './api_error';
const passport = require('passport');
// const { logger } = require('./../utils/logger');

/**
 * Middleware for handling passport authenication
 * http://www.passportjs.org/docs/downloads/html/
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const passportAuthenicate = (authMethod) => {
  return (req, res, next) => {
    passport.authenticate(authMethod, (err, user) => {
      // Catch the error if authenicate failed
      if (err) {
        return next(InternalError(err));
      }
      // Passport.js will pass the user info to request object
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        return next();
      })
    })(req, res, next);
  }
}

export const formatResponse = (data) => { // eslint-disable-line
  return {
    success: true,
    data
  };
};

export const formatPagination = (paginationData) => { // eslint-disable-line
  return {
    success: true,
    data: paginationData.docs,
    total: paginationData.total,
    limit: paginationData.limit,
    page: paginationData.page,
    pages: paginationData.pages,
  };
};


export const getSearchQueryFromRequest = (req) => {
  const search = JSON.parse(req.query.search);
  return search;
};

export function ensureInt(str, defaulValue) {
  const result = parseInt(str, 10);
  return Number.isNaN(result) ? defaulValue : result;
}

export const getPaginationFromParam = (req) => {
  const page = ensureInt(req.query.page, 1);
  const limit = ensureInt(req.query.limit, 100);

  return {
    page, limit
  };
};


export const listModel = ModelClass => async (req, res, next) => {
  const instances = await ModelClass.paginate({}, getPaginationFromParam(req));
  res.send(formatPagination(instances));
  return next();
};


