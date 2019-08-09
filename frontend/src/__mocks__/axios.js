export default {
  post: jest.fn(() => Promise.resolve({ data: {} })),
  defaults: {
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken',
    withCredentials: true
  }
};
