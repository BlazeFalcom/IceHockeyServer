var http = require('http');
var url = require('url');
var fs = require('fs');
var app = http.createServer(function (req, res) {
    res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"});
    var urlstr = req.url;
    console.log(urlstr);
    var url_obj = url.parse(req.url);
    if(url_obj.pathname === '/'){
        res.writeHead(200,{"Content-Type":"text/html","Access-Control-Allow-Origin":"*"});
        fs.readFile('index.html','utf-8', function (err, data) {
            if(!err){
                res.write(data);
                res.end();
            }
        })
    }
    // 处理ajax请求
    if(url_obj.pathname === '/getdata'){
        res.write('hello world');
        res.end();
    }
});
app.listen(3000);