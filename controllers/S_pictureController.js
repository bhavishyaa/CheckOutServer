(function (S_pictureController) {

    var services = require("../services");
    
    S_pictureController.init = function (app) {
        
        app.post("/api/user/userId/imagenew", function (req, res) {
            var picturereq = req;
            services.postUserPic(picturereq, function (err, results) {
                res.send(results);
            });
        });
        
        app.get("/api/user/userId/getimage", function (req, res) {
            function servicecallback(results) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(results, 'binary');
            }
            services.getUserPic(servicecallback);
        });

    };
})(module.exports);