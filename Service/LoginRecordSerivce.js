var db = require('../Util/DBUtil');
var LoginRecordDao = require('../Dao/LoginRecordDao');
function AddRecord(user, resultfun) {
    db.connect();
    LoginRecordDao.Add(db, loginRecord, function (result){
        db.close();
        resultfun(result);
    })
}

module.exports = {
    AddRecord
}