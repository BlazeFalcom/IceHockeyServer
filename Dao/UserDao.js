function SelectLoginInfo(db, user, resultfun){
    var sql = "select email,password,name,sex,state,point from user where (email=? or name=?)";
    var Params = [user.email, user.name];
    db.executeSelect(sql,Params, function(result){
        resultfun(result);
    });
}

function Addpoint(db, user, resultfun) {
    var sql = "update user set point=? where email=?";
    var Params = [user.point, user.email];
    db.executeUpdate(sql, Params, function (result) {
        resultfun(result);
    })
}

function SetOnline(db, user, resultfun) {
    var sql = "update user set state='online',loginIP=? where (email=? or name=?)";
    var Params = [user.loginIP, user.email, user.name];
    db.executeUpdate(sql, Params, function (result) {
        resultfun(result);
    })
}

function  SetOffline(db, user, resultfun) {
    var sql = "update user set state='offline' where email=?";
    var Params = [user.email];
    db.executeUpdate(sql, Params, function (result) {
        resultfun(result);
    })
}
function InsertUserInfo(db, user, resultfun){
    var sql = "insert into user(email,password,name,sex,loginIP,state,point,register_time) values(?,?,?,?,?,'offline',0,now())";
    var Params = [user.email, user.password, user.name,user.sex,user.loginIP];
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

function SelectRank(db, resultfun){
    var sql = "select name,point from user order by point desc limit 0,100";
    db.executeSelect(sql, [], function(result){
        resultfun(result);
    });
}

module.exports = {
    SelectLoginInfo,
    InsertUserInfo,
    SelectByName,
    SelectRank,
    SetOnline,
    SetOffline,
    Addpoint
}