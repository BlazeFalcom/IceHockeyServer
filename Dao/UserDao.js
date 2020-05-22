function Login(db, user, resultfun){
    var sql = "select * from user where email=? and password=?";
    var Params = [user.email, user.password];
    db.executeSelect(sql,Params, function(result){
        resultfun(result.length);
    });
}



module.exports = {
    Login
}