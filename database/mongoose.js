(function (database) {

    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    var mongoose = require('mongoose');

    //var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
	
	mongoose.connect('mongodb://localhost/nkdb');
    //mongoose.connect('mongodb://nk:nk@ds027761.mongolab.com:27761/checkout');
	
    //if (env === 'development') {
    //    mongoose.connect('mongodb://localhost/nkdb');
    //}
    //else {
    //    mongoose.connect('mongodb://nk:nk@ds027761.mongolab.com:27761/checkout');
    //}
    
    var fs = require("fs");
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log("connected to DB");
    });
    
    //var userSchema = require("./userSchema.js");
    var schema = mongoose.Schema;;
    var userSchema = schema({
        userId: Number,
        name: String,
        status: String,
        //image: { data: Buffer, contentType: String },
        //location: {
        //    latitude: Number,
        //    longitude: Number
        //},
        profile: {
            basicInfo: {
                gender: String,
                dob: String,
                currentCity: String,
                languages: String
            },
            education: String,
            work: String,
            relationship: String,
            interests: String
        }
    });
    var userModel = mongoose.model('UserModel', userSchema);
    
    database.saveUser = function (user) {
        
        //var imgPath = "./cordova.png";
        //user.image = {};
        //user.image.data = fs.readFileSync(imgPath);
        //user.image.contentType = 'image/png';
        //console.log(user);
        
        var userDetail = new userModel({
            userId: user.userId,
            name: user.name,
            status: user.status,
            //image: user.image,
            //location: {
            //    latitude: user.location.latitude,
            //    longitude: user.location.longitude
            //},
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
        userDetail.save(function (err, result) {
            return result;
        });
    };
    
    database.getUsers = function (callback) {
        var query = userModel.find();
        query.exec(function (err, results) {
            console.log(err);
            callback(results);
        });
    };
    
    database.getUser = function (userId, callback) {
        var query = userModel.findById(userId);
        query.exec(function (err, results) {
            console.log(err);
            console.log(results);
            callback(results);
        });
    };

})(module.exports);
//// Enum start

//var Schema = mongoose.Schema;
//var genderSchema = Schema({
//    gender: {type:String, enum:['Female', 'Male', 'Others']}
//});
//var genderModel = mongoose.model('genderModel', genderSchema);
//var myGender = new genderModel({
//    gender:"x"
//});
//console.log(myGender);

// ENum end


//var locationSchema = {
//    latitude: Number,
//    longitude: Number
//};

//var basicInfoSchema = {
//    firstname: String,
//    lastname: String,
//    gender: String,
//    dob: { type: Date, default: Date.now },
//    from: String,
//    languages: [String]
//};

//var educationSchema = {
//    highschool: {
//        name: String,
//        started: String,
//        ended: String,
//        major: String
//    },
//    underGraduation: {
//        name: String,
//        started: String,
//        ended: String,
//        major: String
//    },
//    graduation: {
//        name: String,
//        started: String,
//        ended: String,
//        major: String
//    },
//    postGraduation: {
//        name: String,
//        started: String,
//        ended: String,
//        major: String
//    }
//};

//var workSchema = {
//    work: [String]
//};

//var interestsSchema = {
//    interests: [String]
//};
//var userSchema = require("../models/TempuserModel.js");

//database.saveUser = function () {

//    var UserModel = mongoose.model('UserModel', userSchema);

//    var Nishanth = new UserModel({
//        userId: 1,
//        name: "Nishanth Kabra",
//        status: "Sophomore here",
//        location : 55,
//        profile: {
//            basicInfo: "basic info",
//            education: "education info",
//            work: "work info",
//            relationship: "Complicated",
//            interests:"" 
//        }
//    });
//    Nishanth.save();
//}

