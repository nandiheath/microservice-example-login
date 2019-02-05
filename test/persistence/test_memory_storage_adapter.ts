import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as auth from '../../src/auth/auth';
import User from '../../src/models/user';

const { expect } = chai;

chai.use(chaiAsPromised);

describe('Memory Storage Adapter', () => {
  it('should store the user and able to get it', () => {
    expect(false).to.be.true;
  })

  it('should throw error when same user insert again', () => {
    expect(false).to.be.true;
  })

  it('should throw error when the user does not exists', () => {
    expect(false).to.be.true;
  })

});