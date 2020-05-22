var http = require('http');
var url = require('url');
var util = require('util');
var user = require('./Model/User');
var async = require('async');
var db = require('./Util/DBUtil')
db.connect();
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
http.createServer(function(req, res){
    var params = url.parse(req.url, true).query;
    console.log(params.name);
    res.write("123");
    res.end();
}).listen(3000);