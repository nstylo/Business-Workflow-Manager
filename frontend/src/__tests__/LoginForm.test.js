import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoginForm from '../components/auth/forms/LoginForm';
import { handleLogin } from '../components/auth/forms/handle_submit';
import { login } from '../components/auth/forms/auth_api';
import auth_const from '../components/auth/forms/auth_const';

jest.mock('../components/auth/forms/auth_api');

Enzyme.configure({ adapter: new Adapter() });

// define mock functions and props
const setErrors = jest.fn(val => val);
const setSubmitting = jest.fn(val => val);
const props = { history: { push: jest.fn(val => val) } };
const values = { email: 'test_mail@test.de', password: 'testpassword' };

// should be called to simulate a successful login
const setValidLogin = () =>
  login.mockImplementationOnce(() => {
    return Promise.resolve({ status: auth_const.login.status.successful });
  });

// should be called to simulate a successful login
const setUnexpectedResponse = () =>
  login.mockImplementationOnce(() => {
    return Promise.resolve({ status: 999 });
  });

let wrapper;
beforeEach(() => {
  wrapper = mount(<LoginForm.WrappedComponent />);
});

afterEach(() => {
  wrapper.unmount();
  // clear calls.length
  setErrors.mockClear();
  setSubmitting.mockClear();
  props.history.push.mockClear();
  login.mockClear();
});

describe('Loginform', () => {
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('.handleLogin()', () => {
    it('should call setErrors, setSubmitting on unsuccessful login', async () => {
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setErrors.mock.calls.length).toBe(1);
      expect(setSubmitting.mock.calls.length).toBe(1);
    });

    it('should call login once', async () => {
      expect(login.mock.calls.length).toBe(0);
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(login.mock.calls.length).toBe(1);
    });

    it('should not push to history on unsuccessful login', async () => {
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(props.history.push.mock.calls.length).toBe(0);
    });

    it('should not call setErrors and setSubmitting on success', async () => {
      setValidLogin();
      await handleLogin(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
    });

    it('should push to history on successful login', async () => {
      setValidLogin();
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(props.history.push.mock.calls.length).toBe(1);
    });

    it('should pass on the correct values to login', async () => {
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(login.mock.calls[0][0]).toBe(values.email);
      expect(login.mock.calls[0][1]).toBe(values.password);
    });

    it('should set the correct errors on unsuccessful login', async () => {
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setErrors.mock.calls[0][0]).toStrictEqual(auth_const.login.mock_errors.errors);
    });

    it('it should set setSubmitting to false on unsuccessful login', async () => {
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setSubmitting.mock.calls[0][0]).toBe(false);
    });

    it('should call setErrors and setSubmitting on unexpected response', async () => {
      setUnexpectedResponse();
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setErrors.mock.calls.length).toBe(1);
      expect(setSubmitting.mock.calls.length).toBe(1);
    });

    it('should not push to history on unexpected response', async () => {
      setUnexpectedResponse();
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(props.history.push.mock.calls.length).toBe(0);
    });

    it('should set the error message correctly on unexpected response', async () => {
      setUnexpectedResponse();
      await handleLogin(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setErrors.mock.calls[0][0]).toStrictEqual(auth_const.default_errors.errors);
    });
  });
});
