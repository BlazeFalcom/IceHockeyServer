function Select(db,user,resultfun){
    var sql = "select count(*) from ban_record where email=?";
    var Params = [user.email];
    db.executeSelect(sql,Params, function(result){
        resultfun(result.length);
    });
}