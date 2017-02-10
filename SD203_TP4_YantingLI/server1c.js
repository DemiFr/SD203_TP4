"use strict";
var http = require('http');
var sys = require('sys'),
path = require('path'),
url = require('url'),
querystring = require('querystring'),
fs = require('fs');

var server = http.createServer(function(request, response) {
    //"http://monserveur.com/hello?name=xxxx"
    //Format of GET
    var my_path = url.parse(request.url).pathname;
    //var full_path = path.join(process.cwd(),my_path);
    var url_parts = url.parse(request.url, true);//??true
    if(request.url == "/"){
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write("Welcome to the home page! \n");
        response.end();
    }
    else if(my_path == "/hello"){
        //query string: name=xxxx
        var query = url_parts.query;
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write("Bonjour " + query.name);
        response.end();
    }
    else{
    	response.writeHeader(200, {"Content-Type": "text/html"});
        response.write("Other");
        response.end();
    }

}).listen(8000);
sys.puts("Server Running on 8000");

/*
Modifier le serveur Web précédent pour qu'il traite les requêtes GET pour l'adresse "http://monserveur.com/hello?name=xxxx" ou xxxx est une chaîne de caractères.
Enregistrer le nouveau code dans un fichier appele server1c.js.
Le serveur répondra avec du code HTML disant "Bonjour xxxx". xxxx devra pouvoir contenir des accents, des espaces ...
Vous pourrez utiliser la méthode unescape du module querystring.
Testez votre serveur en écrivant une page HTML (nommée exercice1c.html) contenant un formulaire qui émet ces requêtes.
On pourra vérifier les vulnérabilités XSS (injection de code HTML, injection de code JavaScript) mais on ne les corrigera pas.
*/