/* istanbul ignore file */

export function removeNonDigits(value: string) {
  return value.replace(/\D/g, '');
}
