export default {
  // mock a post request with axios
  post: jest.fn((url, data) => Promise.resolve({ url, data })),
  put: jest.fn((url, data) => Promise.resolve({ url, data })),
  defaults: {
    xsrfCookieName: 'csrftocken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    headers: {
      common: {
        'x-api-key': 'e8f411d2de5d42c485df61bc8a8ff977'
      }
    }
  }
};
