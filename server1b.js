"use strict";
var module = require('http');
var sys = require("sys"),
path = require("path"),
url = require("url"),
filesys = require("fs");

var server = module.createServer(function(request, response) {
    fs.readFile('test1b.txt',function readData(err,data){
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write("Welcome! Test success!");
        response.end();
    })
}).listen(8000);
sys.puts("Server Running on 8000");
