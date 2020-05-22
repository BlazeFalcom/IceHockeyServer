function Add(db, loginRecord, resultfun){
    var sql = "insert into login_record(email,time) values(?, now())";
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

function SelectByUser(db, loginRecord) {
    var sql = "select * from login_record where email=?";
    var Params = [user.email];
    db.executeSelect(sql, [], function(result){
        resultfun(result);
    });
}

module.exports = {
    Add,
    SelectAll,
    SelectByUser
}