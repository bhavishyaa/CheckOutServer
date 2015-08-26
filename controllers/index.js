(function (controllers) {
    
    var S_usersController = require("./S_usersController.js");
    var S_pictureController = require('./S_pictureController.js');
    
    controllers.init = function (app) {
        S_usersController.init(app);
        S_pictureController.init(app);
    };

})(module.exports);