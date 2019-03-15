// Import express package.
const express = require('express');

// Start Express server.
const app = express();

// Create a route handler and register it to our running Express app server.
// o Watch for incoming HTTP GET requests.
// o At root '/' path (eg., localhost:5000/).
// o req = object representing incoming request.
// o res = object representing outgoing response.
// o Immediately send back some JSON to whoever made the request.
app.get('/', (req, res) => {
    res.send({ hello: 'world' });
});

// Express tells Node what port to listen on.  We get it dynamically from Heroku.
const PORT = process.env.PORT || 5000;
app.listen(PORT);