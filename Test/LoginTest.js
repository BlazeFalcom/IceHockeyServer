var ws = require('ws');
var readline = require('readline');
var config = require('../WebSocketconfig');
var client = new ws('ws://' + config.host + ':' + config.login_port);
client.on('open', function open() {
    var userinfo = {
        "username" : "芦雨锋",
        "password" : "123456"
    };
    client.send("login#" + JSON.stringify(userinfo));
});//在连接创建完成后发送一条信息

client.on('message', function incoming(data) {
    console.log(data);
});

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
rl.on('line',function(line) {
    client.send(line);
});
rl.on('close',function(){
    process.exit()
})