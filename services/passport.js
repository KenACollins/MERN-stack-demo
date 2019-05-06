const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Gain access to users collection by invoking 1-arg model().
const User = mongoose.model('users');

// Take the user we got back from MongoDB and flatten it into a string that we can store as a token in cookie in user's browser.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Taking the token pulled from the cookie, turn it into a User model instance.
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        }
    );
});

// Tell Passport how to make use of a new instance of Google strategy.
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        // Check users collection for possible existence of current user.  Add user to collection only if he/she is NOT already present.
        const existingUser = await User.findOne({ googleId: profile.id });  // Asynchronous operation returns a promise.
        if (existingUser) {  // If a model instance for this specific user was found in collection...
            // Do not add duplicate!  Just signal we are done.
            done(null, existingUser);   // 1st parm is error object (none here, pass null), 2nd parm is User object.
        }
        else {
            // Create a new User model instance and invoke save() method to persist in MongoDB.
            const user = await new User({ googleId: profile.id }).save();   // Asynchronous operation returns a promise.
            done(null, user);    // When promise resolves, it passes back the newly created User object that we can pass to done().
        }
    })
);