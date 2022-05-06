export const handleHttpError = (err, req, res, next) => {
    const code = err.statusCode || 500;

    res
        .status(code)
        .json({ 
            status: code,
            message: err.message,
            error: err.stack
        });
}

export const logError = (err, req, res, next) => {
    console.error(err.message, "-", err.stack);
    next(err);
}