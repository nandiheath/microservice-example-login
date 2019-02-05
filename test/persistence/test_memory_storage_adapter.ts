import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import User from '../../src/models/user';
import MemoryStorageAdapter from './../../src/persistence/memory_storage_adapter';
import { ERROR_USER_ALREADY_EXISTS, ERROR_WRONG_CREDENTIAL } from '../../src/utils/api_error';

const { expect } = chai;

chai.use(chaiAsPromised);

describe('Memory Storage Adapter', () => {
  it('should store the user and able to get it', async () => {
    const msa: MemoryStorageAdapter = new MemoryStorageAdapter();
    const username = 'test_user_01';
    const user = new User(username);
    await msa.insertUser(user);

    const userInDb: User = await msa.getUserByUsername(username);
    expect(userInDb).to.be.deep.eq(user);
    expect(userInDb.username).to.be.eq(user.username);

  })

  it('should throw error when same user insert again', async () => {
    const msa: MemoryStorageAdapter = new MemoryStorageAdapter();
    const username = 'test_user_01';
    const user = new User(username);
    await msa.insertUser(user);

    const anotherUser = new User(username);
    await expect(msa.insertUser(anotherUser))
    .to.be.eventually.rejectedWith(Error, 'user already exists')
      .and.has.property('code', ERROR_USER_ALREADY_EXISTS);

  })

  it('should throw incorrect username/password error when the user does not exists', async () => {
    const msa: MemoryStorageAdapter = new MemoryStorageAdapter();
    const username = 'test_user_01';
    await expect(msa.getUserByUsername(username))
      .to.be.eventually.rejectedWith(Error, 'incorrect username/password')
      .and.has.property('code', ERROR_WRONG_CREDENTIAL);

  })

});