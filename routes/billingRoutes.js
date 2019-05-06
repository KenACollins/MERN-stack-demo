const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
    /**
     * Any time someone makes a POST request to route '/api/stripe', we pass 
     * requireLogin in 2nd parameter telling Express this is a reference to
     * a middleware function that Express should run internally before it
     * executes the arrow function in the last parameter. 
     * 
     * Note: The first parameter is the URI, the last is an arrow function
     * containing the final execution.  There can be any number of middle
     * parameters for middleware.
     */
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // Actually charge user's credit card 500 cents = $5.
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        // Add 5 units to current user's credits property back in MongoDB.
        // After we successfully commit that save, send UPDATED USER back
        // to whomever made the request INSTEAD OF req.user just in case 
        // req.user has gotten stale.  This is because the save does not
        // update all the properties on the req.user object.
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
};