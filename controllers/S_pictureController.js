(function (S_pictureController) {

    var services = require("../services");
    
    S_pictureController.init = function (app) {
        
        app.get("/api/picture/getDisplayPic", function (req, res) {
            //var userId = req.headers.userid;
            //ToDo: check for null
            //if (!userId) {
                //return res.status(401).send({ message : "UserId is not passed in headers" });
            //}
            //var picturereq = req;
            //res.headers = req.headers;
            
            var promise = services.getDisplayPic("55ec4fcff541b9a00965ace4");
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Not able to post user photo error: " + error);
            });

        });

        app.post("/api/picture/postisplayPic", function (req, res) {
            var userId = req.headers.userid;
            //ToDo: check for null
            if (!userId) {
                return res.status(401).send({ message : "UserId is not passed in headers" });
            }
            //var picturereq = req;
            //res.headers = req.headers;
            
            var promise = services.postDisplayPic(userId, req.body);
            promise.then(function (result) {
                res.send(result);
            }, function (error) {
                res.send("Not able to post user photo" + picturereq + "error: " + error);
            });

        });

        app.post("/api/user/userId/imagenew", function (req, res) {
            var userId = req.headers.userid;
            //ToDo: check for null
            if (!userId) {
                return res.status(401).send({ message : "UserId is not passed in headers" });
            }
            var picturereq = req;
            res.headers = req.headers;

            var promise = services.postUserPic(userId, picturereq);
            promise.then(function (result) {
                res.headers = { 'Content-Type': undefined };
                res.send(result);
            }, function (error) {
                res.send("Not able to post user photo" + picturereq + "error: " + error);
            });

        });
        
        app.get("/api/user/userId/getimage", function (req, res) {

            var promise = services.getUserPic();
            promise.then(function (result) {
                res.headers = { 'Content-Type': undefined };
                res.send(result);
            }, function (error) {
                res.send("Not able to get user photo" + "error: " + error);
            });
        });

    };
})(module.exports);
