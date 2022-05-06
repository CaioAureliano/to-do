import HttpResponseError from "./HttpResponseError";

export default class HttpBadRequestError extends HttpResponseError {
    constructor(message) {
        super(message, 400);
    }
}