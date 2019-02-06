import { IPersistenceAdapter } from './persistence_adapter';
import IUser from '../models/user';
import { UserAlreadyExistsError, InvalidCredentialError } from './../utils/api_error';

class MemoryStorageAdapter implements IPersistenceAdapter {
  users: {[username:string]: IUser}

  constructor() {
    this.users = {};
  }

  async insertUser(user: IUser): Promise<void>{
    if (this.users[user.username] !== undefined) {
      throw UserAlreadyExistsError();
    }

    this.users[user.username] = user;
    return;
  }

  async getUserByUsername(username:string): Promise<IUser>{
    const user:IUser = this.users[username];
    if (user === undefined) {
      throw InvalidCredentialError();
    }

    return Promise.resolve(user);
  }
}

export default MemoryStorageAdapter;