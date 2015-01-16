(function (controllers) {
    
    var S_usersController = require("./S_usersController.js");
    
    controllers.init = function (app) {
        S_usersController.init(app);
    };

})(module.exports);