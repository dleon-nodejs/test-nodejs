import moxios from 'moxios';
import { roleApi } from './factory-user-api.util';

describe('Suite - Axios', () => {
  const instanceMock = roleApi();
  beforeEach(() => {
    moxios.install(instanceMock);
  });
  afterEach(() => {
    moxios.uninstall(instanceMock);
  });
  it('Should create a valid axios instance', async () => {
    moxios.stubRequest('http://fakeurl.com', {
      status: 200,
    });
    const response = await instanceMock.get('http://fakeurl.com');
    expect(response.status).toEqual(200);
  });
});
