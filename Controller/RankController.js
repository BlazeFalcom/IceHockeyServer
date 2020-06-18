var ws = require('ws');
var UserSerivce = require('../Service/UserSerivce');
var config = require('../WebSocketconfig');
var server = new ws.Server({
    host: config.host,
    port: config.rank_port
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