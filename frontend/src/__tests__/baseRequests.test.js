import { post, get, patch } from '../utils/baseRequests';
import mockAxios from 'axios';

describe('post()', () => {
  afterEach(() => {
    mockAxios.post.mockClear();
  });

  it('should call mockAxios on call', async () => {
    expect(mockAxios.post).toHaveBeenCalledTimes(0);
    await post();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });

  it('should have called axios with the right params', async () => {
    await post('/test/url/', { test: 'test' });
    expect(mockAxios.post).toHaveBeenCalledWith(
      '/test/url/',
      {
        test: 'test'
      },
      {} // config param is optional and by default empty object
    );
  });

  it('should return axios response', async () => {
    const expectedResponse = { test: 'test' };

    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve(expectedResponse)
    );

    const actualResponse = await post(null, null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output response status =/= 2xx', async () => {
    const expectedResponse = 'test response';

    mockAxios.post.mockReturnValue(
      Promise.reject({ response: expectedResponse })
    );

    const actualResponse = await post(null, null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output request if nothing was received', async () => {
    const expectedResponse = 'test request';

    mockAxios.post.mockReturnValue(
      Promise.reject({ request: expectedResponse })
    );

    const actualResponse = await post(null, null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output error message if something failed when setting up request', async () => {
    const expectedResponse = 'something failed';

    mockAxios.post.mockReturnValue(Promise.reject(new Error(expectedResponse)));

    const actualResponse = await post(null, null, null);

    expect(actualResponse).toBe(expectedResponse);
  });
});

describe('get()', () => {
  afterEach(() => {
    mockAxios.get.mockClear();
  });

  it('should call mockAxios on call', async () => {
    expect(mockAxios.get).toHaveBeenCalledTimes(0);
    await get();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should have called axios with the right params', async () => {
    await get('/test/url/');
    expect(mockAxios.get).toHaveBeenCalledWith(
      '/test/url/',
      {} // config param is optional and by default empty object
    );
  });

  it('should return axios response', async () => {
    const expectedResponse = { test: 'test' };

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(expectedResponse)
    );

    const actualResponse = await get(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output response status =/= 2xx', async () => {
    const expectedResponse = 'test response';

    mockAxios.get.mockReturnValue(
      Promise.reject({ response: expectedResponse })
    );

    const actualResponse = await get(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output request if nothing was received', async () => {
    const expectedResponse = 'test request';

    mockAxios.get.mockReturnValue(
      Promise.reject({ request: expectedResponse })
    );

    const actualResponse = await get(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output error message if something failed when setting up request', async () => {
    const expectedResponse = 'something failed';

    mockAxios.get.mockReturnValue(Promise.reject(new Error(expectedResponse)));

    const actualResponse = await get(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });
});

describe('patch()', () => {
  afterEach(() => {
    mockAxios.patch.mockClear();
  });

  it('should call mockAxios on call', async () => {
    expect(mockAxios.patch).toHaveBeenCalledTimes(0);
    await patch();
    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
  });

  it('should have called axios with the right params', async () => {
    const values = { test: 'test' };

    await patch('/test/url/', values);
    expect(mockAxios.patch).toHaveBeenCalledWith(
      '/test/url/',
      values,
      {} // config param is optional and by default empty object
    );
  });

  it('should return axios response', async () => {
    const expectedResponse = { test: 'test' };

    mockAxios.patch.mockImplementationOnce(() =>
      Promise.resolve(expectedResponse)
    );

    const actualResponse = await patch(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output response status =/= 2xx', async () => {
    const expectedResponse = 'test response';

    mockAxios.patch.mockReturnValue(
      Promise.reject({ response: expectedResponse })
    );

    const actualResponse = await patch(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output request if nothing was received', async () => {
    const expectedResponse = 'test request';

    mockAxios.patch.mockReturnValue(
      Promise.reject({ request: expectedResponse })
    );

    const actualResponse = await patch(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });

  it('should output error message if something failed when setting up request', async () => {
    const expectedResponse = 'something failed';

    mockAxios.patch.mockReturnValue(
      Promise.reject(new Error(expectedResponse))
    );

    const actualResponse = await patch(null, null);

    expect(actualResponse).toBe(expectedResponse);
  });
});
