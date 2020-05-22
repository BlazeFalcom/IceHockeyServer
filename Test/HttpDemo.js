var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
    var params = url.parse(req.url, true).query;
    console.log(params.name);
    res.write("123");
    res.end();
}).listen(3000);