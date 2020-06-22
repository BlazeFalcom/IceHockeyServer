var http = require('http');
var url = require('url');
var fs = require('fs');
var app = http.createServer(function (req, res) {
        res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
        var urlstr = req.url;
        console.log(urlstr);
        if (urlstr === '/') {
            var file = "Socket.html";
        } else {
            var url_obj = url.parse(req.url);
            var file = url_obj.pathname;
            file = file.replace(/\//, '');
        }
        if (file != "favicon.ico") {
            console.log(file);
            res.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
            fs.readFile('D:\\IceHockey\\Html\\' + file, 'utf-8', function (err, data) {
                if (!err) {
                    res.write(data);
                    res.end();
                } else {
                    console.log(err);
                }
            })
        }
    }
);
app.listen(3000);