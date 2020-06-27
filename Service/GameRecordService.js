var db = require('../Util/DBUtil');
var GameRecordDao = require('../Dao/GameRecordDao');

function showGameRecord(user, resultfun){
    db.connect();
    GameRecordDao.SelectByUser(db, user, function (result) {
        resultfun(result);
    });
}

function Add(gamerecord, resultfun) {
    db.connect();
    GameRecordDao.Add(db, gamerecord, function (length) {
        if (length > 0) {
            resultfun(true);
        } else {
            resultfun(false);
        }
    })
}

function update(gamerecord, resultfun) {
    db.connect();
    GameRecordDao.UpdateBygid(db, gamerecord, function (length) {
        if (length > 0) {
            resultfun(true);
        } else {
            resultfun(false);
        }
    })
}
module.exports = {
    showGameRecord,
    Add,
    update
}