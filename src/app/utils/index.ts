export function toCamelCase(value: any) {
  if (value instanceof Array) {
    return toCamelCaseArray(value);
  } else if (value instanceof Object) {
    return toCamelCaseObject(value);
  } else {
    return value;
  }
}

export function toCamelCaseArray(value: Array<any>): Array<any> {
  return value.map(toCamelCase);
}

export function toCamelCaseObject(data: any): any {
  const result: any = {};

  for (const [key, value] of Object.entries(data)) {
    result[stringToCamelCase(key)] = toCamelCase(value);
  }

  return result;
}

export function stringToCamelCase(value: string): string  {
  let result;

  result = value.split('_');
  result = result[0] + result.slice(1).map((word: string) => word[0].toUpperCase() + word.slice(1)).join('');

  return result;
}

export function debounce(func, time) {
  let timeout;

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, time);
  }
}

export function getQueryStringValue (key) {
  const uri = window.location.search;

  return decodeURIComponent(uri.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

export function getQueryStringHashValue (key) {
  const toUri = '?' + window.location.hash.slice(1);
  return getQueryStringValue(toUri);
}