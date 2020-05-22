var UserClass = require('../Model/User');
var LoginRecordClass = require('../Model/LoginRecord');
var LoginRecordSerivce = require('../Service/LoginRecordSerivce');
var UserSerivce = require('../Service/UserSerivce');
var async = require('async');
var db = require('../Util/DBUtil')

var user = new UserClass.User("1223", "23", null, null);
console.log(user);

UserSerivce.Login(user, function(result) {
    console.log(result);
});




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




