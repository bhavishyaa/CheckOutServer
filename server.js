var http = require('http');

var express = require("express");

var mongoose = require('mongoose');

//var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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


var cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true,
    keepExtensions: true,
    uploadDir: "uploads"
}));
app.use(bodyParser.json());


var controllers = require("./controllers");
controllers.init(app);

var port = process.env.PORT || 3030;
var server = http.createServer(app);
server.listen(port);
console.log("Listening on port .." + port);