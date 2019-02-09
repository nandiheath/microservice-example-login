import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as auth from '../../src/auth/auth';
import User from '../../src/models/user';

const { expect } = chai;

chai.use(chaiAsPromised);

describe('Authentication Test', () => {
  const username = 'test_user_001'
  const user = new User(username);
  it('Should return the signed token', async () => {
    const token = auth.sign(user);
    expect(token).to.be.not.null;
    expect(token).to.be.not.undefined;
  });

  it('Should get the payload from the signed token', async () => {
    const token = auth.sign(user);
    const payload = await auth.verify(token);
    expect(payload).to.be.not.null;
    expect(payload).to.be.not.undefined;
    expect(payload.username).to.be.equal(user.username);
  });

  it('Should throw an error when sending the wrong token', async () => {
    const token = `${auth.sign(user)}_failed`;
    await expect(auth.verify(token)).to.eventually.be.rejectedWith(Error);
  });

  it('Should expire according to the param', async function() {
    this.timeout(5000);
    // Expire in 1 second
    const token = auth.signWithExpireTimeInMs(user, 1000);

    // It is valid
    const payload = await auth.verify(token);
    expect(payload).to.be.not.null;
    expect(payload).to.be.not.undefined;
    expect(payload.username).to.be.equal(user.username);

    // delay 2 seconds
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
    await expect(auth.verify(token)).to.eventually.be.rejectedWith(Error);
  })
});
