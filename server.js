var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

app.get('/', function(request, response) {
  response.render('pages/index');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
// var webpack = require('webpack')
// var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('./webpack.config')
//
// var app = new (require('express'))()
// var port = 3000
//
// var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))
//
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })
//
// app.listen(port, function(error) {
//   if (error) {
//     console.error(error)
//   } else {
//     console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
//   }
// })
