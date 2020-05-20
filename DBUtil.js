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

function executeselect(selectsql){
    var results;
    connection.query(selectsql, function(err,result) {
        if (err) {
            console.log('查询失败');
        } else {
            console.log('查询成功');
            results = JSON.stringify(result);
            console.log(results);
        }
    })
    console.log(results);
    return results;
}

function executeinsert(insertsql, insertsql_Params){
    var myresults = "";
    connection.query(insertsql,insertsql_Params,function(err,result){
        if(err){
            console.log('插入失败' + err);
            return;
        }
        console.log('插入成功');
        myresults = JSON.stringify(result);
    })
    return myresults;
}

function executeupdate(updateSql, undateSql_Params){
    var myresults;
    connection.query(updateSql,undateSql_Params,function(err,result){
        if(err){
            console.log('更新失败' + err);
            return;
        }
        console.log('更新成功');
        myresults = JSON.stringify(result);
    })
    return myresults;
}



module.exports = {
    connect,
    executeselect,
    executeinsert,
    close
}