function Add(db, gameRecord, resultfun){
    var sql = "insert into game_record(my_email,time) values(?,now())";
    var Params = [gameRecord.my_email];
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
function UpdateBygid(db,gameRecord,resultfun) {
    var sql = "update game_record set rival_email=?,winner=?,my_score=?,rival_score=? where gid=?";
    var Params = [gameRecord.rival_email,gameRecord.winner, gameRecord.my_score, gameRecord.rival_score, gameRecord.gid];
    db.executeUpdate(sql, Params, function (result) {
        resultfun(result);
    });
}
function SelectByUser(db, user, resultfun) {
    var sql = "select gid,date_format(time, '%Y-%m-%d %h:%i:%s') as time,my_score,rival_score, winner = my_email as iswin from game_record where my_email=? order by time desc";
    var Params = [user.email];
    db.executeSelect(sql, Params, function (result) {
        resultfun(result);
    });
}


module.exports = {
    Add,
    SelectAll,
    SelectByUser,
    UpdateBygid
}