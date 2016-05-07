var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var RestaurantData = mongoose.model('RestaurantData');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};

module.exports = function(passport) {

	router.get('/', function(req, res) {
		res.render('index', { message: req.flash('message') });
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));


	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'email' }
	));

	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
	);
	
	router.get('/data', isAuthenticated, function(req, res, next) {
	  RestaurantData.find({}, {_id: 0}, function(err, data){
	  	
	  	console.log(data);
	  	
	  if(err){ return next(err); }
	  	res.json(data);
	  });
	});

	return router;
};