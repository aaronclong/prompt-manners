/**
 *
 * @param value
 * @returns
 */
export function isNullish(value: unknown): boolean {
  return value === null || value === undefined;
}

/**
 * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 * @param value
 * @returns
 */
export function isFalsy<T>(value: T | boolean | null | undefined): boolean {
  if (isNullish(value)) {
    return true;
  }

  return value === false;
}
