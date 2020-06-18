var db = require('../Util/DBUtil');
var LoginRecordDao = require('../Dao/LoginRecordDao');
function Login(loginRecord, resultfun) {
    db.connect();
    LoginRecordDao.Add(db, loginRecord, function (resultlen){
        if (resultlen == 1) {
            LoginRecordDao.SelectByUser(db, loginRecord, function (result) {
                if(result.length > 0) {
                    resultfun(true,result[0]);
                } else {
                    resultfun(false, "查询错误");
                }
            });
        } else {
            resultfun(false, "创建记录失败");
        }
    })
}
function Logout(loginRecord, resultfun){
    db.connect();
    LoginRecordDao.UpdateLogout_time(db, loginRecord, function (resultlen) {
        if(resultlen == 1) {
            resultfun(true);
        } else {
            resultfun(false);
        }
    });
}
module.exports = {
    Login,
    Logout
}