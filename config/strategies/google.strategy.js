var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function () {
    
    passport.use(new GoogleStrategy({
        clientID: '238615315349-1c6c85sv5b9m2n4vjouqd7sfaktq8dpp.apps.googleusercontent.com',
        clientSecret: 'VXmJbSkbn3kte-W17tztjtys',
        callbackURL: 'http://localhost:1337/google/callback'
        //clientID: '822246465440-rbv8o8b5t465fupp0voesgfipapmdio1.apps.googleusercontent.com',
        //clientSecret: '2dXAnFE6ZxBPjxhI1MdSRfeF',
        /*callbackURL: 'http://localhost:1317/auth/google/callback' */
    },
        function (req, accessToken, refreshToken, profile, done) {
        var user = {};
        
        user.email = profile.emails[0].value;
        user.image = profile._json.image.url;
        user.displayName = profile.displayName;
        
        user.google = {};
        user.google.id = profile.id;
        user.google.token = accessToken;
        
        done(null, user);
    }
    ));


};