var ws = require('ws');
var config = require('../WebSocketconfig');
var server = new ws.Server({
    host: config.host,
    port: config.room_port
});

var count = 0;
var roomMap = new Map();
server.on('connection', function (conn) {
    console.log("客户端连接成功");
    //对连接进行初始化
    initconn();
    //接收到消息是调用
    conn.on('message', function (message) {
        //将消息拆分，得到消息类型以及消息内容
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
        conn.send("欢迎使用");
        conn.send("id:" + conn.id);
    }
    //消息分割
    function msgSplit(message, resultfun){
        var messages =  message.split(':');
        var type = messages[0];
        var msg = messages[1];
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
        }
    }
    //查看所有房间
    function showrooms() {
        var roomkeys = roomMap.keys();
        var roomList = Array.from(roomkeys);
        var jsonstr = JSON.stringify(roomList);
        conn.send(jsonstr);
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
                for (let roomconn of room) {
                    roomconn.send(conn.username + "加入房间");
                }
            }
        } else {
            conn.send("房间不存在");
        }
    }
    //退出房间
    function exitroom() {
        if (conn.inroom) {
            var room = roomMap.get(conn.roomid);
            if(room.delete(conn)){
                if (room.size == 0) {
                    roomMap.delete(conn.roomid);
                } else {
                    for (let roomconn of room) {
                        roomconn.send(conn.username + "退出房间");
                    }
                }
                conn.inroom = false;
                conn.roomid = undefined;
                conn.ready = undefined;
                conn.send("退出成功");
            }
        } else {
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
                    roomconn.send(conn.username + "准备好了");
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
        for (let con of connlist) {
            con.send("开始游戏");
        }
        connlist[0].send("opponent:" + connlist[1].id);
        connlist[1].send("opponent:" + connlist[0].id);
    }
});





