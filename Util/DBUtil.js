var mysql = require('mysql')
var config = require('../DBconfig')
var connection;
function connect() {
    connection = mysql.createConnection(config);
    connection.connect(function(err){
            if(err){
                console.log("数据库连接失败");
            }else{
                console.log("数据库连接成功");
            }
    });

}

function close(){
    connection.end(function (err) {
        if (err) {
            console.log("数据库连接关闭失败");
        } else {
            console.log("数据库连接关闭成功");
        }
    });
}

function executeSelect(selectsql, selectSql_Params, resultfun){
    connection.query(selectsql, selectSql_Params, function(err,result) {
        if (err) {
            console.log('数据库查询失败' + err);
        } else {
            console.log('数据库查询成功');
            resultfun(result);
        }
    })
}

function executeUpdate(updateSql, undateSql_Params, Updatefun){
    connection.query(updateSql, undateSql_Params,function(err,result) {
        if (err) {
            console.log('数据库更新失败' + err);
        } else {
            console.log('数据库更新成功');
            Updatefun(result.affectedRows);
        }
    })
}

module.exports = {
    connect,
    executeSelect,
    executeUpdate,
    close
}