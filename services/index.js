(function (services) {
    
    var database = require("../database/mongoose");
    var q = require('q');
    
    //Get User based on username
    services.isUsernameAlreadyInUse = function (username) {
        
        var defer = q.defer();
        var promise = database.isUsernameAlreadyInUse(username);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;

    };
    //Register User
    services.registerUser = function (user) {
        
        var defer = q.defer();
        var promise = database.registerUser(user);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.resolve(error);
        });
        return defer.promise;

    };
    
    //Get User based on username
    services.getUserUsingUsername = function (username) {
        
        var defer = q.defer();
        var promise = database.getUserUsingUsername(username);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;

    };
    
    services.getUserUsingUserId = function (userId) {
        
        var defer = q.defer();
        var promise = database.getUserUsingUserId(userId);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;

    };
    
    services.socialRegister = function (user) {
        
        var defer = q.defer();
        var promise = database.socialRegister(user);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;

    };
    
    
    
    //Get Users based on location
    services.getUsers = function (location, userId) {
        
        var defer = q.defer();
        var promise = database.getUsers(location, userId);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
        
    };
    
    //Get User based on userId
    services.getUser = function (userId) {
        
        var defer = q.defer();
        var promise = database.getUserUsingUserId(userId);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
        
    };
    
    //Post User
    services.postUser = function (user) {
        
        var defer = q.defer();
        var promise = database.saveUser(user);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
        
    };
    
    //Update user current location
    services.updateUserLocation = function (userId, location) {
        
        var defer = q.defer();
        var promise = database.updateUserLocation(userId, location);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;

    };
    
    //Get user current Profile
    
    services.getUserProfile = function (userId) {
        
        var defer = q.defer();
        var promise = database.getUserProfile(userId);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;

    };
    //Update user current Profile
    services.updateUserProfile = function (userId, profile) {
        
        var defer = q.defer();
        var promise = database.updateUserProfile(userId, profile);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;

    };
    
    //Get user pic
    services.getUserPic = function (config) {
        
        var defer = q.defer();
        var promise = database.getUserPic(config);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
        
    };
    
    //Post User pic
    services.postUserPic = function (userId, req) {
        
        var defer = q.defer();
        var promise = database.postUserPic(userId, req);
        promise.then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;

    };
    

})(module.exports);