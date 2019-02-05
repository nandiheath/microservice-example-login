import IUser from '../models/user';

const BluebirdPromise = require('bluebird');
const jwt = BluebirdPromise.promisifyAll(require('jsonwebtoken'));
const { JWT_SECRET } = require('../common/env');


export const sign = (user: IUser) => {
  return jwt.sign({ username: user.username }, JWT_SECRET);
}

export const signWithExpireTimeInMs = (user: IUser, ms: Number) => {
  return jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: `${ms}ms`
  });
}

export const verify = async (token) => {
  const payload = await jwt.verifyAsync(token, JWT_SECRET);
  return payload;
}

