var ws = require('ws');
var readline = require('readline');
var config = require('../WebSocketconfig');
var client = new ws('ws://' + config.host + ':' + config.register_port);
client.on('open', function open() {
    var emailobj = {"email":"1052369532@qq.com"};
    client.send(JSON.stringify(emailobj));
});//在连接创建完成后发送一条信息

client.on('message', function incoming(data) {
    console.log(data);
});










const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
rl.on('line',function(line) {
    var userinfo = {
        "username" : "1052369532@qq.com",
        "password" : "123456",
        "name"     : "芦雨锋",
        "sex"      : "男",
        "code"     : line
    };
    client.send(JSON.stringify(userinfo));
});
rl.on('close',function(){
    process.exit()
})
