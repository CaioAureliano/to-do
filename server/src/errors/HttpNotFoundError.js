import HttpResponseError from "./HttpResponseError";

export default class HttpNotFoundError extends HttpResponseError {
    constructor(message) {
        super(message, 404);
    }
}