function Add(db, loginRecord, resultfun){
    var sql = "insert into login_record(email,time) values(?, now())";
    var Params = [loginRecord.email];
    db.connect();
    db.executeUpdate(sql, Params, function(result){
        resultfun(result);
    });
}

module.exports = {
    Add
}