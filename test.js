"use strict";
var express = require('express'),
url = require('url');
var app = express();
var router = express.Router();	//Creating Router() object

// app.use(express.static('public'));

// app.get('/', function(request, response){
// 	response.send('Welcome to the home page! \n');
// })
router.get('/', function(req, res) {
	res.send('Welcome to the home page! \n');
})

router.get('/hello', function(req, res){
	res.send('Bonjour ' + url.parse(request.url, true).query.name + '!');
})

app.use('/', router);

app.listen(8000);