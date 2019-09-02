/**
 * reads url and returns the filename incl. extension, given the filename
 * is located after last slash (if slash is last symbol, it gets ignored)
 *
 * example: 'https://host/path/to/file.txt' -> 'file.txt'
 * example: 'https://host/path/to/file.txt/' -> 'file.txt'
 *
 * @param {string} url to parse url
 */
export const parseFileName = url => {
  return url.replace(/\/$/, '').match(/[\w\-. ]*$/)[0];
};

/**
 * reads url and returns any alphanumeric value [A-Za-z0-9_] after last slash
 * ( if slash is last symbol, it gets ignored )
 *
 * example: 'https://host/path/to/43/' -> '43'
 * example: 'https://host/path/to/abc123def/' -> 'abc123def'
 * example: 'https://host/path/to/file.txt' -> 'txt'
 * example: 'https://host/path/to/file.txt/' -> 'txt'
 *
 * @param {string} url to parse url
 */
export const parsePathName = url => {
  return url.replace(/\/$/, '').match(/[\w_-]*$/)[0];
};

/* istanbul ignore next */

/**
 * TODO: rework representation
 *
 * Reads ISO 8601 timestamp and returns human readable time in format:
 * DAY_OF_WEEK MONTH DAY YEAR - HH:MM [AM/PM]
 * e.g.: Sun Aug 25 2019 - 00:23
 * e.g.: Sun Aug 25 2019 - 16:23
 *
 * @param {string} dateTime ISO 8601 timestamp
 */
export const parseDateTime = dateTime => {
  let time = new Date(dateTime);
  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (hours < 10) {
    hours = '0' + hours;
  }

  return time.toDateString() + ' - ' + hours + ':' + minutes;
};
