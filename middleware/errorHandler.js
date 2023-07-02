/**
 * Application level middleware for handling errors.
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error(err);

    // Format the error response
    const errorResponse = {
        message: 'Internal Server Error', // Default error message
    };

    // Determine the status code based on the error type
    if (err instanceof SyntaxError) {
        errorResponse.message = 'Invalid JSON';
        res.status(400);
    } else if (err instanceof CustomError) {
        errorResponse.message = err.message;
        res.status(err.statusCode);
    } else {
        // Handle other types of errors
        res.status(500);
    }

    // Send the error response
    res.json(errorResponse);
};

module.exports = errorHandler;
