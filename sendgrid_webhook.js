var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'i-will-have-a-ham-and-cheese-sandwich' }, function(err, tunnel) {
  console.log('LT running')
});