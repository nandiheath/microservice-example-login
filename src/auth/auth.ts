import IUser from '../models/user';

const BluebirdPromise = require('bluebird');
const jwt = BluebirdPromise.promisifyAll(require('jsonwebtoken'));
const { JWT_SECRET } = require('../common/env');


export const sign = (user: IUser) => {
  return jwt.sign({ username: user.username }, JWT_SECRET);
}

export const verify = async (token) => {
  const payload = await jwt.verifyAsync(token, JWT_SECRET);
  return payload;
}

