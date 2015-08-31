var http = require('http');

var express = require("express");

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

var auth = require("./auth");
auth.init(app);

var controllers = require("./controllers");
controllers.init(app);

var port = process.env.PORT || 3030;
//var port = 1337;
var server = http.createServer(app);
server.listen(port);
console.log("Listening on port .." + port);
