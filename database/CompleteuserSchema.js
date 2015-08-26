(function (userSchema) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    
    var locationSchema = {
        latitude: Number,
        Longitude: Number
    };
    var userSchema = Schema({
        //userId:Int,
        name: String,
        status: String,
        //image:image,
        location : locationSchema,
        profile: {
            basicInfo: {
                firstname: String,
                lastname: String,
                gender: String,
                dob: Date,
                from: String,
                languages: [String]
            },
            education: {
                highschool: {
                    name: String,
                    started: String,
                    ended: String,
                    major: String
                },
                underGraduation: {
                    name: String,
                    started: String,
                    ended: String,
                    major: String
                },
                graduation: {
                    name: String,
                    started: String,
                    ended: String,
                    major: String
                },
                postGraduation: {
                    name: String,
                    started: String,
                    ended: String,
                    major: String
                }
            },
            work: [String],
            relationship: String,
            interests: [
                {
                    previous: String,
                    fromDate: Date,
                    ToDate: Date
                },
                {
                    current: String, 
                    fromDate: Date,
                    ToDate: Date
                }
            ]
        }
    });
})(module.exports);