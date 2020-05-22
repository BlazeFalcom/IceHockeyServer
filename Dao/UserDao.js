function Login(db, user, resultfun){
    var sql = "select * from user where uid=? and password=?";
    var Params = [user.uid, user.password];
    db.executeSelect(sql,Params, function(result){
        resultfun(result.length);
    });
}

function Register(db, user, resultfun) {
    var sql = "insert into user "
}
module.exports = {
    Login
}