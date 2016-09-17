// More info about Express: http://expressjs.com/api.html

var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var calculate = require('./models/calculate.js');
var _ = require('underscore');

var mongoose = require('mongoose');

var util = require('util');

app.locals._ = _;

// About body-parser: it is a piece of express middleware 
// that reads a form's input and stores it as a javascript
// object accessible through 'req.body'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

app.set('port', (process.env.PORT || 5000));

// Middleware body-parser (no se utiliza en esta versión):
// When a route receives a posted form (method POST),
// usage of 'body-parser' means that 'req.body' will be
// filled in with the form elements.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the data store in mongo
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://user1234:1234@ds033076.mlab.com:33076/heroku_fzgldlpq', function(err) {
	if (err) {
		console.log("Error: Check if mongod is running!");
		throw err;
	} else {
		console.log("Connected to MongoDB");
	}
});

// Create a Schema for the input examples
var Schema = mongoose.Schema;
var InputSchema = new Schema({
	"name": String,
	"content": String,
	"date": Date
});

// Building the model from our Schema
var Input = mongoose.model("Input", InputSchema);

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
app.get('/', function(req, res) {
	// The form's action is '/csv' and its method is 'POST',
  	// so the 'app.post('/csv', ...') route will receive the
  	// result of our form
	res.render('index', { title: 'CSV Analyzer', items: '' });
});

app.get('/csv', function(req, res) {
	var isAjaxRequest = req.xhr;
	if (isAjaxRequest) {
		var r = calculate(req.query.input);
		res.send({ items: r });

	} else {
		res.send("Ooops! You should not be here...");
	}
});

// Devuelve todos los documentos almacenados en MongoDB
app.get('/mongo', function(req, res) {
	console.log("/mongo");

	Input.find({}, function(err, docs) {
		res.send(docs);
	});
});

// Devuelve el documento cuyo nombre sea ':example'
app.get('/mongo/:example', function(req, res) {
	var inputName = req.params.example;

	console.log("/mongo/:example " + inputName);

	Input.find({ name: inputName }, function(err, doc) {
		console.log("El servidor devuelve: " + JSON.stringify(doc));
		res.send(doc);
	});
});

app.get("/save", function(req, res) {
	var newInputName = req.query.inputName;
	var newInputContent = req.query.inputContent;
	var newInputDate = (new Date()).getTime();

	console.log("/save");

	// Rescatamos el nombre del ejemplo a guardar y su contenido,
	// creamos un nuevo objeto Input y lo guardamos en la BBDD
	var newInput = new Input({ 	name: newInputName, 
								content: newInputContent,
								date: newInputDate
							});

	newInput.save( function(err) {
		if (err !== null) {
			console.log("An error ocurred: ${err}");
			res.send("ERROR");
		
		} else {
			Input.find({}, function (err, docs) {
		        if (err !== null) {
		            console.log("An error ocurred: ${err}");
		            res.send("ERROR");

		        } else if (docs.length > 4) {
		        	// We will remove the oldest doc
		        	var oldestDate = docs[0].date;
		        	var oldestDoc;
		        	docs.forEach( function(doc) {
			    		if (doc.date < oldestDate) {
		        			oldestDate = doc.date;
		        			oldestDoc = doc;
		        		}
		        	});

		        	Input.find({ date: oldestDate }).remove().exec();
		        }

		        res.send("OK");
			});
		}
	});
});

var server = app.listen(app.get('port'), function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Node app is running at http://%s:%s', host, port);
});