/**
 * Lil utility for custom errors.
 * Usage: throw new DXError("A custom error");
 * console.log(JSON.stringify(new DXError("A custom error")));
 */
export class DXError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DXError';
        this.message = message;
    }

    toJSON() {
        return {
            error: {
                name: this.name,
                message: this.message,
                stacktrace: this.stack,
            },
        };
    }
}
