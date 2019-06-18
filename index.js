// Import Mongoose package, then keys config and our model class files.
// It is essential that User model be imported before /services/passport.js references it.
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');

// Import Express package and Body Parser Express middleware.
const express = require('express');
const bodyParser = require('body-parser');

// Import cookie-session package so we can later tell Passport to use it.
// Then import our local /services/passport.js config file which references Passport package.
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');

// Connect to MongoDB.
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// Start Express server.
const app = express();

// app.use() -- Define Express middleware to handle some work before passing to route handlers.

app.use(bodyParser.json());

app.use(
    cookieSession({ 
        maxAge: 30 * 24 * 60 *60 * 1000,    // Pass 30 days in milliseconds.
        keys: [keys.cookieKey]              // Array of strings to use in encrypting cookie, one will be chosen at random.  We are only supplying one.
     })
);

// Tell Passport to use cookie authentication.
app.use(passport.initialize());
app.use(passport.session());

// app.get(), app.post(), etc. -- Invoke route handlers.

// Import exported route handler function from authRoutes.js and invoke it passing app object.  This code invokes Passport.
require('./routes/authRoutes')(app);
// Import exported route handler function from billingRoutes.js and invoke it passing app object.  This invokes Stripe
// but before doing so, it runs middleware from server/middleware/requireLogin.js to ensure user is logged in.
require('./routes/billingRoutes')(app);
// Import exported route handler function from surveyRoutes.js and invoke it passing app object.  This invokes ????
// but before doing so, it runs middleware from server/middleware/requireLogin.js to ensure user is logged in and
// requireCredits.js to ensure user has ability to pay for a new survey.
require('./routes/surveyRoutes')(app);

// Help Express in production locate routes in the client app when route handlers are not defined for them in the Express app.
if (process.env.NODE_ENV === 'production') {
    // If Express receives a route that precisely matches a file inside the client/build/ path such as static/js/main.js or static/css/main.css...
    app.use(express.static('client/build'));

    // Otherwise, Express will serve up client/build/index.html if it does not recognize the route.
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Express tells Node what port to listen on.  We get it dynamically from Heroku if running in production.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
