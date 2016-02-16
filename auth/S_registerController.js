(function (S_registersController) {
    
    var services = require("../services");
    var hasher = require('./hasher.js');
    var passport = require('passport');
    var session = require('express-session');
    var localStrategy = require('passport-local').Strategy;

    var auth = require("./index.js");
    
    //var express = require('express');
    //var router = express.Router();

    //var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    //var MyGoogleLoginMechanism = require('../config/strategies/google.strategy');
    //MyGoogleLoginMechanism();

    //var jwt = require('jwt-simple');
    //var jwtBearerStrategy = require('passport-http-bearer');
    //var secretOrPublicKey = "Nishanth";
    
    S_registersController.init = function (app) {
        
        function userVerify(username, password, next) {
            var promise = services.getUserUsingUsername(username.toLowerCase());
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
            next(null, user);
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
        
        app.use(session({ secret: 'anything' }));
        
        app.use(passport.initialize());
        app.use(passport.session());
        
        //app.route('/google').get(passport.authenticate('google', {
        //    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        //        'https://www.googleapis.com/auth/userinfo.email']
        //}, function (req, res) { 
        //    res.send("hi");
        //})
        //);
        
        //app.route('/google/callback').get(passport.authenticate('google', {
        //    successRedirect: '/googleSuccess',
        //    failure: '/error/'
        //}));
        
        //app.route('/google/callback').get(passport.authenticate('google', function (req, res) { 
        //    res.send({ id: "id" });
        //}));

        //app.get('/googleSuccess', function (req, res) {
        //    var result = { googleSuccess : true };
        //    res.send(result);
        //});

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
            var username = req.body.email.toLowerCase();
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
                email: req.body.email.toLowerCase(),
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

        app.post("/api/social/register", function (req, res) { 
            
            var user = {
                loginType: req.body.loginType.toLowerCase(),
                id: req.body.id,
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                imageUrl: req.body.imageUrl
            };

            var promise = services.socialRegister(user);
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Social registration of type " + user.type + "failed" + error);
            });
        });
    };
})(module.exports);