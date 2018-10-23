function UserDao(connection) {
    this._connection = connection;
}

UserDao.prototype.save = function(entity,callback) {
    this._connection.query('INSERT INTO users SET ?', entity, callback);
}

UserDao.prototype.update = function(entity,callback) {
    this._connection.query('UPDATE users SET status = ? where id = ?', [entity.status, entity.id], callback);
}

UserDao.prototype.findAll = function(callback) {
    this._connection.query('select * from users',callback);
}

UserDao.prototype.findById = function (id,callback) {
    this._connection.query("select * from users where id = ?",[id],callback);
}

module.exports = function(){
    return UserDao;
};
