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
export const parseAlphaNumeric = url => {
  return url.replace(/\/$/, '').match(/\w*$/)[0];
};

/**
 * Reads ISO 8601 timestamp and returns human readable time in format:
 * DAY_OF_WEEK MONTH DAY YEAR - HH:MM [AM/PM]
 * e.g.: Sun Aug 25 2019 - 12:23 PM
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

  let suffix = 'AM';
  if (hours >= 12) {
    suffix = 'PM';
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  return time.toDateString() + ' - ' + hours + ':' + minutes + ' ' + suffix;
};
