function Add(db, loginRecord, resultfun){
    var sql = "insert into login_record values(?, now())";
    var Params = [loginRecord.uid];
    db.connect();
    db.executeUpdate(sql, Params, function(result){
        resultfun(result);
    });
}

module.exports = {
    Add
}