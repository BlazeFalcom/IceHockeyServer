var DBUtil = require('../Util/DBUtil');
var GameRecordDao = require('../Dao/GameRecordDao');

function showGameRecord(user, resultfun){
    var db = DBUtil.connect();
    GameRecordDao.SelectByUser(db, user, function (result) {
        resultfun(result);
    });
}

module.exports = {
    showGameRecord
}