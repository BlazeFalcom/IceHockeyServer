var db = require('../Util/DBUtil');
var config = require('../DBconfig');
var user = require('../Model/User');
var dao = require('../Dao/UserDao');
db.connect();
var a = new user.User("1", "2", "3", "4", "5");
