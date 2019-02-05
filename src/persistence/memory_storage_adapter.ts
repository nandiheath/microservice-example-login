import { IPersistenceAdapter } from './persistence_adapter';
import IUser from '../models/user';
import { DuplicatedEntryError, EntityNotFoundError } from './../utils/api_error';

class MemoryStorageAdapter implements IPersistenceAdapter {
  users: {[username:string]: IUser}

  constructor() {
    this.users = {};
  }

  insertUser(user: IUser): Promise<void>{
    if (this.users[user.username] !== undefined) {
      throw DuplicatedEntryError();
    }

    this.users[user.username] = user;
    return;
  }

  getUserByUsername(username:string): Promise<IUser>{
    if (this.users[username] === undefined) {
      throw EntityNotFoundError();
    }

    return Promise.resolve(this.users[username]);
  }
}

export default MemoryStorageAdapter;