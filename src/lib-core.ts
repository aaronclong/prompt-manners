// export interface Logger {
//   log(...args: unknown[]): void;
//   warn(...args: unknown[]): void;
//   error(...args: unknown[]): void;
// }

// export function defaultLogger(): Logger {
//   return {
//     log: console.log,
//     warn: console.warn,
//     error: console.error,
//   };
// }

export class Optional<T> {
  constructor(public readonly value: T | undefined | null) {}

  get isPresent(): boolean {
    return this.value !== undefined && this.value !== null;
  }

  static of<T>(value: T): Optional<T> {
    return new Optional<T>(value);
  }

  static empty<T>(): Optional<T> {
    return new Optional<T>(null);
  }
}
