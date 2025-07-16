
export class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, new.target.prototype);
    }

    static BadRequest(msg: string) {
        return new ApiError(400, msg)
    }

    static Forbidden(msg: string) {
        return new ApiError(403, msg)
    }

    static NotFound(msg: string) {
        return new ApiError(404, msg)
    }
}