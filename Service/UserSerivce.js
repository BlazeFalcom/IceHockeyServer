var db = require('../Util/DBUtil');
var UserDao = require('../Dao/UserDao');
function Login(user, resultfun) {
    db.connect();
    UserDao.SelectLoginInfo(db, user, function (result){
        if (result.length == 1) {
            if (result[0].password == user.password) {
                if (result[0].state == "online") {
                    resultfun(false, "用户已登录");
                } else {
                    UserDao.SetOnline(db, user, function (resultlen) {
                        if (resultlen == 1) {
                            resultfun(true, result[0]);
                        } else {
                            resultfun(false, "登录失败,请尝试重新登录");
                        }
                    });
                }
            } else {
                resultfun(false, "密码错误");
            }
        } else {
            resultfun(false, "用户不存在");
        }
    });
}


function  Logout(user, resultfun) {
    db.connect();
    UserDao.SetOffline(db ,user, function (resultlen) {
        if(resultlen == 1) {
            resultfun(true);
        } else {
            resultfun(false);
        }
    });
}
function Register(user, resultfun) {
    db.connect();
    UserDao.SelectByName(db, user.name, function (result) {
        if (result.length == 1) {
            resultfun(false, "昵称已存在")
        } else {
            UserDao.InsertUserInfo(db,user,function(result){
                if (result == 1) {
                    resultfun( true,"注册成功");
                } else {
                    resultfun(false, "该Email已注册过账号");
                }
            });
        }
    })
}

function  AddPoint(user, resultfun) {
    db.connect();
    UserDao.Addpoint(db, user, function (length) {
        if (length > 0) {
            resultfun(true);
        } else {
            resultfun(false);
        }
    })
}

function ShowRank(resultfun) {
    db.connect();
    UserDao.SelectRank(db,resultfun);
}
module.exports = {
    Login,
    Register,
    ShowRank,
    Logout,
    AddPoint
}

