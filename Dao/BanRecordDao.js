function Add(db, banRecord, resultfun){
    var sql = "insert into ban_record(email, start, end) values(?,?,?)";
    var Params = [banRecord.email, banRecord.start, banRecord.end];
    db.executeUpdate(sql, Params, function(result){
        resultfun(result);
    });
}

function SelectAll(db, resultfun){
    var sql = "select * from ban_record";
    db.executeSelect(sql, [], function(result){
        resultfun(result);
    })
}

function SelectByUser(db, user, resultfun) {
    var sql = "select * from ban_record where email=?";
    var Params = [user.email];
    db.executeSelect(sql, Params, function(result){
        resultfun(result);
    });
}

module.exports = {
    Add,
    SelectAll,
    SelectByUser
}