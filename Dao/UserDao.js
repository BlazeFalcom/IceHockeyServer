function Login(db, user, resultfun){
    var sql = "select * from user where (email=? or name=?) and password=?";
    var Params = [user.email, user.name, user.password];
    db.executeSelect(sql,Params, function(result){
        resultfun(result);
    });
}



module.exports = {
    Login
}