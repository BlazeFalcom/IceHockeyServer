var ws = require('ws');
var RoomClass = require('../Model/Room');
var server=new ws.Server({
    host: "192.168.1.6",
    port: 12003,
});

var room = [];
let count = 0;

server.on("connection", function (coon) {
    count++;
    conn.id=`${count}`;
    conn.roomid = "";
    conn.on('message', function (message){
        var str=message.toString('utf-8').split(",");
        if (str[0] == "create"){
            var num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            var id = '';
            for (var i = 0; i < 5; i++) {
                id = id + str[Math.floor(Math.random() * 10)]
            }
            conn.roomid = id;
            conn.send(coon.roomid);
            CreateRoom(id, str[1], coon)
        } else if (str[0] == "join") {
            conn.roomid = str[2];
            JoinRoom(coon.roomid, coon)
        } else if (str[0] == "start") {
                StartGame(coon.roomid);
        }
    });



});


//创建房间
function CreateRoom(id, name, usercoon) {
    room[count] = new RoomClass(id, name, usercoon, null);
    count++;
}

//加入房间
function JoinRoom(id, usercoon) {
    for (var i = 0; i <= room.length; i++){
        if (room[i].id == id) {
            room[i].user2conn = usercoon;
        }
    }
}

//刷新房间
function RefreshRoom() {

}

//启动游戏
function StartGame() {
    for (var i = 0; i <= room.length; i++){
        if (room[i].id == id) {
            room[i].user1conn.send(12000);
            room[i].user2conn.send(12000)
        }
    }
}