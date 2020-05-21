var mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'lyf1999102',
    port     : '3306',
    database : 'bank'
});

function connect() {
    connection.connect(function(err){
        if(err){
            console.log("连接失败");
        }else{
            console.log("连接成功");
        }
    });
}

function close(){
    connection.end(function(err){
        if(err){
            console.log("连接关闭失败");
        }else{
            console.log("连接关闭成功");
        }
    });
}

function executeSelect(selectsql, resultfun){
    connection.query(selectsql, function(err,result) {
        if (err) {
            console.log('查询失败');
        } else {
            console.log('查询成功');
            resultfun(result);
        }
    })
}

function executeUpdate(updateSql, undateSql_Params, Updatefun){
    connection.query(updateSql, undateSql_Params,function(err,result) {
        if (err) {
            console.log('更新失败');
        } else {
            console.log('更新成功');
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