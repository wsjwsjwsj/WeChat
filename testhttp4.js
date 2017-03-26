var http = require('http');
var server = http.createServer(function(req,res){
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  res.writeHead(404,{  //利用writeHead一次性写入回应报文的信息
     'abc':'123'
  });
  res.end('Hello');

});
server.listen(3001);