var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'databaseName'
		});
}

module.exports = function() {
	return createDBConnection;
}
