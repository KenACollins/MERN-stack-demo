/**
 * This module returns an arrow function that detects if user is logged in and
 * sends an error back to user's browser if the answer is no.  We only want to
 * run this middleware for URI routes that require a login, not all of them.
 * 
 * o req and res are the HTTP request and response objects passed from Passport.
 *   The current user is stored in the req.user property if he/she is logged in.
 * 
 * o next is a function we call when our middleware is has finished running.  The
 *   idea is that middleware is chained together in sequential order so we want
 *   to know which middleware or route handler to run next.  Applicable only if
 *   user is logged in.  We want to cease further processing if user is unknown.
 */
module.exports = (req, res, next)  => {
    // If user is not signed in, terminate the request.
    if (!req.user) {
        // Send back authentication status code 401 and then for developer use, an error message.
        res.status(401).send({ error: 'You must log in!' });
    }
    // Otherwise, continue with next request handler (may be more middleware or a route handler).
    next();
};