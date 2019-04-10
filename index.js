// Import Mongoose package, then keys config and User model files.
// It is essential that User model be imported before /services/passport.js references it.
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');

// Import Express package.
const express = require('express');

// Import cookie-session package so we can later tell Passport to use it.
// Then import our local /services/passport.js config file which references Passport package.
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');

// Connect to MongoDB.
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// Start Express server.
const app = express();

// app.use() -- Define middleware to handle some work before passing to route handlers.

app.use(
    cookieSession({ 
        maxAge: 30 * 24 * 60 *60 * 1000,    // Pass 30 days in milliseconds.
        keys: [keys.cookieKey]              // Array of strings to use in encrypting cookie, one will be chosen at random.  We are only supplying one.
     })
);

// Tell Passport to use cookie authentication.
app.use(passport.initialize());
app.use(passport.session());

// Import exported function from authRoutes.js and invoke it passing app object.
// This code invokes Passport.
require('./routes/authRoutes')(app);

// Express tells Node what port to listen on.  We get it dynamically from Heroku if running in production.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
