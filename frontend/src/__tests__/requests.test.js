import { handleSubmit, logout, checkAuthenticated } from '../utils/requests';
import FORM_CONST from '../utils/form_const';
import history from '../history';

const requests = require('../utils/baseRequests');

// mock constants for requests, e.g. routing url..
const constants = {
  request_url: '/request_url/',
  redirect_url: '/redirect_url/',
  status: {
    successful: 200,
    unsuccessful: 400,
    unexpected: null
  }
};

describe('handleSubmit', () => {
  // set up jest mock functions and callbacks
  const setErrors = jest.fn(val => val);
  const setSubmitting = jest.fn(val => val);
  const resetForm = jest.fn(val => val);
  const bag = { setErrors, setSubmitting, resetForm };

  afterEach(() => {
    setErrors.mockClear();
    setSubmitting.mockClear();
    requests.post.mockClear();
  });

  /* test setErrors */
  it('should NOT call setErrors on successful post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.successful, data: {} })
    );

    expect(setErrors).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledTimes(0);
  });

  it('should call setErrors on unsuccessful post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unsuccessful, data: {} })
    );

    expect(setErrors).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledTimes(1);
  });

  it('should call setErrors on unexpected post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unexpected, data: {} })
    );

    expect(setErrors).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledTimes(1);
  });

  it('should set the correct errors on unsuccessful post', async () => {
    const mockError = { test: 'test' };

    const response = {
      status: constants.status.unsuccessful,
      data: mockError
    };
    requests.post = jest.fn(() => Promise.resolve(response));

    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledWith(mockError);
  });

  it('should set the correct errors on unexpected post', async () => {
    const mockError = { test: 'test' };

    const response = {
      status: constants.status.unexpected,
      data: mockError
    };
    requests.post = jest.fn(() => Promise.resolve(response));

    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledWith(FORM_CONST.default_errors.errors);
  });
  /* end test setErrors */

  /* test setSubmitting */
  it('should NOT call setSubmitting on successful post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.successful, data: {} })
    );

    expect(setSubmitting).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledTimes(0);
  });

  it('should call setSubmitting on unsuccessful post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unsuccessful, data: {} })
    );

    expect(setSubmitting).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledTimes(1);
  });

  it('should call setSubmitting on unexpected post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unexpected, data: {} })
    );

    expect(setSubmitting).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledTimes(1);
  });

  it('it should set setSubmitting to false on unsuccessful post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({
        status: constants.status.unsuccessful
      })
    );

    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });

  it('it should set setSubmitting to false on unexpected post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({
        status: constants.status.unexpected
      })
    );

    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });
  /* end test setSubmitting */

  /* test post */
  it('should call post once', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.successful })
    );

    await handleSubmit(constants, {}, bag);
    expect(requests.post.mock.calls.length).toBe(1);
  });

  it('should pass on the correct values to post', async () => {
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.successful, data: {} })
    );

    const values = { test: 'test' };

    await handleSubmit(constants, values, bag);
    expect(requests.post).toHaveBeenCalledWith(
      constants.request_url,
      values,
      {}
    );
  });
  /* end test post */

  /* test return */
  it('should return the response if successful', async () => {
    const expectedResponse = {
      status: constants.status.successful
    };

    requests.post = jest.fn(() => Promise.resolve(expectedResponse));

    const actualResponse = await handleSubmit(constants, {}, bag);
    expect(actualResponse).toBe(expectedResponse);
  });

  it('should return the response if unsuccessful', async () => {
    const expectedResponse = {
      status: constants.status.unsuccessful
    };

    requests.post = jest.fn(() => Promise.resolve(expectedResponse));

    const actualResponse = await handleSubmit(constants, {}, bag);
    expect(actualResponse).toBe(expectedResponse);
  });

  it('should return the response if unexpected', async () => {
    const expectedResponse = {
      status: constants.status.unexpected
    };

    requests.post = jest.fn(() => Promise.resolve(expectedResponse));

    const actualResponse = await handleSubmit(constants, {}, bag);
    expect(actualResponse).toBe(expectedResponse);
  });
  /* end test post */
});

describe('logout()', () => {
  beforeEach(() => {
    requests.post = jest.fn(() => Promise.resolve());
    history.push = jest.fn();
  });

  afterEach(() => {
    requests.post.mockClear();
    history.push.mockClear();
  });

  /* test post */
  it('should call post once', async () => {
    await logout();
    expect(requests.post.mock.calls.length).toBe(1);
  });

  it('should pass on the correct values to post', async () => {
    await logout();
    expect(requests.post).toHaveBeenCalledWith('/auth/logout/', {
      revoke_token: true
    });
  });
  /* end test post */

  /* test history.push() */
  it('should push to history after successful', async () => {
    await logout();
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('should push to the correct url', async () => {
    requests.post = jest.fn(() => Promise.resolve());
    history.push = jest.fn();

    await logout();
    expect(history.push).toHaveBeenCalledWith(FORM_CONST.logout.redirect_url);
  });

  it('should push to history on error', async () => {
    requests.post = jest.fn(() => Promise.reject());
    await logout();
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('should push to the correct url on error', async () => {
    requests.post = jest.fn(() => Promise.reject());
    history.push = jest.fn();

    await logout();
    expect(history.push).toHaveBeenCalledWith(FORM_CONST.logout.redirect_url);
  });
  /* end test history.push() */
});

describe('checkAuthenticated()', () => {
  afterEach(() => {
    requests.get.mockClear();
  });

  /* test get() */
  it('should call get() once', async () => {
    requests.get = jest.fn(() =>
      Promise.resolve({
        status: FORM_CONST.checkAuthenticated.status.successful
      })
    );

    await checkAuthenticated();
    expect(requests.get).toHaveBeenCalledTimes(1);
  });
  /* end test get() */

  /* test return */
  it('should return true on successful response', async () => {
    const expected = true;

    requests.get = jest.fn(() =>
      Promise.resolve({
        status: FORM_CONST.checkAuthenticated.status.successful
      })
    );

    const actual = await checkAuthenticated();
    expect(actual).toBe(expected);
  });

  it('should return false on unsuccessful response', async () => {
    const expected = false;

    requests.get = jest.fn(() =>
      Promise.resolve({
        status: FORM_CONST.checkAuthenticated.status.unsuccessful
      })
    );

    const actual = await checkAuthenticated();
    expect(actual).toBe(expected);
  });

  it('should return false on unexpected response', async () => {
    const expected = false;

    requests.get = jest.fn(() =>
      Promise.resolve({
        status: FORM_CONST.checkAuthenticated.status.unexpected
      })
    );

    const actual = await checkAuthenticated();
    expect(actual).toBe(expected);
  });

  it('should return false on error', async () => {
    const expected = false;

    requests.get = jest.fn(() => Promise.reject());

    const actual = await checkAuthenticated();
    expect(actual).toBe(expected);
  });
  /* end test return */
});
