var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function routerConfig(app){
	this.app = app;
	this.routeTable = [];
	this.init();
}

routerConfig.prototype.init = function(){
	var self = this;
	this.addRoutes();
	this.processRoutes();
}

routerConfig.prototype.processRoutes = function(){
	var self = this;
	self.routeTable.forEach(function(route){
		if(route.requestType == 'get'){
			self.app.get(route.requestUrl,route.callbackFunction);
		}
		else if(route.requestType == 'post') {
			self.app.post(route.requestUrl,route.callbackFunction);
		}
		//elseif (route.requestType == 'delete'){}
	});
}

routerConfig.prototype.addRoutes = function(){
	var self = this;

	self.routeTable.push({
		requestType : 'get',
		requestUrl : '/',
		callbackFunction : function(req, res, next){
			res.render('layout', {title:'Welcome'});
		}
	});

	self.routeTable.push({
		requestType : 'get',
		requestUrl : '/login',
		callbackFunction : function(req, res, next){
			res.render('layout', {title:'Welcome'});
		}
	});
    
    self.routeTable.push({
		requestType : 'get',
		requestUrl : '/about',
		callbackFunction : function(req, res, next){
			res.render('layout', {title:'Welcome'});
		}
	});
    
    self.routeTable.push({
		requestType : 'get',
		requestUrl : '/events',
		callbackFunction : function(req, res, next){
			res.render('layout', {title:'Welcome'});
		}
	});
    
    self.routeTable.push({
		requestType : 'get',
		requestUrl : '/gallery',
		callbackFunction : function(req, res, next){
			res.render('layout', {title:'Welcome'});
		}
	});
    
     self.routeTable.push({
		requestType : 'get',
		requestUrl : '/contact',
		callbackFunction : function(req, res, next){
			res.render('layout', {title:'Welcome'});
		}
	});

	self.routeTable.push({
		requestType : 'get',
		requestUrl : '/profile',
		callbackFunction : function(req, res, next){
			res.render('layout', {title:'Welcome'});
		}
	});


	self.routeTable.push({
		requestType : 'get',
		requestUrl : '/partials/:name',
		callbackFunction : function(req, res){
			var name = req.params.name;
			
			if(name === 'profile')
			{	
				if (!req.isAuthenticated()) {
	  
		           res.render('partials/'+name,{title : 'Profile', user:"Guest"});
				   
		        }else{
		        	
		            var user = req.user;
		            
		            if (user !== undefined) {
		                   
		            } 
		            res.render('partials/'+name, {title : 'Profile', userId:user[0].id});
		        }
			}
			else{
				
				res.render('partials/'+name, {title : name, user : "Guest"});
			}			
		}
	});

	self.routeTable.push({
		requestType : 'post',
		requestUrl : '/authenticateUser',
		callbackFunction : function(req, res, next) {
            passport.authenticate('local',
            { successRedirect: '/partials/profile',
              failureRedirect : '/partials/login',
              failureFlash : true
            },
            function (err, user, info) {
               
              if(err){
                  return res.send({status : "LOGIN_FAIL"});
              }
              if (!user) {
                  return res.send({status : "LOGIN_FAIL"});
              }
              return req.logIn(user, function(err){
                  if (err) {
                        return res.send({status : "LOGIN_FAIL"});
                  }else{
                        return res.send({status : "LOGIN_PASS", uid : user.id});
                  }
              });
            })(req,res,next);
        }
	});
    
    self.routeTable.push({
		requestType : 'post',
		requestUrl : '/createProfile',
		callbackFunction : function(req, res){
			
			//console.log("req >>"+req.productCategory.categoryName);
			//console.log("req >>"+req.body);
			var cnypMasterDao = require('../database/Dao/cnypMasterDao.js');
			
			cnypMasterDao.cnypMasterDao.createProfile(req.body,function(status){
				res.json(status);
				//console.log(status);
			});
		}
	});
  
    
    self.routeTable.push({
		requestType : 'get',
		requestUrl : '/fetchUserProfile/:userId',
		callbackFunction : function(req, res){
			var cnypMasterDao = require('../database/Dao/cnypMasterDao.js');
			cnypMasterDao.cnypMasterDao.fetchUserProfile(req.params.userId,
				function(profileInfo){
					console.log("ProfileInfo"+profileInfo[0].first_name);
					res.json({profileInfo : profileInfo});
				});
		}
	});

}

module.exports = routerConfig;