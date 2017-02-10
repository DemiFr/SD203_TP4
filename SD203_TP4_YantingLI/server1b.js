"use strict";
var module = require('http');
var sys = require("sys"),
path = require("path"),
url = require("url"),
fs = require("fs");

var server = module.createServer(function(request, response) {
    //Get the path in the request
    var my_path = url.parse(request.url).pathname;
    request.setEncoding("utf8");
    //Generate the whole path name
    var full_path = path.join(process.cwd(),my_path);

    path.exists(full_path,function(exists){
        //L'accès à la page d'accueil devra toujours fonctionner.
        if(request.url == "/"){
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write("Welcome to the home page! \n");
            response.end();
        }
        //If the file doesn't exist
        else if(!exists){
            response.writeHeader(404, {"Content-Type": "test/plain"});
            response.write("404 Not Found\n");
            response.end();
        }
        //Ok, files exist
        else{
            //Now read file(s)
            fs.readFile('exercice1c.html',function readData(err,file){
                if(err){
                    response.writeHeader(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                }
                else{
                    response.writeHeader(200, {"Content-Type": "text/plain"});
                    response.write(file + "\n");
                    //response.write(full_path);
                    response.end();
                }
            })
        }
    })

}).listen(8000);
sys.puts("Server Running on 8000");

//vérifier l'existence d'un fichier
//Vous commenterez quelles méthodes ont été utilisées, en particulier concernant le choix synchrone/asynchrone.
//On vérifiera que le serveur ne sert pas les fichiers dans les répertoires parents, c'est-à-dire utilisant "http://monserveur.com/../file.txt".
//On s'assurera de répondre avec le bon type MIME pour les fichiers les plus courants (HTML, CSS, JS, PNG, ...).
