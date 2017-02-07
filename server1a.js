"use strict";
var module = require('http');
var sys = require("sys"),
path = require("path"),
url = require("url"),
filesys = require("fs");

var server = module.createServer(function(request, response) {
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(),my_path);
    path.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
        }
        else{
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write("Hello World\n");
            response.end();
            //response.end("Welcome! Test success!");
        }
    });
}).listen(8000);
sys.puts("Server Running on 8000");
