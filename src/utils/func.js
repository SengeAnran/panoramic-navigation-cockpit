export function hiddenName(val) {
  if (!val) {
    return;
  }
  const str = String(val);
  const s = str.charAt(0);
  const e = str.charAt(str.length - 1);
  if (str.length <= 2) {
    return s + '*';
  } else {
    return s + '*' + e;
  }
}
