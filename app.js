// More info about Express: http://expressjs.com/api.html

var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var calculate = require('./models/calculate.js');
var _ = require('underscore');

app.locals._ = _;

// About body-parser: it is a piece of express middleware 
// that reads a form's input and stores it as a javascript
// object accessible through 'req.body'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
app.get('/', function(req, res) {
	// The form's action is '/csv' and its method is 'POST',
  	// so the 'app.post('/csv', ...' route will receive the
  	// result of our form
	res.render('index', { title: 'CSV Analyzer', items: '' });
});

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that 'req.body' will be filled in with the form elements
app.get('/csv', function(req, res) {
	//var r = csv.calculate(req.body.textareaContent);
	//res.render('index', { title: 'CSV Analyzer', items: r });
	var isAjaxRequest = req.xhr;
	if (isAjaxRequest) {
		var r = calculate(req.query.input);
		res.send({ items: r });

	} else {
		res.send("Ooops! You should not be here...");
	}
});

var server = app.listen(app.get('port'), function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Node app is running at http://%s:%s', host, port);
});