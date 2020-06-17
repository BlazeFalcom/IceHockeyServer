function Login(db, user, resultfun){
    var sql = "select * from user where (email=? or name=?) and password=?";
    var Params = [user.email, user.name, user.password];
    db.executeSelect(sql,Params, function(result){
        resultfun(result);
    });
}

function Register(db, user, resultfun){
    var sql = "insert into user values(?,?,?,0)";
    var Params = [user.email, user.password, user.name, user.point];
    db.executeUpdate(sql, Params, function (result) {
        console.log(result);
        resultfun(result);
    })
}

function SelectByName(db, name, resultfun) {
    var sql = "select * from user where name=?";
    var Params = [name];
    db.executeSelect(sql, Params, function(result){
        resultfun(result);
    });
}

function ShowRank(db, resultfun){
    var sql = "select name,point from user order by point desc limit 0,100";
    db.executeSelect(sql, [], function(result){
        resultfun(result);
    });
}

module.exports = {
    Login,
    Register,
    SelectByName,
    ShowRank
}