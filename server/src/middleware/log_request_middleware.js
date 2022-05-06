export const logHttpRequest = (req, res, next) => {
    const reqQuery = getValueIfExistsProperties(req.query);
    const reqBody = getValueIfExistsProperties(req.body);

    const msgToPrint = `${Date.now()}: http ${req.method} method request to ${req.path} - headers: ${JSON.stringify(req.headers)} ${reqQuery ? "- query: " + JSON.stringify(reqQuery) : ""} ${reqBody ? "- body: " + JSON.stringify(reqBody) : ""}`;
    
    console.log(msgToPrint);

    next();
}

const getValueIfExistsProperties = (reqProperty) => {
    return (Object.keys(reqProperty).length) > 0 ? reqProperty : null;
}