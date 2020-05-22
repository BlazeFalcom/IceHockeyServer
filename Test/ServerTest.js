var ws = require('ws');
var server=new ws.Server({
    host: "192.168.1.6",
    port: 12248,
});
server.on('connection',function (conn) {
    conn.on('message',function (message) {
        console.log(message.toString());
        conn.send("服务器：发送消息");
    });
    //断开连接时调用
    conn.on("close", function() {
        console.log("连接关闭");

    });

    // 发生错误时调用
    conn.on("error", function(err) {
        console.log("连接错误", err);
    });
})