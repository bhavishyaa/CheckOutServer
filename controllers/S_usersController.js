(function (S_usersController) {
    
    var services = require("../services");
    var auth = require("../auth/index.js");
    //var jwt = require('jwt-simple');
    //var jwtBearerStrategy = require('passport-http-bearer');
    //var secretOrPublicKey = "Nishanth";
    
    S_usersController.init = function (app) {
        
        app.get("/", function (req, res) {
            res.send("This is app's basic route");
        });
        
        app.get("/test", function (req, res) {
            res.send("This is a test route for server");
        });
        
        app.post("/api/users/", function (req, res) {
            //if (!req.headers.authorization) {
            //    return res.status(401).send({ message : "You are not authorized" });
            //}
            
            //var token = req.headers.authorization.split(' ')[1];
            //var payload = jwt.decode(token, "shhh..");
            
            //if (!payload.sub)
            //    res.status(401).send({ message : "You are not authorized" });
            
            var userId = req.headers.userid;
            if (userId == null && !userId) {
                return res.status(401).send({ message : "UserId is not passed in headers" });
            }

            var location = req.body;
            var promise = services.getUsers(location, userId);
            promise.then(function (result) {
                result.user = req.user;
                res.send(result);
            }, function (error) {
                res.send("Not able to load users based on location " + error);
            });

        });
        
        app.get("/api/user/:id", function (req, res) {
            
            var userId = req.headers.userid;
            //if (!userId) {
            //    return res.status(401).send({ message : "UserId is not passed in headers" });
            //}

            var id = req.params.id;
            var promise = services.getUser(id);
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Not able to get user info with id " + id + "error: " + error);
            });

        });
        
        app.get("/api/user/myDetails/", function (req, res) {
            
            var userId = req.headers.userid;
            //if (!userId) {
            //    return res.status(401).send({ message : "UserId is not passed in headers" });
            //}
            
            //var id = req.params.id;
            var promise = services.getUser(userId);
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Not able to load your details with your id " + userId + "error: " + error);
            });

        });

        app.post("/api/user/", function (req, res) {
            
            var userObj = req.body;
            var promise = services.postUser(userObj);
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Not able to add user" + userObj + "error: " + error);
            });

        });
        
        
        app.post("/api/user/updateLocation/", function (req, res) {

            var userId = req.headers.userid;
            if (!userId) {
                return res.status(401).send({ message : "UserId is not passed in headers" });
            }

            var location = req.body;
            var promise = services.updateUserLocation(userId, location);
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Not able to update user location" + location + "error: " + error);
            });
            
        });
        
        

        app.post("/api/user/updateProfile/", function (req, res) {
            
            var userId = req.headers.userid;
            if (!userId) {
                return res.status(401).send({ message : "UserId is not passed in headers" });
            }
            
            var profile = req.body;
            var promise = services.updateUserProfile(userId, profile);
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Not able to update user profile - " + profile + "error " + error);
            });
        });


    };
})(module.exports);