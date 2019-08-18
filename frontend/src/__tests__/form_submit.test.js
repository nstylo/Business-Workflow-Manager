import { handleSubmit } from '../utils/form_submit';
import history from '../history';

const requests = require('../utils/requests');
jest.unmock('../utils/requests');

jest.spyOn(history, 'push');

// set up jest mock functions and callbacks
const setErrors = jest.fn(val => val);
const setSubmitting = jest.fn(val => val);
const resetForm = jest.fn(val => val);
const bag = { setErrors, setSubmitting, resetForm };

// mock constants for requests, e.g. routing url..
const constants = {
  request_url: '/request_url/',
  redirect_url: '/redirect_url/',
  status: {
    successful: 200,
    unsuccessful: 400,
    unexpected: 500
  }
};

afterEach(() => {
  setErrors.mockClear();
  setSubmitting.mockClear();
  history.push.mockClear();
});

describe('handleSubmit', () => {
  it('should NOT call setErrors on successful post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.successful, data: {} })
    );

    expect(setErrors).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledTimes(0);
  });

  it('should call setErrors on unsuccessful post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unsuccessful, data: {} })
    );

    expect(setErrors).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledTimes(1);
  });

  it('should call setErrors on unexpected post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unexpected, data: {} })
    );

    expect(setErrors).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledTimes(1);
  });

  it('should NOT call setSubmitting on successful post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.successful, data: {} })
    );

    expect(setSubmitting).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledTimes(0);
  });

  it('should call setSubmitting on unsuccessful post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unsuccessful, data: {} })
    );

    expect(setSubmitting).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledTimes(1);
  });

  it('should call setSubmitting on unexpected post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unexpected, data: {} })
    );

    expect(setSubmitting).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledTimes(1);
  });

  it('should push to history on successful post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.successful, data: {} })
    );

    expect(history.push).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('should NOT push to history on unexpected post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.unsuccessful, data: {} })
    );

    expect(history.push).toHaveBeenCalledTimes(0);
    await handleSubmit(constants, {}, bag);
    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('should pass on the correct values to post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({ status: constants.status.successful, data: {} })
    );

    const values = { test: 'test' };

    await handleSubmit(constants, values, bag);
    expect(requests.post).toHaveBeenCalledWith(constants.request_url, values);
  });

  it('should set the correct errors on unsuccessful post', async () => {
    const mockError = { test: 'test' };

    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({
        status: constants.status.unsuccessful,
        data: mockError
      })
    );

    await handleSubmit(constants, {}, bag);
    expect(setErrors).toHaveBeenCalledWith(mockError);
  });

  it('should set the correct errors on unexpected post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({
        status: constants.status.unexpected
      })
    );

    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });

  it('it should set setSubmitting to false on unsuccessful post', async () => {
    // mock post
    requests.post = jest.fn(() =>
      Promise.resolve({
        status: constants.status.unsuccessful
      })
    );

    await handleSubmit(constants, {}, bag);
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });
});
