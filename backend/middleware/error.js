// const ErrorHandler = require ("../utils/ErrorHandler")

// module.exports = (err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || 'Internal Server Error';

//     // Log the error stack (without any color)
//     console.error(err.stack);

//     // Handle specific error types and set custom messages
//     if (err.name === 'CastError') {
//         const message = `Resource not found. Invalid: ${err.path}`;
//         err = new ErrorHandler(message, 400);
//     }

//     if (err.code === 11000) {
//         const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
//         err = new ErrorHandler(message, 400);
//     }

//     if (err.name === 'ValidationError') {
//         const message = Object.values(err.errors).map(val => val.message).join(', ');
//         err = new ErrorHandler(message, 400);
//     }

//     if (err.name === 'JsonWebTokenError') {
//         const message = 'JSON Web Token is invalid. Try again!';
//         err = new ErrorHandler(message, 400);
//     }

//     if (err.name === 'TokenExpiredError') {
//         const message = 'JSON Web Token has expired. Try again!';
//         err = new ErrorHandler(message, 400);
//     }

//     // Send error response to the client
//     res.status(err.statusCode).json({
//         success: false,
//         message: err.message,
//     });
// };
