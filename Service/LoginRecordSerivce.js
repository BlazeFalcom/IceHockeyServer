var db = require('../Util/DBUtil');
var LoginRecordDao = require('../Dao/LoginRecordDao');
function AddRecord(loginRecord, resultfun) {
    db.connect();
    LoginRecordDao.Add(db, loginRecord, function (result){

        resultfun(result);
    })
}

module.exports = {
    AddRecord
}