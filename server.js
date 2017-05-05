require('dotenv').config();
const debug = require('debug')('test.server');


// Define libraries
var express     = require('express');
var bodyParser  = require('body-parser');
var erc         = require('express-route-controller2');

// Define constant(s)
CONFIG    = require('./config/config.json');

// Initialize Express + body parser
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up express route control
var router = express.Router();
app.use('/', router);
erc(app, {
	controllers: __dirname + '/app/controllers',
	routes: require('./config/routes.json')
});

// Jade for generate views
app.set('views', './app/views');
app.set('view engine', 'jade');

// Start server
module.exports = app.listen(process.env.NODE_PORT, function() {
	debug('server is started');
	console.log('Server is started');
});
