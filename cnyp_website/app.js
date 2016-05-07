var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var productCategoryDao = require('./database/Dao/productCategoryDao.js');

var app = express();


passport.use(new LocalStrategy(function(username,password,done){
    //console.log('username'+username);  console.log('password'+password);
    productCategoryDao.productCategoryDao.authenticateUser(username,password,
                function(data){
                   
                     console.log("data "+data);
                     var user = data[0];
                        console.log("user + "+ user);
                        if (user === null || data == "") {
                            //console.log("Could not find any username "+data);
                            return done(null, false, {message: 'Invalid username or password'});
                        }else {
                           
                            // user = data.toJSON;
                           /* if (!bcrypt.compareSync(password,user.password)) {
                                return done(null, false, {message:'Invalid username or password'});
                            }else{
                                return done(null, user);
                            }*/
 
                            if(password === user.password){
                                //console.log("Found user with username "+user.username+" password= "+user.password);
                                return done(null, user);
                            }
                            else{
                                return done(null, false, {message:'Invalid username or password'});
                            }
                        }
                   
                });
   

    }));
    

passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function(id,done){
    //console.log("app.js -> user -> "+id);
    productCategoryDao.productCategoryDao.getUserById(id,
                function(data){
        done(null,data);
    }); 
});
console.log('__dirname ='+__dirname);
app.set('views', path.join(__dirname, 'views'));
//app.set('/partials/', path.join(__dirname, '/views/partials/'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret : 'secret strategic xxxzzz code', resave:true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
var router = require('./routes/routerConfig');
new router(app);


module.exports = app;