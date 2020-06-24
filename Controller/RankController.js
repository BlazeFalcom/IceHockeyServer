var ws = require('ws');
var UserSerivce = require('../Service/UserSerivce');
var User = require('../Model/User');
var GameRecordService = require('../Service/GameRecordService');
var config = require('../WebSocketconfig');
var iputil = require('../Util/GetIPUtil');
var server = new ws.Server({
    host: iputil.getIPAdress(),
    port: config.rank_port
});
console.log("排名战绩服务器开启");
server.on('connection', function (conn) {
    conn.on('message', function (message) {
        message = message.toString('utf-8').toLocaleLowerCase();
        console.log(message);
        msgSplit(message, function(type, msg){
            //将消息交给消息处理器
            msghandle(type, msg);
        });
    });

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
    function msghandle(type, msg){
        switch (type) {
            case "showrank":showrank();break;
            case "game_record":showgame_record(msg);break;
        }
    }
    function showrank() {
        UserSerivce.ShowRank(function (result) {
            if (result.length > 0) {
                var str = JSON.stringify(result[0]);
                for (let i = 1; i < result.length; i++) {
                    str = str +"#"+JSON.stringify(result[i]);
                }
                conn.send(str);
            } else {
                conn.send("");
            }
        });
    }

    function showgame_record(email) {
        GameRecordService.showGameRecord(new User.User(email), function (result) {
            if (result.length > 0) {
                var str = JSON.stringify(result[0]);
                for (let i = 1; i < result.length; i++) {
                    str = str + "#" + JSON.stringify(result[i]);
                }
                conn.send(str);
            } else {
                conn.send("");
            }
        })
    }

});