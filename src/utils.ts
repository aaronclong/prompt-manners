export type Nullish = null | undefined;

/**
 *
 * @param value
 * @returns
 */
export function isNullish(value: unknown): value is Nullish {
  return value === null || value === undefined;
}

/**
 * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 * @param value
 * @returns
 */
export function isFalsy<T>(value: T | boolean | null | undefined): boolean {
  return isNullish(value) || value === false;
}
