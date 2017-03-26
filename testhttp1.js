var http = require('http');
var server = http.createServer(function(req,res){
  console.log(req.method); //输出请求的方法
  console.log(req.url);  //输出请求的url
  console.log(req.headers);  //输出请求报文的头部信息
  res.end('Hello');

});
server.listen(3001);  // 服务器监听3001端口