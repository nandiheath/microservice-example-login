import * as PromiseBluebird from 'bluebird';
const bcrypt = PromiseBluebird.promisifyAll(require('bcrypt'));

/**
 * Public interface for user model
 */
export interface IUser {
  username? :string;

  // verify the password
  verifyPassword(hashedPassword:string ): Promise<boolean>;

}

export const hashPassword = async (password) => {
  return bcrypt.hashAsync(password, 14);
}

import IModel from './model';

export class User implements IUser {
  username: string;
  passwordHash: string;

  constructor(username:string) {
    this.username = username;
  }

  async setPassword(password:string): Promise<void> {
    this.passwordHash = await hashPassword(password);
  }

  async verifyPassword(hashedPassword:string): Promise<boolean> {
    return bcrypt.compareAsync(hashedPassword, this.passwordHash);
  }
}


export default User;
