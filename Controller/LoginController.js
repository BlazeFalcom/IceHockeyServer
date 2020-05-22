var ws = require('ws');
var server=new ws.Server({
    host: "192.168.1.6",
    port: "12001",
});

server.on('connection', function (conn) {

    conn.on('message', function (message) {
        console.log(message);
    });
    //断开连接时调用
    conn.on("close", function() {
        console.log("client close");
    });

    // 发生错误时调用
    conn.on("error", function(err) {
        console.log("client error", err);
    });
});