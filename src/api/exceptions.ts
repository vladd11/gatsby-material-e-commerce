export class HTTPError extends Error {
    public code: number;

    constructor(code: number) {
        super(`${code}`);

        this.code = code;
    }
}
