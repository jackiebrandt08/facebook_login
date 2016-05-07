var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');
var fbConfig = require('../fb.js');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
        callbackURL     : fbConfig.callbackUrl,

        profileFields	: ['emails', 'first_name', 'last_name']
    },

    function(access_token, refresh_token, profile, done) {
		
    	console.log('profile', profile);

		process.nextTick(function() {

	        User.findOne({ 'id' : profile.id }, function(err, user) {

	            if (err)
	                return done(err);

	            if (user) {
	                return done(null, user);
	            } else {
	                var newUser = new User();

	                newUser.id = profile.id; // set the users facebook id	                
	                newUser.access_token = access_token; // we will save the token that facebook provides to the user	                
	                newUser.firstName  = profile.name.givenName;
	                newUser.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
	                newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

	                newUser.save(function(err) {
	                    if (err)
	                        throw err;

	                    return done(null, newUser);
	                });
	            }

	        });
        });

    }));

};