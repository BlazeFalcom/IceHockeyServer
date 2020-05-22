var db = require('../Util/DBUtil');
var BanRecordDao = require('../Dao/BanRecordDao');
function AddRecord(banRecord, resultfun) {
    db.connect();
    BanRecordDao.Add(db, banRecord, function (result){
        resultfun(result);
    })
}

function SelectRecords(resultfun) {
    db.connect();
    BanRecordDao.SelectAll(db, function (data){
        resultfun(data);
    });
}

function SelectRecordByUser(user, resultfun){
    db.connect();
    BanRecordDao.SelectByUser(db, user,function (data){
        if (data.length>0) {
            resultfun(true,data[0]);
        } else {
            resultfun(false,data[0]);
        }
    });
}
module.exports = {
    AddRecord,
    SelectRecords,
    SelectRecordByUser
}