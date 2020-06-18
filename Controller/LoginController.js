var ws = require('ws');
var UserClass = require('../Model/User');
var LoginRecordClass = require('../Model/LoginRecord');
var UserSerivce = require('../Service/UserSerivce');
var LoginRecordSerivce = require('../Service/LoginRecordSerivce');
var BanRecordSerivce = require('../Service/BanRecordService');
var config = require('../WebSocketconfig');
var server = new ws.Server({
    host: config.host,
    port: config.login_port
});

server.on('connection', function (conn) {
    conn.state = "offline";
    conn.send("success#" + JSON.stringify({
        "username": "luyufeng"
    }));
    conn.on('message', function (message) {
        /**
         * 打包后网页发送过来的为buffer对象，需要先转化为字符串。
         * 然后因为网页发送的属性名和在UE4中测试时不同，比如使用UE4测试时是username，打包后网页发送的是UserName，所以需要全部转换为小写（不是必要，但是有补全比较舒服）
         * 最后再转为JSON对象即可取属性值了
         */
        console.log(message);
        var msgs = message.split("#");
        if (msgs.length > 1) {
             var type = msgs[0];
             var msg = msgs[1];
             switch(type) {
                 case "login":login(msg);break;
                 case "logout":logout();break;
             }
        }

    });
    //断开连接时调用
    conn.on("close", function() {
        console.log("客户端连接关闭");
        if(conn.state == "online") {
            logout();
        }
    });
    // 发生错误时调用
    conn.on("error", function(err) {
        console.log("客户端连接出错", err);
    });


    function  login(msg) {
        var userjson = JSON.parse(msg.toString('utf-8').toLocaleLowerCase());
        var regex = require('../Util/Regex');
        var user;
        if(regex.mail.test(userjson.username)){
            user = new UserClass.User(userjson.username, userjson.password, "", "", conn._socket.remoteAddress);
        } else {
            user = new UserClass.User("", userjson.password, userjson.username, "", conn._socket.remoteAddress);
        }
        BanRecordSerivce.SelectRecordByUser(user, function (success, Banresult) {
            if(success) {
                conn.send("账号已被冻结");
            } else {
                UserSerivce.Login(user, function(success ,Loginresult) {
                    if (success) {
                        conn.send("登录成功");
                        var loginRecord = new LoginRecordClass.LoginRecord(null, Loginresult.email);
                        LoginRecordSerivce.Login(loginRecord,function(success, result){
                            if(success) {
                                console.log("登录记录成功");
                                conn.lid = result.lid;
                                conn.state = "online";
                                conn.username = result.email;
                            } else {
                                console.log(result);
                            }
                        });
                    } else {
                        conn.send(Loginresult);
                    }
                });
            }
        });
    }
    
    function logout() {
        if (typeof(conn.lid) != "undefined" && typeof(conn.username) != "undefined") {
            var user = new UserClass.User(conn.username);
            UserSerivce.Logout(user, function (success) {
                if (success) {
                    var loginRecord = new LoginRecordClass.LoginRecord(conn.lid);
                    console.log(loginRecord);
                    LoginRecordSerivce.Logout(loginRecord,function (success) {
                        if (success) {
                            conn.state = "offline";
                            conn.send("退出登录");
                        }
                    });
                }
            })
        }
    }
});
