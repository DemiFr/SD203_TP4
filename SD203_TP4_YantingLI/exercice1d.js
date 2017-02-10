"use strict";
var http = require('http');
var sys = require('sys'),
path = require('path'),
url = require('url'),
querystring = require('querystring'),
fs = require('fs');
var nameData = "";  //the record of names
//var nameBuffer = new Buffer(nameData);  //buffer of name that are input in this execution

function onRequest(request, response){
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(),my_path);
    var url_parts = url.parse(request.url, true);//??true

    //"http://monserveur.com/hello?name=xxxx"
    //Format of GET
    if(request.url == "/"){
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write("Welcome to the home page! \n");
        response.end();
    }
    else if(my_path == "/hello"){
        //查询字符串: name=xxxx
        var query = url_parts.query;
        fs.readFile("record.txt",function(err,file){
            console.log(file);
        });
        nameData = nameData + ", " + query.name;
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write("Bonjour " + nameData);
        response.end();

        //Open a txt.file and write the name in the file
        fs.open('record.txt','w','777',function(err,fd){
            if(err) console.log("Open file error!");
            fs.appendFile('record.txt', nameData, function(err){
                if(err) console.log("Append name Error!");
            });
        })
    }
    else{
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write("Other");
        response.end();
    }
}

var server = http.createServer(onRequest);

server.listen(8000);
sys.puts("Server Running on 8000");




Modifier le serveur précédent pour sauvegarder en mémoire toutes les valeurs de "nom" reçues. 
Le serveur répondra, à chaque nouvelle requête, avec une réponse HTML du type "Bonjour xxxx, les utilisateurs suivants ont déjà visités cette page: yyyy, zzzz, aaaa, bbbb". 
Vérifier la vulnérabilité XSS. Expliquer en quoi cette vulnérabilité est plus grave dans ce cas. 
Corriger cette vulnérabilité, notamment pour name=<b>Toto</b> et name=<script>alert('coucou');</script>.