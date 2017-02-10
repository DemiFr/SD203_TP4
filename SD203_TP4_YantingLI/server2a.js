"use strict";
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(request, response){
	response.send('Welcome to the home page! \n');
})

app.listen(8000);