var http = require('http');
var server = http.createServer(function(req,res){
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  res.setHeader('abc','123'); //在之前的基础上设置了回应报文的头部信息
  res.end('Hello');

});
server.listen(3001);