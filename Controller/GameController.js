var ws = require('ws');
var config = require('../WebSocketconfig');
var iputil = require('../Util/GetIPUtil');
var server = new ws.Server({
    host: iputil.getIPAdress(),
    port: config.game_port
});
console.log("游戏服务器开启");
var connMap = new Map();
server.on('connection', function (conn) {
    conn.send("游戏服务器");
    conn.on('message', function (message) {
        message = message.toString('utf-8').toLocaleLowerCase();
        console.log(message);
        //将消息拆分，得到消息类型以及消息内容
        msgSplit(message, function(type, msg){
            //将消息交给消息处理器
            msghandle(type, msg);
        });
    });
    function msgSplit(message, resultfun){
        var messages =  message.split(':');
        if(messages.length == 1) {
            var type = "msg";
            var msg = messages[0];
        } else {
            var type = messages[0];
            var msg = messages[1];
        }
        resultfun(type, msg);
    }
    function msghandle(type, msg){
        switch(type) {
            case "id": setid(msg);break;
            case "username":setusername(msg);break;
            case "opponent":setopponent(msg);break;
            case "msg":sendmsg(msg);break;
            case "location":sendlocation(msg);break;
        }
    }


    function  setid(id) {
        conn.id = id;
        connMap.set(conn.id, conn);
    }
    function setusername(username) {
        conn.username = username;
    }
    function setopponent(oppid) {
        conn.oppid = oppid;
        if (connMap.has(conn.oppid)) {
            var oppconn = connMap.get(conn.oppid);
            oppconn.send("start:game");
            conn.send();
        }
    }
    function sendmsg(msg) {
        var oppconn = connMap.get(conn.oppid);
        oppconn.send(msg);
    }
    function sendlocation(location) {
        var oppconn = connMap.get(conn.oppid);
            oppconn.send("location:" + location);
    }

});