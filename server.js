var ws = require('ws');
var server=new ws.Server({
    host: "192.168.1.6",
    port: 12000,
});
//初始位置
var initLocation=["X=500.000 Y=0.000 Z=150.000", "X=-500.000 Y=0.000 Z=150.000"];
let count=0;


//有客户端建立连接时调用
server.on('connection', function (conn) {
    //连接数加1
    count++
    console.log(count)
    console.log('client connected')
    //给用户添加唯一标识
    conn.id=`${count}`
    conn.send("InitLocation$"+initLocation[(count-1)%2])
    //收到客户端消息时调用
    conn.on('message', function (message) {
        var str=message.toString('utf-8').split("$");
        var messageType=str[0];
        var mss=str[1];
        console.log(messageType)
        console.log(mss)
        switch (messageType) {
            case "Location":
                server.clients.forEach(function (client) {
                    if(client.id!==conn.id){
                        client.send("Location$"+mss)
                    }
                })
                break
            case "HitBall":
                server.clients.forEach(function (client) {
                        client.send(message);
                })
                break
        }
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

