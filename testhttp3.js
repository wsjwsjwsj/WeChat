var http = require('http');
var server = http.createServer(function(req,res){
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  res.statusCode=404;  //设置回应报文的状态为404
  res.setHeader('abc','123');
  res.end('Hello');

});
server.listen(3001);