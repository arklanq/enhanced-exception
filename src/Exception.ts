export class Exception extends Error {
  public readonly previous?: unknown;

  constructor(message?: string, cause?: unknown) {
    super(message);

    Object.defineProperty(this, 'previous', {value: cause});
    Object.defineProperty(this, 'name', {value: this.constructor.name});

    this.enhanceStackTrace(this.constructor, cause);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected enhanceStackTrace(constructor: Function, cause: unknown) {
    if (Object.hasOwnProperty.call(Error, 'captureStackTrace')) Error.captureStackTrace(this, constructor);

    if (cause != undefined) {
      if (cause instanceof Error && cause.stack !== undefined) this.stack += `\nCaused by: ${cause.stack}`;
      else this.stack += `\nCaused by: ${String(cause)}`;
    }
  }
}
