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

function Register(user, resultfun) {
    db.connect();
    UserDao.SelectByName(db, user.name, function (result) {
        if (result.length == 1) {
            resultfun(false, "昵称已存在")
        } else {
            UserDao.Register(db,user,function(result){
                if (result == 1) {
                    resultfun( true,"注册成功");
                } else {
                    resultfun(false, "该Email已注册过账号");
                }
            });
        }
    })
}

module.exports = {
    Login,
    Register
}

