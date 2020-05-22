var db = require('../Util/DBUtil');
var UserDao = require('../Dao/UserDao');
function Login(user, resultfun) {
    db.connect();
    UserDao.Login(db, user, function (result){
        if (result.length == 1) {
            resultfun(true, result[0]);
        } else {
            resultfun(false, result[0]);
        }
    });
}

module.exports = {
    Login
}

