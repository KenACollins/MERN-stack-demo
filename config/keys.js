// keys.js - Figure out which set of credentials to return.
if (process.env.NODE_ENV === 'production') {    // Heroku returns NODE_ENV environment variable set precisely to 'production'.
    // We are in production, return the prod set of keys.
    module.exports = require('./prod');
}
else {
    // We are in development, return the dev set of keys.
    module.exports = require('./dev');
}