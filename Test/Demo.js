var UserClass = require('../Model/User');
var LoginRecordClass = require('../Model/LoginRecord');
var LoginRecordSerivce = require('../Service/LoginRecordSerivce');
var UserSerivce = require('../Service/UserSerivce');
var BanRecordSerivce = require('../Service/BanRecordService');
var async = require('async');
var db = require('../Util/DBUtil')
var regex = require('../Util/Regex');
var Mail = require('../Util/MailUtil');

var user = new UserClass.User("1222", "23", "24", null);
// console.log(user);
//
// UserSerivce.Login(user, function(success ,result) {
//     if (success) {
//         console.log(result);
//     }
// });
//
// BanRecordSerivce.SelectRecordByUser(user, function (success,result) {
//     if(success) {
//         console.log("账号已被冻结");
//     } else {
//         console.log(result.email);
//         console.log("账号没有冻结");
//     }
// })

// UserSerivce.Register(user, function (success,message) {
//     console.log(message);
// })
// async.parallel([
//     function(callback) {
//         db.executeSelect('select * from account', [], function(result){
//             var result1 = result;
//             callback(null, result1);
//         });
//     },
//     function(callback) {
//         db.executeSelect('select * from account', [], function(result){
//             var result2 = result;
//             callback(null, result2);
//         });
//     }
// ],function(err, result){
//     console.log(result[0]);
// });


function b(resultfun) {
    a(function (str) {
        resultfun(str);
    });
}
function a(resultfun) {
    resultfun("123");
}
var c = b(function (str) {
    console.log(str);
});


