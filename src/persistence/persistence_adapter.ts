import IUser from '../models/user';
import MemoryStorageAdapter from './memory_storage_adapter';

export interface IPersistenceAdapter {
  insertUser(user: IUser): Promise<void>;
  getUserByUsername(username:string): Promise<IUser>;
};

const persistenceAdapter:IPersistenceAdapter = new MemoryStorageAdapter();
export default persistenceAdapter;

