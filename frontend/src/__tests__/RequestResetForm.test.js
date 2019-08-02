import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RequestResetForm from '../components/auth/forms/RequestResetForm';
import { handleRequestReset } from '../components/auth/forms/handle_submit';
import { requestReset } from '../components/auth/forms/auth_api';
import auth_const from '../components/auth/forms/auth_const';

jest.mock('../components/auth/forms/auth_api');

Enzyme.configure({ adapter: new Adapter() });

// define mock functions and props
const setErrors = jest.fn(val => val);
const setSubmitting = jest.fn(val => val);
const props = { history: { push: jest.fn(val => val) } };
const values = { email: 'test_mail@test.de' };

// should be called to simulate a successful requestReset
const setValidRequestReset = () =>
  requestReset.mockImplementationOnce(() => {
    return Promise.resolve({
      status: auth_const.requestReset.status.successful
    });
  });

// should be called to simulate a successful requestReset
const setUnexpectedResponse = () =>
  requestReset.mockImplementationOnce(() => {
    return Promise.resolve({ status: 999 });
  });

let wrapper;
beforeEach(() => {
  wrapper = mount(<RequestResetForm.WrappedComponent />);
});

afterEach(() => {
  wrapper.unmount();
  // clear calls.length
  setErrors.mockClear();
  setSubmitting.mockClear();
  props.history.push.mockClear();
  requestReset.mockClear();
});

describe('Loginform', () => {
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('.handleRequestReset()', () => {
    it('should call setErrors, setSubmitting on unsuccessful requestReset', async () => {
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls.length).toBe(1);
      expect(setSubmitting.mock.calls.length).toBe(1);
    });

    it('should call requestReset once', async () => {
      expect(requestReset.mock.calls.length).toBe(0);
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(requestReset.mock.calls.length).toBe(1);
    });

    it('should not push to history on unsuccessful requestReset', async () => {
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(props.history.push.mock.calls.length).toBe(0);
    });

    it('should not call setErrors and setSubmitting on success', async () => {
      setValidRequestReset();
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
    });

    it('should push to history on successful requestReset', async () => {
      setValidRequestReset();
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(props.history.push.mock.calls.length).toBe(1);
    });

    it('should pass on the correct values to requestReset', async () => {
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(requestReset.mock.calls[0][0]).toBe(values.email);
    });

    it('should set the correct errors on unsuccessful requestReset', async () => {
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls[0][0]).toStrictEqual(
        auth_const.requestReset.mock_errors.errors
      );
    });

    it('it should set setSubmitting to false on unsuccessful requestReset', async () => {
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setSubmitting.mock.calls[0][0]).toBe(false);
    });

    it('should call setErrors and setSubmitting on unexpected response', async () => {
      setUnexpectedResponse();
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls.length).toBe(1);
      expect(setSubmitting.mock.calls.length).toBe(1);
    });

    it('should not push to history on unexpected response', async () => {
      setUnexpectedResponse();
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(props.history.push.mock.calls.length).toBe(0);
    });

    it('should set the error message correctly on unexpected response', async () => {
      setUnexpectedResponse();
      await handleRequestReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls[0][0]).toStrictEqual(
        auth_const.default_errors.errors
      );
    });
  });
});
