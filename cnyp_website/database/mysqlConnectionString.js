var mysqlConnectionString = {

	connection : {

		dev : {
			host: '127.0.0.1',
			user : 'root',
			password : 'tcsaug13',
			database : 'cnyp_master'
		}
		,

		qa : {

			host: 'localhost',
			user : 'root',
			password : 'tcsaug13',
			database : 'cnyp_master'
		}
	}
};

module.exports.mysqlConnectionString = mysqlConnectionString;