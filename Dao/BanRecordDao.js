function Add(db, banRecord, resultfun){
    var sql = "insert into game_record(email, start, end) values(?,?,?)";
    var Params = [banRecord.email, banRecord.start, banRecord.end];
    db.executeUpdate(sql, Params, function(result){
        resultfun(result);
    });
}

function SelectAll(db, resultfun){
    var sql = "select * from game_record";
    db.executeSelect(sql, [], function(result){
        resultfun(result);
    })
}

function SelectByUser(db, user) {
    var sql = "select * from game_record where my_email=?";
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