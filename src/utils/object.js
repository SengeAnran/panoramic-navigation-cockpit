import extend from 'extend';

export function merge(...args) {
  return extend(true, {}, ...args);
}
