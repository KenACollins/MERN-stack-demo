/**
 * This module returns an arrow function that detects if user has at least one remaining credit
 * and sends back an error to user's browser if the answer is no.  We only want to run this 
 * middleware for URI routes that require payment, not all of them.  This middleware expects
 * to follow the requireLogin middleware, so we know user is logged in and req.user has a value.
 * 
 * o req and res are the HTTP request and response objects passed from Passport. The current user
 *   is stored in the req.user property when logged in and we know this is the case because a call
 *   to requireLogin middleware precedes THIS middleware.
 * 
 * o next is a function we call when our middleware is has finished running.  The idea is that 
 *   middleware is chained together in sequential order so we want to know which middleware or 
 *   route handler to run next.  Applicable only if user has at least one remaining credit in 
 *   his or her account in order to pay for a new survey.  We want to cease further processing
 *   if user is out of credits.
 */
module.exports = (req, res, next)  => {
    // If user does not have at least one credit remaining in his or her account, terminate the request.
    if (req.user.credits < 1) {
        // Send back access forbidden status code 403 and then for developer use, an error message.
        res.status(403).send({ error: 'You do not have enough credits!' });
    }
    // Otherwise, continue with next request handler (may be more middleware or a route handler).
    next();
};