var db = require('../Util/DBUtil');
var UserDao = require('../Dao/UserDao');
function Login(user, resultfun) {
    db.connect();
    UserDao.Login(db, user, function (count){
        db.close();
        if (count == 1) {
            resultfun(true);
        } else {
            resultfun(false);
        }
    });
}

module.exports = {
    Login
}

