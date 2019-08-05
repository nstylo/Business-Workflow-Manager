import {
  login,
  register,
  requestReset,
  reset
} from '../components/utils/auth_api';
import axios from 'axios';
// axios mock is defined in __mocks__ in src/ and is automatically handled by jest

// sets of mock values
const values = {
  email: 'test_mail@test.de',
  password: 'testpassword',
  phone: '+123456789',
  address: 'testaddress',
  country: 'testcountry',
  company: 'testcompany'
};

const values_empty_string = {
  email: '',
  password: '',
  phone: '',
  address: '',
  country: '',
  company: ''
};

const values_null = {
  email: null,
  password: null,
  phone: null,
  address: null,
  country: null,
  company: null
};

const values_undefined = {
  email: undefined,
  password: undefined,
  phone: undefined,
  address: undefined,
  country: undefined,
  company: undefined
};

// clear mock.length
afterEach(() => {
  axios.post.mockClear();
});

describe('login()', () => {
  it('should call axios post once', async () => {
    await login(values);
    expect(axios.post.mock.calls.length).toBe(1);
  });

  it('should read and return empty strings', async () => {
    await login(values_empty_string).then(response => {
      expect(response.data.login).toBe('');
      expect(response.data.password).toBe('');
    });
  });

  it('should read some string and return it', async () => {
    await login(values).then(response => {
      expect(response.data.login).toBe(values.email);
      expect(response.data.password).toBe(values.password);
    });
  });

  it('should read null and return empty strings', async () => {
    await login(values_null).then(response => {
      expect(response.data.login).toBe('');
      expect(response.data.password).toBe('');
    });
  });

  it('should read undefined and return empty strings', async () => {
    await login(values_undefined).then(response => {
      expect(response.data.login).toBe('');
      expect(response.data.password).toBe('');
    });
  });

  // it('should respond with a fail', async () => {
  //   axios.post.mockImplementationOnce(() => {
  //     return Promise.reject(new Error('fail'));
  //   });
  //   await login(values_undefined).then(response => {
  //     expect(response).toBe('fail');
  //   });
  // });
});

describe('register()', () => {
  it('should call axios post once', async () => {
    await register(values);
    expect(axios.post.mock.calls.length).toBe(1);
  });

  it('should read and return empty strings', async () => {
    await register(values_empty_string).then(response => {
      expect(response.data.email).toBe('');
      expect(response.data.password).toBe('');
      expect(response.data.phone).toBe('');
      expect(response.data.address).toBe('');
      expect(response.data.country).toBe('');
      expect(response.data.company).toBe('');
    });
  });

  it('should read some string and return it', async () => {
    await register(values).then(response => {
      expect(response.data.email).toBe(values.email);
      expect(response.data.password).toBe(values.password);
      expect(response.data.phone).toBe(values.phone);
      expect(response.data.address).toBe(values.address);
      expect(response.data.country).toBe(values.country);
      expect(response.data.company).toBe(values.company);
    });
  });

  it('should read null and return empty strings', async () => {
    await register(values_null).then(response => {
      expect(response.data.email).toBe('');
      expect(response.data.password).toBe('');
      expect(response.data.phone).toBe('');
      expect(response.data.address).toBe('');
      expect(response.data.country).toBe('');
      expect(response.data.company).toBe('');
    });
  });

  it('should read undefined and return empty strings', async () => {
    await register(values_undefined).then(response => {
      expect(response.data.email).toBe('');
      expect(response.data.password).toBe('');
      expect(response.data.phone).toBe('');
      expect(response.data.address).toBe('');
      expect(response.data.country).toBe('');
      expect(response.data.company).toBe('');
    });
  });

  // it('should respond with a fail', async () => {
  //   axios.post.mockImplementationOnce(() => {
  //     return Promise.reject(new Error('fail'));
  //   });
  //   await register(values_undefined).then(response => {
  //     expect(response).toBe('fail');
  //   });
  // });
});

describe('requestReset()', () => {
  it('should call axios post once', async () => {
    await requestReset(values);
    expect(axios.post.mock.calls.length).toBe(1);
  });

  it('should read and return empty strings', async () => {
    await requestReset(values_empty_string).then(response => {
      expect(response.data.email).toBe('');
    });
  });

  it('should read some string and return it', async () => {
    await requestReset(values).then(response => {
      expect(response.data.email).toBe(values.email);
    });
  });

  it('should read null and return empty strings', async () => {
    await requestReset(values_null).then(response => {
      expect(response.data.email).toBe('');
    });
  });

  it('should read undefined and return empty strings', async () => {
    await requestReset(values_undefined).then(response => {
      expect(response.data.email).toBe('');
    });
  });

  // it('should respond with a fail', async () => {
  //   axios.post.mockImplementationOnce(() => {
  //     return Promise.reject(new Error('fail'));
  //   });
  //   await requestReset(values_undefined).then(response => {
  //     expect(response).toBe('fail');
  //   });
  // });
});

describe('reset()', () => {
  it('should call axios post once', async () => {
    await reset(values);
    expect(axios.put.mock.calls.length).toBe(1);
  });

  it('should read and return empty strings', async () => {
    await reset(values_empty_string).then(response => {
      expect(response.data.password).toBe('');
    });
  });

  it('should read some string and return it', async () => {
    await reset(values).then(response => {
      expect(response.data.password).toBe(values.password);
    });
  });

  it('should read null and return empty strings', async () => {
    await reset(values_null).then(response => {
      expect(response.data.password).toBe('');
    });
  });

  it('should read undefined and return empty strings', async () => {
    await reset(values_undefined).then(response => {
      expect(response.data.password).toBe('');
    });
  });

  // it('should respond with a fail', async () => {
  //   axios.put.mockImplementationOnce(() => {
  //     return Promise.reject(new Error('fail'));
  //   });
  //   await reset(values_undefined).then(response => {
  //     expect(response).toBe('fail');
  //   });
  // });
});
