function Add(db, loginRecord, resultfun){
    var sql = "insert into login_record(email,login_time) values(?, now())";
    var Params = [loginRecord.email];
    db.executeUpdate(sql, Params, function(result){
        resultfun(result);
    });
}

function SelectAll(db, resultfun){
    var sql = "select * from login_record";
    db.executeSelect(sql, [], function(result){
        resultfun(result);
    })
}

function SelectByUser(db, loginRecord, resultfun) {
    var sql = "select * from login_record where email=? order by login_time desc";
    var Params = [loginRecord.email];
    db.executeSelect(sql, Params, function(result){
        resultfun(result);
    });
}

function UpdateLogout_time(db, loginRecord, resultfun) {
    var sql = "update login_record set logout_time=now(), game_duration=TIMESTAMPDIFF(MINUTE,login_time,now()) where lid=?";
    var Params = [loginRecord.lid];
    db.executeUpdate(sql, Params, function (result) {
        resultfun(result);
    });
}

module.exports = {
    Add,
    SelectAll,
    SelectByUser,
    UpdateLogout_time
}