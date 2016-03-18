/**
 * Module dependencies
*/
var express  = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	flash = require('connect-flash'),
	http = require('http'),
	path = path = require('path'),
	uuid = require('node-uuid'),
	util = require('util'),
	watson = require('watson-developer-cloud');

var multer  = require('multer');
var fs = require('fs');

var vhost = 'nodejsapp.local'
var port     = process.env.PORT || 3000;
var ip     = process.env.IP || "localhost";

app.configure(function() {
    // set up our express application
    app.set('port', port);
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms
    app.set('view engine', 'html'); // set up html for templating
    app.engine('.html', require('ejs').__express);
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.session({ secret: 'keyboard cat' }));// persistent login sessions
    app.use(express.methodOverride());
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({ extended: true }));
//    app.use(multipart());
    app.use(multer({
    	  destination: './uploads/',
    	  filename: function (req, file, cb) {
    	    crypto.pseudoRandomBytes(16, function (err, raw) {
    	      if (err) return cb(err)

    	      cb(null, raw.toString('hex') + path.extname(file.originalname))
    	    })
    	  }
    	}));

    app.use(app.router); //init routing

});

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

var bluemix = require('./app/config/bluemix');
var languageEndpoint = require('./app/endpoints/languageEndpoint.js')(watson, bluemix, fs);
var sttEndpoint = require('./app/endpoints/sttEndpoint.js')(io, watson, bluemix);

require('./app/routes.js')(app, languageEndpoint); 

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

//express.vhost(vhost, app);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + vhost+":"+server.address().port);
});
