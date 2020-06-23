var ws = require('ws');
var UserClass = require('../Model/User');
var LoginRecordClass = require('../Model/LoginRecord');
var UserSerivce = require('../Service/UserSerivce');
var LoginRecordSerivce = require('../Service/LoginRecordSerivce');
var BanRecordSerivce = require('../Service/BanRecordService');
var config = require('../WebSocketconfig');
var iputil = require('../Util/GetIPUtil');
var server = new ws.Server({
    host: iputil.getIPAdress(),
    port: config.login_port
});
console.log("登录服务器开启成功");
server.on('connection', function (conn) {
    conn.state = "offline";
    conn.on('message', function (message) {
        /**
         * 打包后网页发送过来的为buffer对象，需要先转化为字符串。
         * 然后因为网页发送的属性名和在UE4中测试时不同，比如使用UE4测试时是username，打包后网页发送的是UserName，所以需要全部转换为小写（不是必要，但是有补全比较舒服）
         * 最后再转为JSON对象即可取属性值了
         */
        message = message.toString('utf-8').toLocaleLowerCase();
        console.log(message);
        msgSplit(message, function(type, msg){
            //将消息交给消息处理器
            msghandle(type, msg);
        });
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
        if(conn.state == "online") {
            logout();
        }
    });

    function msgSplit(message, resultfun){
        console.log(message);
        var messages =  message.split('#');
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
        switch(type) {
            case "login":login(msg);break;
            case "logout":logout();break;
        }
    }
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
                        console.log(Loginresult);
                        conn.send("success#" + JSON.stringify(Loginresult));
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
                        conn.send("fail#" + Loginresult);
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
