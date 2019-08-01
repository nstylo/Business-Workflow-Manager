import React from 'react';
import RegistrationForm, { handleRegister } from '../components/auth/RegistrationForm';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { register } from '../utils/auth_api';
jest.mock('../utils/auth_api');

Enzyme.configure({ adapter: new Adapter() });

// define mock functions and props
const setErrors = jest.fn(val => val);
const setSubmitting = jest.fn(val => val);
const props = { history: { push: jest.fn(val => val) } };
const values = {
  email: 'test_mail@test.de',
  username: 'testuser',
  password: 'testpassword',
  phone: '+123456789',
  address: 'testaddress',
  company: 'testcompany'
};

// should be called to simulate a successful register
const setValidRegistration = () =>
  register.mockImplementationOnce(() => {
    return { data: { status_code: 201 } };
  });

// should be called to simulate a successful login
const setUnexpectedResponse = () =>
  register.mockImplementationOnce(() => {
    return { data: { status_code: 999 } };
  });

let wrapper;
beforeEach(() => {
  wrapper = mount(<RegistrationForm.WrappedComponent />);
});

afterEach(() => {
  wrapper.unmount();
  // clear calls.length
  setErrors.mockClear();
  setSubmitting.mockClear();
  props.history.push.mockClear();
  register.mockClear();
});

describe('RegistrationForm', () => {
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('.handleRegister()', () => {
    it('should call setErrors, setSubmitting on unsuccessful register', async () => {
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setErrors.mock.calls.length).toBe(1);
      expect(setSubmitting.mock.calls.length).toBe(1);
    });

    it('should call register once on unsuccessful register', async () => {
      expect(register.mock.calls.length).toBe(0);
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(register.mock.calls.length).toBe(1);
    });

    it('should not push to history on unsuccessful register', async () => {
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(props.history.push.mock.calls.length).toBe(0);
    });

    it('should call register on 200', async () => {
      setValidRegistration();
      expect(register.mock.calls.length).toBe(0);
      await handleRegister(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(register.mock.calls.length).toBe(1);
    });

    it('should not call setErrors and setSubmitting on 200', async () => {
      setValidRegistration();
      await handleRegister(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
    });

    it('should push to history on successful register', async () => {
      setValidRegistration();
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(props.history.push.mock.calls.length).toBe(1);
    });

    it('should pass on the correct values to register', async () => {
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(register.mock.calls[0][0]).toBe(values.email);
      expect(register.mock.calls[0][1]).toBe(values.username);
      expect(register.mock.calls[0][2]).toBe(values.password);
      expect(register.mock.calls[0][3]).toBe(values.phone);
      expect(register.mock.calls[0][4]).toBe(values.address);
      expect(register.mock.calls[0][5]).toBe(values.company);
    });

    it('should set the correct errors on unsuccessful register', async () => {
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setErrors.mock.calls[0][0]).toStrictEqual({ email: 'email is already taken' });
    });

    it('it should set setSubmitting to false on unsuccessful register', async () => {
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setSubmitting.mock.calls[0][0]).toBe(false);
    });

    it('should call setErrors and setSubmitting on unexpected response', async () => {
      setUnexpectedResponse();
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setErrors.mock.calls.length).toBe(1);
      expect(setSubmitting.mock.calls.length).toBe(1);
    });

    it('should not push to history on unexpected response', async () => {
      setUnexpectedResponse();
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(props.history.push.mock.calls.length).toBe(0);
    });

    it('should set the error message correctly on unexpected response', async () => {
      setUnexpectedResponse();
      await handleRegister(props, values, { setErrors: setErrors, setSubmitting: setSubmitting });
      expect(setErrors.mock.calls[0][0]).toStrictEqual({ default: 'something unexpected happened' });
    });
  });
});
