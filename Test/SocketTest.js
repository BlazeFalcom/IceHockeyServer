var ws = require('ws');
var client = new ws('ws://192.168.1.5:12003');
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