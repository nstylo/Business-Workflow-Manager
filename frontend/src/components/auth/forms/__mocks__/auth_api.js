import auth_const from '../auth_const';

export const login = jest.fn((email, password) => {
  return Promise.resolve({
    status: auth_const.login.status.unsuccessful,
    data: auth_const.login.mock_errors
  });
});

export const register = jest.fn((email, password, username, phone, address, company) => {
  return Promise.resolve({
    status: auth_const.register.status.unsuccessful,
    data: auth_const.register.mock_errors
  });
});
