export declare class Exception extends Error {
    readonly previous?: unknown;
    constructor(message?: string, cause?: unknown);
    protected enhanceStackTrace(constructor: Function, cause: unknown): void;
}
//# sourceMappingURL=Exception.d.ts.map