var ws = require('ws');
var UserSerivce = require('../Service/UserSerivce');
var server=new ws.Server({
    host: "192.168.1.5",
    port: "12003",
});

server.on('connection', function (conn) {
    conn.on('message', function (message) {
        console.log(message);
        if (message == "showrank") {
            UserSerivce.ShowRank(function (result) {
                conn.send(JSON.stringify(result));
            });
        }
    });
});