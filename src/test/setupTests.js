/* global globalThis */

const { TextDecoder, TextEncoder } = require('util');

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;

if (!globalThis.Request) {
  globalThis.Request = class Request {
    constructor(input, init = {}) {
      this.url = String(input);
      this.method = init.method || 'GET';
      this.headers = init.headers || {};
      this.signal = init.signal;
    }
  };
}

if (globalThis.window) {
  Object.defineProperty(globalThis.window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query.includes('min-width'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

afterEach(() => {
  jest.restoreAllMocks();
});
