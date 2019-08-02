import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ResetForm from '../components/auth/forms/ResetForm';
import { handleReset } from '../components/auth/forms/handle_submit';
import { reset } from '../components/auth/forms/auth_api';
import auth_const from '../components/auth/forms/auth_const';

jest.mock('../components/auth/forms/auth_api');

Enzyme.configure({ adapter: new Adapter() });

// define mock functions and props
const setErrors = jest.fn(val => val);
const setSubmitting = jest.fn(val => val);
const props = { history: { push: jest.fn(val => val) } };
const values = { password: 'testpassword' };

// should be called to simulate a successful reset
const setValidRequestReset = () =>
  reset.mockImplementationOnce(() => {
    return Promise.resolve({
      status: auth_const.reset.status.successful
    });
  });

// should be called to simulate a successful reset
const setUnexpectedResponse = () =>
  reset.mockImplementationOnce(() => {
    return Promise.resolve({ status: 999 });
  });

let wrapper;
beforeEach(() => {
  wrapper = mount(<ResetForm.WrappedComponent />);
});

afterEach(() => {
  wrapper.unmount();
  // clear calls.length
  setErrors.mockClear();
  setSubmitting.mockClear();
  props.history.push.mockClear();
  reset.mockClear();
});

describe('Loginform', () => {
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('.handleReset()', () => {
    it('should call setErrors, setSubmitting on unsuccessful reset', async () => {
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls.length).toBe(1);
      expect(setSubmitting.mock.calls.length).toBe(1);
    });

    it('should call reset once', async () => {
      expect(reset.mock.calls.length).toBe(0);
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(reset.mock.calls.length).toBe(1);
    });

    it('should not push to history on unsuccessful reset', async () => {
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(props.history.push.mock.calls.length).toBe(0);
    });

    it('should not call setErrors and setSubmitting on success', async () => {
      setValidRequestReset();
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
    });

    it('should push to history on successful reset', async () => {
      setValidRequestReset();
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(props.history.push.mock.calls.length).toBe(1);
    });

    it('should pass on the correct values to reset', async () => {
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(reset.mock.calls[0][0]).toBe(values.password);
    });

    it('should set the correct errors on unsuccessful reset', async () => {
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls[0][0]).toStrictEqual(
        auth_const.reset.mock_errors.errors
      );
    });

    it('it should set setSubmitting to false on unsuccessful reset', async () => {
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setSubmitting.mock.calls[0][0]).toBe(false);
    });

    it('should call setErrors and setSubmitting on unexpected response', async () => {
      setUnexpectedResponse();
      expect(setErrors.mock.calls.length).toBe(0);
      expect(setSubmitting.mock.calls.length).toBe(0);
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls.length).toBe(1);
      expect(setSubmitting.mock.calls.length).toBe(1);
    });

    it('should not push to history on unexpected response', async () => {
      setUnexpectedResponse();
      expect(props.history.push.mock.calls.length).toBe(0);
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(props.history.push.mock.calls.length).toBe(0);
    });

    it('should set the error message correctly on unexpected response', async () => {
      setUnexpectedResponse();
      await handleReset(props, values, {
        setErrors: setErrors,
        setSubmitting: setSubmitting
      });
      expect(setErrors.mock.calls[0][0]).toStrictEqual(
        auth_const.default_errors.errors
      );
    });
  });
});
