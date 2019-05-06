// Applicable to create-react-app (CRA) version 2 or higher.
// This file does not need to be imported anywhere.  CRA looks for a file by this name and loads it.
const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    // For the relative URIs specified in the array below, redirect to the same target.
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
};

