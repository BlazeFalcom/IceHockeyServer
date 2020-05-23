var ws = require('ws');
var UserClass = require('../Model/User');
var LoginRecordClass = require('../Model/LoginRecord');
var UserSerivce = require('../Service/UserSerivce');
var LoginRecordSerivce = require('../Service/LoginRecordSerivce');
var BanRecordSerivce = require('../Service/BanRecordService');
var server=new ws.Server({
    host: "192.168.1.6",
    port: "12001",
});

server.on('connection', function (conn) {
    console.log("客户端连接成功")
    conn.on('message', function (message) {
        /**
         * 打包后网页发送过来的为buffer对象，需要先转化为字符串。
         * 然后因为网页发送的属性名和在UE4中测试时不同，比如使用UE4测试时是username，打包后网页发送的是UserName，所以需要全部转换为小写（不是必要，但是有补全比较舒服）
         * 最后再转为JSON对象即可取属性值了
         */
        var userjson = JSON.parse(message.toString('utf-8').toLocaleLowerCase());
        var regex = require('../Util/Regex');
        console.log(userjson);
        console.log(userjson.username);

        var user;
        if(regex.mail.test(userjson.username)){
            user = new UserClass.User(userjson.username, userjson.password, "", null);
        } else {
            user = new UserClass.User("", userjson.password, userjson.username, null);
        }
        UserSerivce.Login(user, function(success ,Loginresult) {
            if(success) {
                user = new UserClass.User( Loginresult.email,"", "", null);
                BanRecordSerivce.SelectRecordByUser(user, function (success, Banresult){
                    if(success) {
                        conn.send("账号已被冻结");
                    } else {
                        conn.send("登录成功");
                        var loginRecord = new LoginRecordClass.LoginRecord(null, Loginresult.email);
                        LoginRecordSerivce.AddRecord(loginRecord,function(result){
                            if(result > 0) {
                                console.log("登录记录成功");
                            } else {
                                console.log("登录记录失败");
                            }
                        });
                    }
                });
            } else {
                conn.send("登录失败");
            }
        })
    });
    //断开连接时调用
    conn.on("close", function() {
        console.log("客户端连接关闭");

    });

    // 发生错误时调用
    conn.on("error", function(err) {
        console.log("客户端连接出错", err);
    });
});
