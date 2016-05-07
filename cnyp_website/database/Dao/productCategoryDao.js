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

	}
};


module.exports.productCategoryDao = productCategoryDao;