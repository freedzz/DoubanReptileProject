/* 引入express框架 */
var express = require("express");
/* 初始化express */
var app = express();

var fs = require('fs')

/* 视图引擎 */
app.set("view engine", "ejs");

/* 访问静态资源文件 */
app.use("/public", express.static("static"))

// //设置静态文件访问
// const path = require('path')
// //设置服务器访问静态文件
// app.use(express.static(path.join(__dirname,'static')))

//引入数据库
const mongoose = require('mongoose');

//连接数据库
// var url = 'mongodb://localhost:27017/movies';
// mongoose.connect(url)
// 	.then(() => {
// 		console.log("mongodb connected....");
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	})

//引入数据模型
//可以在当前页面使用movie来进行数据库操作
/* 你要使用哪个数据模块就引入哪个模块 */
require("./models/2019movies");
const Movies = mongoose.model('2019Movies');

/* 根路由 */
app.get('/', (req, res) => {

	res.render('index.ejs')

});
/* 路由1 */
app.get('/Module1', (req, res) => {

	var score //保存数据
	res.set("Access-Control-Allow-Origin",'*');
	//得到保存的数据
	fs.readFile('./data/Module1.json', function(err, data) {
		if (err) throw err;
		score = JSON.parse(data)
		//console.log(score)

		/* 把数据传到前端页面 */
		res.write(JSON.stringify(score));
		res.end("");

	});

});
/* 路由2 */
app.get('/Module2', (req, res) => {

	var score //保存数据
res.set("Access-Control-Allow-Origin",'*');
	//得到保存的数据
	fs.readFile('./data/Module2.json', function(err, data) {
		if (err) throw err;
		score = JSON.parse(data)
		//console.log(score)

		/* 把数据传到前端页面 */
		res.write(JSON.stringify(score));
		res.end("");

	});

});
/* 路由3 */
app.get('/Module3',(req, res) => {
	
	res.set("Access-Control-Allow-Origin",'*')
	fs.readFile('./data/Module3.json', function(err, data) {
		if (err) {
			console.log('失败')
		}
		let flag = JSON.parse(data)
		res.write(JSON.stringify(flag));
		res.end("");
	})
})
/* 路由4 */
app.get('/Module4', (req, res) => {
res.set("Access-Control-Allow-Origin",'*');
	var count //保存数据

	//得到保存的数据
	fs.readFile('./data/Module4.json', function(err, data) {
		if (err) throw err;
		count = JSON.parse(data)
		//console.log(score)

		/* 把数据传到前端页面 */
		res.write(JSON.stringify(count));
		res.end("");

	});

});
/* 路由5 */
app.get('/Module5', function(req, res) {
	res.set("Access-Control-Allow-Origin",'*');
	fs.readFile('./data/Module5.json', 'utf-8', function(err, data) {
		if (err) throw err;
		let filedata = JSON.parse(data)
		res.write(JSON.stringify(filedata));
		res.end("");
	})
})
/* 路由6 */
app.get('/Module6', (req, res) => {
res.set("Access-Control-Allow-Origin",'*');
	fs.readFile("./data/Module6.json", function(err, data) {
		if (err) throw err
		data = JSON.parse(data)

		res.write(JSON.stringify(data));
		res.end('');
	});
});
/* 路由7 */
app.get('/Module7', (req, res) => {
res.set("Access-Control-Allow-Origin",'*');
	fs.readFile("./data/Module7.json", function(err, data) {
		if (err) throw err
		data = JSON.parse(data)

		res.write(JSON.stringify(data));
		res.end('');
	});
});

app.listen(8080, function() {
	console.log("http://127.0.0.1:8080")
})


// getMoviesName()


function getMoviesName(){
	Movies.find({
		'MovieScore': {
			'$gt':0,
			'$lte': 2.0
		}
	})
	.then(data =>{
		//console.log(data)
		let arr = []
		let res = {
				"name":"3.2-3.5",
				"children":[
					
				]
			}
		console.log(data)
		for(let i=0;i<data.length;i++){
			arr.push(data[i].MovieName) 
			let test = {
					"name":data[i].MovieName,
					"value":data[i].MovieScore
			}
			res.children.push(test)	
		}
		
		fs.readFile('./data/test.json',function(err,data){
			if(err) throw err;
			data = JSON.parse(data);
			data.push(res)
			data = JSON.stringify(data)
			fs.writeFile('./data/test.json',data,function(err){
			if(err) throw err;
		})
		})
	})
	
}

function getCountryScore() {

	var score = []

	let i = 9.5;
	let j = 10;
	let flag = 0
	var timer = setInterval(function() {
		/* 取得每个区间的数量 */
		AllMovies.find({
				'MovieScore': {
					'$gte': i,
					'$lte': j
				},
				'MovieProductionCountry': /法国/
			}).count()
			.then(data => {
				score.push(data)
				console.log(data, i, j)
				i -= 0.5;
				j -= 0.5;
				flag++;
				if (flag == 20) {
					clearInterval(timer)
					let data = {
						'France': score
					}
					/* 读取到文件 */
					fs.readFile('./data.json', function(err, res) {
						if (err) throw err;
						res = JSON.parse(res);

						res.push(data)

						res = JSON.stringify(res)
						/* 保存好再写入文件 */
						fs.writeFile('./data.json', res, function(err) {
							if (err) throw err;
						})
					})

				}
			});
	}, 500)
}
