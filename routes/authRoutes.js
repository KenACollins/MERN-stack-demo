// Import the Passport package from node_modules (not to be confused with our local /services/passport.js file).
const passport = require('passport');

// We want app defined in index.js to work its way here.  We export a function from this file.
module.exports = app => {
    /**
     * Create a route handler registered to our Express app server which will handle incoming user authentication requests.
     * When a user comes in on relative path /auth/google, pass them to our OAuth flow managed by Passport.
     * It will use the Google API strategy to authenticate with Google.
     * o 1st argument 'google' is known internally to reference the Google strategy defined above.  I never assigned this identifier.
     * o 2nd argument, scope, lists predefined keywords for type of accesses sought.  Here, we just request access to the user's profile
     *   and e-mail address, but we could also request the user's contact list, posted images, ability to read e-mails, etc. 
     */
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    /**
     * Create a route handler that tells Passport to handle the code sent back by Google OAuth.
     */
    app.get('/auth/google/callback', passport.authenticate('google'));

    /** Provide a means for user to sign out of our application. */
    app.get('/api/logout', (req, res) => {
        req.logout();           // Kill user cookie.
        res.send(req.user);     // Pass back something to tell user they are undefined.  If blank screen appears - user is logged out.
    });
    
    /**
     * Create a route handler for testing the situation where a user has already gone through our OAuth flow
     * and a cookie with the ID has been stored.  At this point, we load URL localhost:5000/api/current_user 
     * and this causes the cookie to be extracted, decrypted, and for User model instance to be produced from
     * the stored ID and passed in the HTTP request's req.user property.  Loading aforementioned URL will display
     * contents of req.user for confirmation. 
     */
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
