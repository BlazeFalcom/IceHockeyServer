var ws = require('ws');
var config = require('../WebSocketconfig');
var iputil = require('../Util/GetIPUtil');
var server = new ws.Server({
    host: iputil.getIPAdress(),
    port: config.room_port
});
console.log("房间服务器开启");
var count = 0;
var roomMap = new Map();
server.on('connection', function (conn) {
    console.log("客户端连接成功");
    //对连接进行初始化
    initconn();
    //接收到消息是调用
    conn.on('message', function (message) {
        //将消息拆分，得到消息类型以及消息内容
        message = message.toString('utf-8').toLocaleLowerCase();
        console.log(message);
        msgSplit(message, function(type, msg){
           //将消息交给消息处理器
           msghandle(type, msg);
        });
    });
    //断开连接时调用
    conn.on("close", function() {
        console.log("客户端连接关闭");
        exitroom();
    });
    // 发生错误时调用
    conn.on("error", function(err) {
        console.log("客户端连接出错", err);
    });
    //初始化连接
    function initconn() {
        count+= 1;
        conn.id = `${count}`;
        conn.inroom = false;
        conn.send("id#" + conn.id);
    }
    //消息分割
    function msgSplit(message, resultfun){
        var messages =  message.split(':');
        if(messages.length == 1) {
            var type = messages[0];
            var msg = "";
        } else {
            var type = messages[0];
            var msg = messages[1];
        }
        resultfun(type, msg);
    }
    //消息处理器
    function msghandle(type, msg){
        console.log("type=" + type);
        console.log("msg=" + msg);
        switch(type) {
            case "username":setusername(msg);break;
            case "create":createroom(msg);break;
            case "showrooms": showrooms();break;
            case "join":joinroom(msg);break;
            case "exit":exitroom();break;
            case "ready":ready();break;
        }
    }
    //设置用户名
    function setusername(msg) {
        conn.username = msg;
    }
    //创建房间
    function createroom(msg) {
        if(conn.inroom) {
            conn.send("当前已经在房间了");
        }else{
            roomMap.set(conn.id + "-" +msg, new Set());
            roomMap.get(conn.id + "-" +msg).add(conn);
            conn.inroom = true;
            conn.roomid = conn.id + "-" +msg;
            conn.ready = false;
            conn.send("创建成功");
            sendroomusers();
        }
    }
    //查看所有房间
    function showrooms() {
        var roomkeys = roomMap.keys();
        var roomList = Array.from(roomkeys);
        if (roomList.length != 0) {
            var str = roomList[0];
            for (let i=1; i < roomList.length; i++) {
                str = str +","+roomList[i];
            }
            console.log(str);
            conn.send("rooms#"+str);
        } else {
            conn.send("noroom#");
        }
    }
    //加入房间
    function joinroom(id) {
        var room = roomMap.get(id);
        if (typeof(room) != "undefined") {
            if (room.size == 2 ) {
                conn.send("房间已满");
            } else if(room.has(conn)){
                conn.send("你已经在房间里了");
            } else {
                conn.inroom = true;
                conn.roomid = id;
                conn.ready = false;
                room.add(conn)
                conn.send("加入成功");
                sendroomusers();
            }
        } else {
            conn.send("房间不存在");
            showrooms();
        }
    }
    //退出房间
    function exitroom() {
        if (conn.inroom) {
            var room = roomMap.get(conn.roomid);
            conn.send("exit#room");
            room.delete(conn);
            if (room.size == 0) {
                roomMap.delete(conn.roomid);
                conn.inroom = false;
                conn.roomid = undefined;
                conn.ready = undefined;
            } else {
                sendroomusers();
                conn.inroom = false;
                conn.roomid = undefined;
                conn.ready = undefined;
            }
        } else {
            console.log("当前不在房间");
            conn.send("你当前不在房间");
        }
    }
    //准备
    function ready() {
        if (typeof(conn.ready) != "undefined") {
            if (conn.ready == false) {
                conn.ready = true;
                var room = roomMap.get(conn.roomid);
                var count = 0;
                for (let roomconn of room) {
                    if (roomconn.ready) count+=1;
                    roomconn.send(getroomusers());
                }
                if (count == 2) {
                    startgame(room);
                }
            }
        } else {
            conn.send("准备异常");
        }
    }
    //开始游戏
    function startgame(room) {
        var connlist = Array.from(room);
        for (let i=0; i < connlist.length; i++) {
            connlist[i].send("开始游戏");
            connlist[i].send("playerid#" + i);
        }
        connlist[0].send("opponent#" + connlist[1].id);
        connlist[1].send("opponent#" + connlist[0].id);
    }

    function getroomusers() {
        if (typeof(conn.roomid) != "undefined") {
            var room = roomMap.get(conn.roomid);
            var connlist = Array.from(room);
            var str = JSON.stringify({
                "username" : connlist[0].username,
                "state" : connlist[0].ready,
            });
            for (let i = 1; i < connlist.length; i++) {
                str = str + "#" + JSON.stringify({
                    "username" : connlist[i].username,
                    "state" : connlist[i].ready,
                });
            }
            return "roomusers#" + str;
        }
        return "";
    }

    function sendroomusers() {
        if (typeof(conn.roomid) != "undefined") {
            var room = roomMap.get(conn.roomid);
            for (let roomconn of room) {
                roomconn.send(getroomusers());
            }
        }
    }
});





