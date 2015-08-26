(function(auth) {

    auth.ensureAuthenticated = function(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send(401,"Not Authenticated");
        }
    };
    var S_registerController = require('./S_registerController.js');

    auth.init = function (app) {
        S_registerController.init(app);
    };

})(module.exports);