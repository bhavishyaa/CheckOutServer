(function (userSchema) {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    userSchema.userSchema = Schema({
        userId: Number,
        name: String,
        status: String,
        //image:image,
        //location: Number,
        profile: {
            basicInfo: String,
            education: String,
            work: String,
            relationship: String,
            interests: String
        }
    });

})(module.exports);