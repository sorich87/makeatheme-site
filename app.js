var http = require('http')
  , url = require('url')
  , send = require('send')
  , app;

app = http.createServer(function(req, res) {
  // error-handling
  function error(err) {
    res.statusCode = err.status || 500;
    res.end(err.message);
  }

  // directory handling
  function redirect() {
    res.statusCode = 301;
    res.setHeader('Location', req.url + '/');
    res.end('Redirecting to ' + req.url + '/');
  }

  send(req, url.parse(req.url).pathname)
    .root(__dirname + '/public')
    .on('error', error)
    .on('directory', redirect)
    .pipe(res);
});

app.listen(process.env.VCAP_APP_PORT || 3001);

module.exports = app;

