"use strict";
const nodemailer = require("nodemailer");
async function sendmail(mail) {
    let testAccount = await nodemailer.createTestAccount();

    //随机生成6位验证码
    var ran = '';
    var str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (var i = 0; i < 6; i++) {
        ran = ran + str[Math.floor(Math.random() * 10)]
    }

    // 使用默认的SMTP传输创建可重用的传输器对象
    let transporter = nodemailer.createTransport({
        host: "smtp.exmail.qq.com",  //腾讯企业邮箱SMTP服务器
        port: 465,   //端口号
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'yuchuang@xs.wbu.edu.cn', // 邮箱
            pass: 'jzdKGEsZp7MBzEFn', // 授权码
        },
    });

    // 发送带有定义的传输对象的邮件
    let info = await transporter.sendMail({
        from: '"桌面冰球" <yuchuang@xs.wbu.edu.cn>', // 发送人邮箱
        to: mail, // 接受邮箱
        subject: "桌面冰球账号注册验证码", // 邮件主题
        text: "您好，您的验证码为（" + ran + "）, 10分钟内输入有效。", // 邮件文字内容
    });


    return ran;
}

module.exports = {
    sendmail
}