import HttpResponseError from "./HttpResponseError";

export default class HttpInternalServerError extends HttpResponseError {   
    constructor(message) {
        super(message, 500);
    }
}