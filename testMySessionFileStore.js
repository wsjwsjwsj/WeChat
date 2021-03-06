var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var MyFileStore = require('./my-session-file-store')(session);         //自定义存储session到文件的引擎

var app = express();

app.use(session({              //挂载session,所有的路由都可以访问到session
	secret: 'hhh',       //一个String类型的字符串，作为服务器端生成session的签名
	store: new MyFileStore("./my-sessions"),       
	saveUninitialized: true         //初始化时将session保存到存储
}));

app.use(function(req,res,next){       //定义中间件，每次请求都要执行
	var views = req.session.views;      //定义views属性保存访问次数
	if(!views){                         //初始化views属性
		views = req.session.views = {};
	}              
	var pathname = parseurl(req).pathname;       //获取路径
	views[pathname] = (views[pathname] || 0) + 1;      //更新相应路径访问次数
	next();
});

app.get('/foo',function(req,res,next){          //发送session中保存的相应路径的访问次数views
	res.send('you viewd this page' + req.session.views['/foo'] + ' times');
});

app.get('/bar',function(req,res,next){
	res.send('you viewd this page' + req.session.views['/bar'] + ' times');
});

app.listen(3000);
