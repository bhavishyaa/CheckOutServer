(function (services) {
    
    var seedData = require("./seedData");
    var database = require("../database/mongoose");
    
    //Get Users
    services.getUsers = function (callback) {
        //callback(null, seedData.initialUsers);
        database.getUsers(function (results) {
            callback(results);
        });
    };
    
    //Get User
    services.getUser = function (userId, callback) {
        database.getUser(userId, function(results) {
            callback(results);
        });
    };
    
    function getUserDetail(userId) {
        var users = seedData.initialUsers;
        
        for (var i = 0; i < users.length; i++) {
            if (users[i].id.toString() === userId) {
                return users[i];
            }
            continue;
        }
        return null;
    }    ;
    
    //Post User
    services.postUser = function (user, next) {
        next(null, postUserToDb(user));
    };
    function postUserToDb(user) {
        database.saveUser(user);
    }    ;

})(module.exports);