var connectionProvider = require('../mysqlConnectionStringProvider.js');

var productCategoryDao = {

	authenticateUser : function(userId,password,callback){
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		
		//console.log("userId here"+userId);

		var queryStatement = "Select * from cnyp_login where username=?";
		
		if(connection){
			connection.query(queryStatement,[userId], function(err, rows, fields){
				
				if(err){throw err;}

				console.log("rows "+rows);
				callback(rows);
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	},

	getUserById : function(userId,callback){
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

		//console.log('userId there'+userId);

		var queryStatement = "Select * from cnyp_login where id=?";

		if(connection){
			connection.query(queryStatement,[userId], function(err, rows, fields){
				
				if(err){throw err;}

				//console.log("rows "+rows);
				callback(rows);
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}

	},
    
    
    fetchUserProfile : function(userId,callback){
		var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
		var queryStatement = "Select * from cnyp_profiles where id=?";
		if(connection){
			connection.query(queryStatement,[userId], function(err, rows, fields){
				if(err){console.log(err);throw err;}
				callback(rows);
			});

			connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
		}
	},
    
    createProfile : function(userInformation, callback){
    
        var insertStatement = "Insert into cnyp_login SET?";
        
        var userInfo = {
            username : userInformation.username,
            password : userInformation.password  
        }

        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

        if(connection){
            connection.query(insertStatement,userInfo,function(err,result){
                if(err){console.log(err)}
                
                //console.log(result);
               
                var userID =  result.insertId;
                
                var insertProfileInfo = "Insert into cnyp_profiles SET?";
                    //console.log("userID "+userID);
                    var profileInfo = {
                        id : userID,
                        first_name : userInformation.firstName,
                        last_name : userInformation.lastName,
                        email_id : userInformation.emailID
                    }

                    if(connection){
                         connection.query(insertProfileInfo,profileInfo,function(err,result1){
                                if(err){console.log(err)}
                                //console.log(result1);
                                callback({status : 'Registration Successfull! Login to view your profile page.'});
                         });

                         connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
                    }      
            });
        }  
    }
};


module.exports.productCategoryDao = productCategoryDao;