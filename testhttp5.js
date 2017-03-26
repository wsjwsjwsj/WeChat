var http = require('http');

var NEWS={
	1:'新闻一的内容',
    2:'新闻二的内容',
    3:'新闻三的内容'
}

function getNews(id){
	return NEWS[id] || '文章不存在';
}

var server = http.createServer(function(req,res){
	function send(html){         //定义一个返回信息的函数
	  res.writeHead(200,{
        'content-type':'text/html;charset=utf-8'
	  });
	  res.end(html);
	}

	if(req.url === '/'){          //根据url决定返回信息
      send('<ul>'+'<li><a href="/news?type=1&id=1">新闻一</a></li>'+'<li><a href="/news?type=1&id=2">新闻二</a></li>'+'<li><a href="/news?type=1&id=3">新闻三</a></li>'+'</ul>');

	}else if(req.url === '/news?type=1&id=1'){
        send(getNews(1));
	}else if(req.url === '/news?type=1&id=2'){
	    send(getNews(2));
	}else if(req.url === '/news?type=1&id=3'){
        send(getNews(3));
	}else{
	    send('<h1>文章不存在</h1>');
	}


});

server.listen(3001);