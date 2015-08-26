(function (S_registersController) {
    
    var services = require("../services");
    var hasher = require('./hasher.js');
    var passport = require('passport');
    var localStrategy = require('passport-local').Strategy;
    var auth = require("./index.js");
    //var jwt = require('jwt-simple');
    //var jwtBearerStrategy = require('passport-http-bearer');
    //var secretOrPublicKey = "Nishanth";
    
    S_registersController.init = function (app) {
        
        function userVerify(username, password, next) {
            var promise = services.getUserUsingUsername(username);
            promise.then(function (user) {
                if (user) {
                    var testHash = hasher.computeHash(password, user.salt);
                    if (testHash === user.passwordHash) {
                        next(null, user);
                        return;
                    } else {
                        next(next, false, { message: "Invalid Password" });
                    }
                } else {
                    next(next, false, { message: "Invalid Username" });
                }
            }, function (error) {
                next(next, false, { message: "Invalid Credentials" });
            });
        }
        
        passport.use(new localStrategy(userVerify));
        passport.serializeUser(function (user, next) {
            next(null, user._id);
        });
        passport.deserializeUser(function (key, next) {
            services.getUserUsingUserId(key, function (err, user) {
                if (err) {
                    next(next, false, { message: "Failed To retreive User" });
                } else {
                    next(null, user);
                }
            });
        });
        app.use(passport.initialize());
        app.use(passport.session());
        
        app.post("/api/login", function (req, res, next) {
            var authFunction = passport.authenticate("local", function (err, user, info) {
                if (err) {
                    next(err);
                } else {
                    req.logIn(user, function () {
                        if (err) {
                            res.send("Login Failed");
                        } else {
                            res.send(user);
                        }
                    });
                }
            });
            authFunction(req, res, userVerify);
        });
        
        app.post("/api/register/checkForUsernameExistence", function (req, res) {
            var username = req.body.email;
            var promise = services.isUsernameAlreadyInUse(username);
            
            promise.then(function (result) {
                if (result === null) {
                    res.send("Username available");
                } else {
                    res.send("Searched query and found result for the given username");
                }
            }, function (error) {
                res.status(500).send({ error: "Username unavailable" + error });
            });

        });
        
        app.post("/api/register/", function (req, res) {
            
            var salt = hasher.createSalt();
            var user = {
                email: req.body.email,
                passwordHash: hasher.computeHash(req.body.password, salt),
                salt: salt
            };
            
            var promise = services.registerUser(user);
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Registration failed" + error);
            });
        });
        //app.post("/api/register/", function (req, res) {
        
        //    var user = req.body;
        //    var newUser = {
        //        email: user.email,
        //        password: user.password
        //    };
        
        //    var payload = {
        //        iss: req.hostname,
        //        sub: newUser.id
        //    }
        
        //    var token = jwt.encode(payload, "shhh..");
        
        //    var promise = services.registerUser(newUser);
        //    promise.then(function (result) {
        //        res.send({
        //            user: result.toJSON(),
        //            token: token
        //        });
        //    }, function (error) {
        //        res.send("Registration failed" + error);
        //    });
        //});
        
        
        



    };
})(module.exports);