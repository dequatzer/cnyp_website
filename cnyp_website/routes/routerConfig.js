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
		requestUrl : '/partials/:name',
		callbackFunction : function(req, res){
			var name = req.params.name;
			console.log("name "+name);
			if(name === 'profile')
			{
				
				if (!req.isAuthenticated()) {

				   //console.log("Not authenticated");
		           res.render('partials/'+name,{title : 'Profile', user:"Guest"});


		        }else{
		        	//console.log("Authenticated");
		            var user = req.user;
		            console.log(user[0].username);
		            console.log(user[0].password);
		            console.log(user[0].id);
		            
		            if (user !== undefined) {
		               // user = JSON.stringify(user);
		                
		            }
		          //res.json({userId : user[0].id});
		            res.render('partials/'+name, {title : 'Profile', userId:user[0].id});
		            
		        }

			}
			else{
				
				res.render('partials/'+name, {title : name, user : "Guest"});
			}

			//res.render('partials/'+name, {title : name, user : "Guest"});

			
		}
	});

	/*self.routeTable.push({
		requestType : 'get',
		requestUrl : '/profile',
		callbackFunction : function(req, res, next){
			//if(!req.isAuthenticated()){
				console.log('Calling the profile page');
				res.render('profile', {title:'Welcome'});
				console.log('Called the profile page');
			//}
			
		}
	});*/

	/*self.routeTable.push({
		requestType : 'get',
		requestUrl : '/login',
		callbackFunction : function(req, res){
			res.render('login', {title:'Welcome'});
		}
	});*/

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
							       console.log("err "+ err);
							       console.log("user "+ user);
							       console.log("info "+ info);
							      if(err){
							      		console.log('1');
							      		return res.send({status : "LOGIN_FAIL"});
							          //return res.render('partials/login',{title:'Sign In',errorMessage:err.message});
							      }
							      if (!user) {
							      	  console.log('2');
							      	  return res.send({status : "LOGIN_FAIL"});
							          //return res.render('partials/login',{data : "failure"} );
							          //return res.redirect('/');
							         
							      }
							      return req.logIn(user, function(err){
							          if (err) {
							          		console.log('3');
							          		return res.send({status : "LOGIN_FAIL"});
							              //return res.render('partials/login', {title:'Sign In', errorMessage:err.message});
							              
							          }else{
							          		console.log('4' + user.id);
							          		return res.send({status : "LOGIN_PASS", uid : user.id});
							              //return res.redirect('/partials/profile');

							              //return res.render('profile', {title:'Profile Page', errorMessage:err.message})
							          }
							      });
							    })(req,res,next);
							}
	});

}

module.exports = routerConfig;