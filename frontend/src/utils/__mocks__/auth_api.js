export const login = jest.fn((email, password) => {
  return Promise.resolve({ data: { status_code: 401, content: { errors: { email: 'email is not registered' } } } });
});

export const register = jest.fn((email, password, username, phone, address, company) => {
  return Promise.resolve({ data: { status_code: 400, content: { errors: { email: 'email is already taken' } } } });
});
