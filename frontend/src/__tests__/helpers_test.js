import { parseFileName, parsePathName, parseDateTime } from '../utils/helpers';

const urlsParseFileName = [
  { path: 'path/file.ext', expected: 'file.ext' },
  { path: 'path/file.ext/', expected: 'file.ext' },
  { path: 'path/file.ext9/', expected: 'file.ext9' },
  { path: 'path/file.ext//', expected: '' },
  { path: 'path/99.ext/', expected: '99.ext' },
  { path: 'path/_.ext/', expected: '_.ext' },
  { path: 'path//', expected: '' },
  { path: 'path/', expected: 'path' },
  { path: 'path', expected: 'path' },
  { path: 'path/abc/', expected: 'abc' },
  { path: 'path/abc.def.ghj/', expected: 'abc.def.ghj' }
];

const urlsParsePathName = [
  { path: 'base/path/', expected: 'path' },
  { path: 'path/file.ext', expected: 'ext' },
  { path: 'path/file.ext9/', expected: 'ext9' },
  { path: 'path/file.ext//', expected: '' },
  { path: 'base/_path/', expected: '_path' },
  { path: 'base/p_ath/', expected: 'p_ath' },
  { path: 'base/p-ath/', expected: 'p-ath' },
  { path: 'base/-path/', expected: '-path' },
  { path: 'base/path-99/', expected: 'path-99' },
  { path: 'path//', expected: '' },
  { path: 'path/', expected: 'path' },
  { path: 'path', expected: 'path' },
  { path: 'path/abc/', expected: 'abc' }
];

// TODO: rework times and test for more input
// TODO: mock system datetime
//
// const dateTimes = [
//   {
//     timestamp: '2019-09-02T07:27:18+02:00',
//     expected: 'Mon Sep 02 2019 - 07:27'
//   },
//   {
//     timestamp: '2019-09-02T00:27:18+02:00',
//     expected: 'Mon Sep 02 2019 - 00:27'
//   },
//   {
//     timestamp: '2019-09-02T16:07:18+02:00',
//     expected: 'Mon Sep 02 2019 - 16:07'
//   }
// ];

describe('parseFileName()', () => {
  for (const url of urlsParseFileName) {
    it(`should read ${url.path} and return ${url.expected}`, () => {
      expect(parseFileName(url.path)).toBe(url.expected);
    });
  }
});

describe('parsePathName()', () => {
  for (const url of urlsParsePathName) {
    it(`should read ${url.path} and return ${url.expected}`, () => {
      expect(parsePathName(url.path)).toBe(url.expected);
    });
  }
});

// describe('parseDateTime()', () => {
//   for (const dateTime of dateTimes) {
//     it(`should read ${dateTime.timestamp} and return ${dateTime.expected}`, () => {
//       expect(parseDateTime(dateTime.timestamp)).toBe(dateTime.expected);
//     });
//   }
// });
