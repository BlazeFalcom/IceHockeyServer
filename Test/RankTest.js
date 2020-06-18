var ws = require('ws');
var config = require('../WebSocketconfig');
var client = new ws('ws://' + config.host + ':' + config.rank_port);
client.on('open', function open() {
    client.send("showrank");
});//在连接创建完成后发送一条信息

client.on('message', function (data) {
    console.log(data);
    var ranklist = JSON.parse(data);
    for (var rankinfo of  ranklist) {
        console.log(rankinfo.name + " " + rankinfo.point);
    }
})