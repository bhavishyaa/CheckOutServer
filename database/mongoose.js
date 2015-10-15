(function (database) {
    
    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    var mongoose = require('mongoose');
    //mongoose.connect('mongodb://localhost/nkdb');
    mongoose.connect('mongodb://kabra:kabra@ds027761.mongolab.com:27761/checkout');
    var db = mongoose.connection;

    var mongo = require('mongodb');
    var grid = require('gridfs-stream');
    //var gfs = grid(db, mongo);
    var formidable = require("formidable");
    
    var fs = require("fs");
    var q = require('q');
    
    
    //var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    //mongoose.connect('mongodb://nk:nk@ds027761.mongolab.com:27761/checkout');
    
    //if (env === 'development') {
    //    mongoose.connect('mongodb://localhost/nkdb');
    //}
    //else {
    //    mongoose.connect('mongodb://nk:nk@ds027761.mongolab.com:27761/checkout');
    //}
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log("connected to DB");
    });
    
    //var userSchema = require("./userSchema.js");
    var schema = mongoose.Schema;
    var userSchema = schema({
        userId: Number,
        email: String,
        username: String,
        passwordHash: String,
        salt: String,
        //name: String,
        //status: { type: String, default: "Hey there! Am checking out" },
        location: {
            type: {
                type: String,
                default: "Point"
            }, 
            coordinates: {
                type: [Number]
            }

        },
        profile: {
            basicInfo: {
                name: { type: String, default: "Test User" },
                gender: { type: String, default: "" },
                dob: { type: String, default: "" },
                city: { type: String, default: "" }
            },
            education: {
                school: { type: String, default: "" },
                underGraduation: { type: String, default: "" },
                graduation: { type: String, default: "" },
            },
            work: {
                previousEmployer: { type: String, default: "" },
                currentEmployer: { type: String, default: "" }
            },
            relationship: {
                status: { type: String, default: "" }
            },
            interests: {
                interests: { type: String, default: "" }
            },
            status: {
                status: { type: String, default: "Hey there! Am checking out" },
            }
        },
        imageData: { type: String, default: "" }
    });
    var userModel = mongoose.model('UserModel', userSchema);
    
    //Register User
    database.registerUser = function (user) {
        
        var defer = q.defer();
        var usertobeRegisterd = new userModel(user);
        usertobeRegisterd.location.coordinates[0] = 90;
        usertobeRegisterd.location.coordinates[1] = 90;
        usertobeRegisterd.save(function (err, results) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(results);
            }
        });
        return defer.promise;

    };
    
    //Get User Using Username
    database.getUserUsingUsername = function (username) {
        
        var defer = q.defer();
        userModel.findOne({ email: username }, function (err, results) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(results);
            }
        });
        return defer.promise;

    };
    
    database.getUserUsingUserId = function (userId) {
        
        var defer = q.defer();
        userModel.findOne({ _id: userId }, function (err, results) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(results);
            }
        });
        return defer.promise;

    };
    
    //Check For Username Already In Use
    database.isUsernameAlreadyInUse = function (username) {
        
        var defer = q.defer();
        userModel.findOne({ email: username }, function (err, results) {
            if (err) {
                defer.reject(err);
            } else {
                if (results === null) {
                    defer.resolve(results);
                } else {
                    defer.reject();
                }
            }
        });
        return defer.promise;

    };
    
    //Save User
    database.saveUser = function (user) {
        
        var userDetail = new userModel({
            userId: user.userId,
            name: user.name,
            status: user.status,
            profile: {
                basicInfo: {
                    gender: user.basicInfo.gender,
                    dob: user.basicInfo.dob,
                    currentCity: user.basicInfo.currentCity,
                    languages: user.basicInfo.languages
                },
                education: user.education,
                work: user.work,
                relationship: user.relationship,
                interests: user.interests
            }
        });
        var defer = q.defer();
        userDetail.save(function (err, results) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(results);
            }
        });
        return defer.promise;
    };
    
    //Get Users Based On Location
    database.getUsers = function (location, userId) {
        var defer = q.defer();
        var query = userModel.find(
            {
                location: {
                    $geoNear: {
                        $geometry: {
                            type: "Point", coordinates: [location.longitude, location.latitude]
                        }, $minDistance: 0, $maxDistance: 500
                    }
                },
                _id: { $ne: userId }
            }, {
                userId: 1, profile: 1, status: 1, location: 1
            });
        query.exec(function (err, results) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(results);
            }
        });
        return defer.promise;
    };
    
    //Update User Location 
    database.updateUserLocation = function (userId, location) {
        var locationGeoJson = {
            type: "",
            coordinates: []
        };
        locationGeoJson.type = "Point";
        locationGeoJson.coordinates = [location.longitude, location.latitude];
        var defer = q.defer();
        var id = userId;
        userModel.findByIdAndUpdate(
            { _id: id },
            { $set: { location: locationGeoJson } },
            function (err, results) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(results);
                }
            });
        return defer.promise;

    };
    
    //Get User Profile
    database.getUserProfile = function (userId) {
        var defer = q.defer();
        var id = userId;
        userModel.findOne(
            { _id: id },
            function (err, results) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(results);
                }
            });
        return defer.promise;
    };
    
    //Update User Profile
    database.updateUserProfile = function (userId, profile) {
        var defer = q.defer();
        var id = userId;
        userModel.findByIdAndUpdate(
            { _id: id },
            { $set: { profile: profile } },
            function (err, results) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(results);
                }
            });
        return defer.promise;
    };
    
    //Get User picture
    database.getUserPic = function (config) {
        
        var defer = q.defer();

        var conn = mongoose.createConnection('mongodb://kabra:kabra@ds027761.mongolab.com:27761/checkout');
        var output = null;
        conn.once('open', function (response) {
            var gfs = grid(conn.db, mongo);
            var readstream = gfs.createReadStream({
                _id: config.id
            });
            var writeStream = config.writeStream;
            readstream.pipe(writeStream);
            writeStream.on('close', function () {
                defer.resolve();
            });
            writeStream.on('error', function (error) {
                defer.reject(error);
            });
            readstream.on('error', function (error) {
                defer.reject(error);
            });
        });
        return defer.promise;

    };

    //Save User picture
    database.postUserPic = function (userId, req) {
        var defer = q.defer();
        var form = new formidable.IncomingForm();
        //form.uploadDir = __dirname + "/data";
        form.keepExtensions = true;
        form.parse(req, function (err, fields, files) {
            
            if (!err) {
                grid.mongo = mongoose.mongo;
                var conn = mongoose.createConnection('mongodb://kabra:kabra@ds027761.mongolab.com:27761/checkout');
                conn.once('open', function (error, results) {
                    if (error) {
                        console.log(error);
                        defer.reject(error);
                    } else {
                        var gfs = grid(conn.db, mongo);
                        var writestream = gfs.createWriteStream({
                            safe: true,
                            _id: userId
                        });
                        var savedPicture = fs.createReadStream(files.file.path).pipe(writestream);
                        defer.resolve(savedPicture);
                    }
                });
                
            }
        });
        return defer.promise;
    };
    

})(module.exports);
