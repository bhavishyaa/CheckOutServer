(function (S_usersController) {
    
    var services = require("../services");
    //var database = require("../database/mongoose");

    
    S_usersController.init = function (app) {
        
        app.get("/", function (req, res) {
            res.send("This is app's basic route");
        });
        
        app.get("/api/users", function (req, res) {
            function callback(result) {
                res.send(result);
            }
            services.getUsers(callback);
        });
        
        app.get("/api/user/:id", function (req, res) {
            var userId = req.params.id;
            function callback(result) {
                res.send(result);
            }
            services.getUser(userId, callback);
        });
        
        app.post("/api/user/", function (req, res) {
            var userObj = req.body;
            services.postUser(userObj, function (err, results) {
                res.send(results);
            });
        });

        app.post("api/displayPic/", function (req, res) {
            console.log("HI");
            //var userObj = req.body;
            res.send("HI Image API");
            //services.postUser(userObj, function (err, results) {
            //    res.send(results);
            //});
        });

    };
})(module.exports);