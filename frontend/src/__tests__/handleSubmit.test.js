import handleSubmit from '../components/auth/forms/handle_submit';
import auth_const from '../components/auth/forms/auth_const';

const setErrors = jest.fn(val => val);
const setSubmitting = jest.fn(val => val);
const props = { history: { push: jest.fn(val => val) } };
const values = {
  email: 'test_mail@test.de',
  password: 'testpassword',
  phone: '+123456789',
  address: 'testaddress',
  company: 'testcompany'
};

const constants = {
  url: '/mock_url/',
  status: {
    successful: 200,
    unsuccessful: 400
  }
};

const default_error = { default: 'unsuccessful request' };

const callback_successful = jest.fn(values => {
  return Promise.resolve({
    status: constants.status.successful,
    data: {}
  });
});

const callback_unsuccessful = jest.fn(values => {
  return Promise.resolve({
    status: constants.status.unsuccessful,
    data: {
      errors: default_error
    }
  });
});

const callback_unexpected = jest.fn(values => {
  return Promise.resolve({
    status: 999
  });
});

afterEach(() => {
  // clear calls.length
  setErrors.mockClear();
  setSubmitting.mockClear();
  props.history.push.mockClear();
  callback_successful.mockClear();
  callback_unsuccessful.mockClear();
  callback_unexpected.mockClear();
});

describe('handleSubmit', () => {
  it('should NOT call setErrors on successful callback', async () => {
    expect(setErrors.mock.calls.length).toBe(0);
    await handleSubmit(callback_successful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setErrors.mock.calls.length).toBe(0);
  });

  it('should call setErrors on unsuccessful callback', async () => {
    expect(setErrors.mock.calls.length).toBe(0);
    await handleSubmit(callback_unsuccessful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setErrors.mock.calls.length).toBe(1);
  });

  it('should call setErrors on unexpected callback', async () => {
    expect(setErrors.mock.calls.length).toBe(0);
    await handleSubmit(callback_unexpected, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setErrors.mock.calls.length).toBe(1);
  });

  it('should NOT call setSubmitting on successful callback', async () => {
    expect(setSubmitting.mock.calls.length).toBe(0);
    await handleSubmit(callback_successful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setSubmitting.mock.calls.length).toBe(0);
  });

  it('should call setSubmitting on unsuccessful callback', async () => {
    expect(setSubmitting.mock.calls.length).toBe(0);
    await handleSubmit(callback_unsuccessful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setSubmitting.mock.calls.length).toBe(1);
  });

  it('should call setSubmitting on unexpected callback', async () => {
    expect(setSubmitting.mock.calls.length).toBe(0);
    await handleSubmit(callback_unexpected, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setSubmitting.mock.calls.length).toBe(1);
  });

  it('should NOT push to history on unsuccessful callback', async () => {
    expect(props.history.push.mock.calls.length).toBe(0);
    await handleSubmit(callback_unsuccessful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(props.history.push.mock.calls.length).toBe(0);
  });

  it('should push to history on successful callback', async () => {
    expect(props.history.push.mock.calls.length).toBe(0);
    await handleSubmit(callback_successful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(props.history.push.mock.calls.length).toBe(1);
  });

  it('should NOT push to history on unexpected callback', async () => {
    expect(props.history.push.mock.calls.length).toBe(0);
    await handleSubmit(callback_unexpected, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(props.history.push.mock.calls.length).toBe(0);
  });

  it('should pass on the correct values to callback', async () => {
    await handleSubmit(callback_successful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(callback_successful.mock.calls[0][0]).toBe(values);
  });

  it('should set the correct errors on unsuccessful callback', async () => {
    await handleSubmit(callback_unsuccessful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setErrors.mock.calls[0][0]).toStrictEqual(default_error);
  });

  it('it should set setSubmitting to false on unsuccessful login', async () => {
    await handleSubmit(callback_unsuccessful, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setSubmitting.mock.calls[0][0]).toBe(false);
  });

  it('should set the correct errors on unexpected callback', async () => {
    await handleSubmit(callback_unexpected, constants, props, values, {
      setErrors: setErrors,
      setSubmitting: setSubmitting
    });
    expect(setErrors.mock.calls[0][0]).toStrictEqual(
      auth_const.default_errors.errors
    );
  });
});
