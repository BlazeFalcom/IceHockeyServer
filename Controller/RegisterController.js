var ws = require('ws');
var UserClass = require('../Model/User');
var LoginRecordClass = require('../Model/LoginRecord');
var UserSerivce = require('../Service/UserSerivce');
var LoginRecordSerivce = require('../Service/LoginRecordSerivce');
var BanRecordSerivce = require('../Service/BanRecordService');
var MailUitl = require('../Util/MailUitl');
var server=new ws.Server({
    host: "192.168.1.6",
    port: "12002",
});
server.on('connection', function (conn) {
    console.log("客户端连接成功");
    conn.ran = "";
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
        if (typeof(userjson.email) != "undefined") {
            var email = userjson.email;
            if(regex.mail.test(email)) {
                ran = MailUitl.sendmail(email);
                conn.send("邮件发送成功");
            } else {
                conn.send("邮件格式不正确");
            }
        } else {
            if(conn.ran == "") {
                conn.send("请先获取验证码");
            } else {
                if (ran == userjson.code) {
                    var user = new UserClass.User(userjson.username, userjson.password, userjson.name, null);
                    UserSerivce.Register(user,function (success, message) {
                        if(success) {
                            conn.send("注册成功");
                        } else {
                            conn.send(message);
                        }
                    })
                } else {
                    conn.send("验证码错误");
                }
            }
        }

        var user;
        if(regex.mail.test(userjson.username)){
            user = new UserClass.User(userjson.username, userjson.password, userjson.name, null);
        } else {
            user = new UserClass.User("", userjson.password, userjson.username, null);
        }

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
