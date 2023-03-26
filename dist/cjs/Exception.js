'use strict';

class Exception extends Error {
    constructor(message, cause) {
        super(message);
        Object.defineProperty(this, 'previous', { value: cause });
        Object.defineProperty(this, 'name', { value: this.constructor.name });
        this.enhanceStackTrace(this.constructor, cause);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    enhanceStackTrace(constructor, cause) {
        if (Object.hasOwnProperty.call(Error, 'captureStackTrace'))
            Error.captureStackTrace(this, constructor);
        if (cause != undefined) {
            if (cause instanceof Error && cause.stack !== undefined)
                this.stack += `\nCaused by: ${cause.stack}`;
            else
                this.stack += `\nCaused by: ${String(cause)}`;
        }
    }
}

exports.Exception = Exception;
//# sourceMappingURL=Exception.js.map
