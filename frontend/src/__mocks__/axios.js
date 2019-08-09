export default {
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  defaults: {
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken',
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000'
  }
};
