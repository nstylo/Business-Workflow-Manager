import { localHosts } from '../utils/url_config';
const location = window.location; // keep backup of global object

beforeEach(() => {
  delete window.location; // delete global object in order to override
  jest.resetModules(); // reset imports
});

afterEach(() => {
  window.location = location; // reset global object
});

it('should set the correct url on hostname "backend.ml"', () => {
  window.location = { hostname: 'backend.ml' };

  const { API_URL } = require('../utils/url_config');

  expect(API_URL).toBe(`https://${window.location.hostname}/api`);
});

it('should set the correct url on hostname "backend.ga"', () => {
  window.location = { hostname: 'backend.ga' };

  const { API_URL } = require('../utils/url_config');

  expect(API_URL).toBe(`https://${window.location.hostname}/api`);
});

it('should set the correct url on any other deployment env', () => {
  window.location = { hostname: 'test.test' };

  const { API_URL } = require('../utils/url_config');

  expect(API_URL).toBe(`https://${window.location.hostname}/api`);
});

it('should prefer env var on local environments', () => {
  process.env.REACT_APP_BACKEND_URL = 'http://whatever:9999'; // override env var

  // test for all local hosts
  localHosts.forEach(hostname => {
    window.location = { hostname };

    const { API_URL } = require('../utils/url_config');

    expect(API_URL).toBe(`${process.env.REACT_APP_BACKEND_URL}/api`);
  });
});

it('should fall back to 127.0.0.1:8000 if local and no env var set', () => {
  delete process.env.REACT_APP_BACKEND_URL; // if env var not declared

  // test for all local hosts
  localHosts.forEach(hostname => {
    window.location = { hostname };

    const { API_URL } = require('../utils/url_config');

    expect(API_URL).toBe(`http://127.0.0.1:8000/api`);
  });
});
