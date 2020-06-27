var ws = require('ws');
var config = require('../WebSocketconfig');
var iputil = require('../Util/GetIPUtil');
var GameRecordService = require('../Service/GameRecordService');
var UserService = require('../Service/UserSerivce');
var GameRecord = require('../Model/GameRecord');
var User = require('../Model/User');
var server = new ws.Server({
    host: config.host,
    port: config.game_port
});
console.log("游戏服务器开启");
var connMap = new Map();
server.on('connection', function (conn) {
    conn.send("游戏服务器");
    conn.on('message', function (message) {
        message = message.toString('utf-8').toLocaleLowerCase();
        //将消息拆分，得到消息类型以及消息内容
        msgSplit(message, function(type, msg){
            //将消息交给消息处理器
            msghandle(type, msg);
        });
    });
    function msgSplit(message, resultfun){
        var messages =  message.split(':');
        if(messages.length == 1) {
            messages = message.split('#');
            if (messages[0] == "hitball") {
                var type = messages[0];
                var balllocation = messages[1];
                var velocity = messages[2];
                var msg = balllocation + ":" + velocity;
            } else {
                var type = messages[0];
                var myscore = messages[1];
                var rivalscore = messages[2];
                var msg = [myscore, rivalscore];
            }
        } else {
            var type = messages[0];
            var msg = messages[1];
        }
        resultfun(type, msg);
    }
    function msghandle(type, msg){
        switch(type) {
            case "id": setid(msg);break;
            case "email":setemail(msg);break;
            case "opponent":setopponent(msg);break;
            case "hitball":sendhitball(msg);break;
            case "location":sendlocation(msg);break;
            case "score":updateRecord(msg);break;
            case "ball":sendball(msg);break;
            case "addpoint":addpoint(msg);break;
        }
    }


    function  setid(id) {
        conn.id = id;
        connMap.set(conn.id, conn);
    }
    function setemail(email) {
        conn.email = email;
        var gameRecord = new GameRecord.GameRecord(null, email,null,null,null,null,null);
        GameRecordService.Add(gameRecord, function (success) {
            if (success) {
                var user = new User.User(email);
                GameRecordService.showGameRecord(user, function(result){
                    conn.gid = result[0].gid;
                });
            }
        });
    }
    function setopponent(oppid) {
        conn.oppid = oppid;
    }
    function sendmsg(msg) {
        var oppconn = connMap.get(conn.oppid);
        oppconn.send(msg);
    }
    function sendlocation(location) {
        var oppconn = connMap.get(conn.oppid);
            if(typeof(oppconn) != "undefined") {
                oppconn.send("location:" + location);
            }
    }
    function sendhitball(msg) {
        var oppconn = connMap.get(conn.oppid);
        conn.send("hitball:" + msg);
        oppconn.send("hitball:" + msg);
    }
    function sendball(msg) {
        var oppconn = connMap.get(conn.oppid);
        oppconn.send("ball:" + msg);
    }
    function updateRecord(msg) {
        var oppconn = connMap.get(conn.oppid);
        if (msg[0] == 3) {
            var winner = conn.email;

        } else {
            var winner = oppconn.email;
        }
        var gameRecord = new GameRecord.GameRecord(conn.gid,null,oppconn.email,winner,msg[0],msg[1],null);
        GameRecordService.update(gameRecord, function (success) {
            if(success) {
            }
        })
    }
    function addpoint(point) {
        var point = parseInt(point);
        var user = new User.User(conn.email,null,null,null,null,point + 10, null);
        UserService.AddPoint(user, function (success) {
            if(success) {
            }
        })
    }
});