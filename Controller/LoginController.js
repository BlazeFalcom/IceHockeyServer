var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, res){
    var result = "";

    console.log(req.url);

    req.on('data', function (chunk){
       result += chunk;
       console.log("chunk:", chunk);
    });

    req.on('end', function (){
        result = querystring.parse(result);
        console.log("result:", result);

        if(result.username && result.password) {
            res.write(JSON.stringify(result));
        }
        res.end();
    })
}).listen(3000);