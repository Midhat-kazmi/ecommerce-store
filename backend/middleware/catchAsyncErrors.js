module.exports = (theFunc) => (req, res, next) => { 
    Promise.resolve(theFunc(req, res, next)).catch(next);
}
// This middleware is used to catch async errors in Express.js routes.
// It takes a function (theFunc) as an argument and returns a new function that handles the request, response, and next parameters.
 