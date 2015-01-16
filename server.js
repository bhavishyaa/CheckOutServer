var http = require('http');

var express = require("express");




var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/nkdb');
//mongodb://nishanth:nishanth@ds027761.mongolab.com:27761/checkout
//mongoose.connect('mongodb://nk:nk@ds027761.mongolab.com:27761/checkout');

//if (env === 'development') {
//    mongoose.connect('mongodb://localhost/nkdb');
//}
//else {
//    mongoose.connect('mongodb://nk:nk@ds027761.mongolab.com:27761/checkout');
//}

var bodyParser = require("body-parser");
var app = express();

//var db = require("./database/mongoose.js");

var cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true,
    keepExtensions: true,
    uploadDir: "uploads"
}));
app.use(bodyParser.json());
//app.use(bodyParser({ keepExtensions: true, uploadDir: "uploads" }));


//app.use(express.urlencoded());



var controllers = require("./controllers");
controllers.init(app);

//var services = require("./services");
//services.init(app);


//app.get('/', function(req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//});

var port = process.env.port || 3030;
var server = http.createServer(app);
server.listen(port);
console.log("Listening on port .." + port);