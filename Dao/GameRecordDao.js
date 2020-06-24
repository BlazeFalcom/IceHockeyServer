function Add(db, gameRecord, resultfun){
    var sql = "insert into game_record(my_email,rival_email,winner,my_score,rival_score,time) values(?,?,?,?,?,?)";
    var Params = [gameRecord.my_email, gameRecord.rival_email, gameRecord.winner, gameRecord.my_score, gameRecord.rival_score, gameRecord.time];
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

function SelectByUser(db, user, resultfun) {
    var sql = "SELECT u.name as myname, a. name as rivalname, g.my_score as myscore, g.rival_score as rival_score, g.time from user as u INNER JOIN user as a INNER JOIN game_record as g on u.email = g.my_email and g.rival_email = a.email where g.my_email=?";
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