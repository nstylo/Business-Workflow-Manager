import { post } from '../utils/requests';
import mockAxios from 'axios';


describe('post()', () => {
  afterEach(() => {
    mockAxios.post.mockClear();
  });

  it('should call mockAxios on call', async () => {
    expect(mockAxios.post).toHaveBeenCalledTimes(0);
    await post({});
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });

  it('should have called axios with the right params', async () => {
    await post('/test/url/', { test: 'test' });
    expect(mockAxios.post).toHaveBeenCalledWith('/test/url/', {
      test: 'test'
    });
  });

  it('should return axios response', async () => {
    const expectedResponse = { test: 'test' };

    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve(expectedResponse)
    );

    const actualResponse = await post(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output error if axios promise reject', async () => {
    const expectedResponse = 'something failed';

    mockAxios.post.mockReturnValue(Promise.reject(new Error(expectedResponse)));

    const actualResponse = await post(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });
});