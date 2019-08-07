export default {
  // mock a post request with axios
  post: jest.fn((url, data) => Promise.resolve({ url, data })),
  put: jest.fn((url, data) => Promise.resolve({ url, data })),
  defaults: {
    xsrfCookieName: 'csrftocken',
    xsrfHeaderName: 'X-CSRFTOKEN'
  }
};
