const fs = require('fs')

/* 实现同步 */
var async = require("async");


/* es6转换成es5*/
require('babel-register');
require('babel-polyfill');

function testAwait() {
	return new Promise((resolve) => {
		setTimeout(function() {
			console.log("testAwait");
			resolve();
		}, 1000);
	});
}

async function helloAsync() {
	await testAwait();
	console.log("helloAsync");
}

helloAsync()

const PAQ = require('priority-async-queue');
const paq1 = new PAQ();

//引入框架
const express = require('express');
//实例化对象
const app = express();

// 引入所需要的第三方包，爬取页面信息
const cheerio = require('cheerio');

// 引入所需要的第三方包,下载不需要异步的页面
const superagent = require('superagent');

//引入数据库
const mongoose = require('mongoose');

//引入数据模型
//可以在当前页面使用movie来进行数据库操作
require("./models/movie");
const Movie = mongoose.model('Movie');

//连接数据库
var url = 'mongodb://localhost:27017/2019movies';
mongoose.connect(url)
	.then(() => {
		console.log("mongodb connected....");
	})
	.catch(err => {
		console.log(err);
	})

//保存电影信息
var movies = []
var JsonData = []


//路由
app.get("/", (req, res) => {

	res.send({
		movies: movies
		//JsonData:JsonData
	});


	/* 爬取url */
	/* 	fs.writeFile('data2.json', JSON.stringify(JsonData), (err) => {
			if (err) throw err;
		}) */

	/* 爬取数据 */
	// fs.readFile('./data.json', function(err, data) {
	// 	data = JSON.parse(data)
	// 	data.forEach(function(index) {
	// 		Reptile(index)
	// 	})
	// })

})


//监听端口
let server = app.listen(8080, function() {
	let host = server.address().address;
	let port = server.address().port;
	console.log('Your App is running at http://%s:%s', host, port);
});

/*
1.coll:要遍历的数组或者对象
2.limit:并发，每次执行几个
3.iteratee:每次要执行的方法
4.callback:全部执行完之后的回调
mapLimit(coll, limit, iteratee, callback)
*/




/* 爬取URL */
/* for(let i=0;i<1500;){
	(function(i){
		getUrl(i,2019)
	})(i);
	i = i+20
} */





fs.readFile('./data.json', function(err, data) {
	data = JSON.parse(data)

	data.forEach(function(index) {
		Reptile(index)
	})

	// async.mapLimit(data, 3,function(data,callback){
	// 	Reptile(data)
	// 	callback(null)
	// }, function(err, data) {
	// 	if (err) throw err
	// 	
	// })
})


//Reptile("https://movie.douban.com/subject/34785736/")


/* 数据爬取流程 */
async function Reptile(data) {
	/* 	let HtmlData
		 HtmlData = await getHtml(data) */
	//console.log("等待得到HTML")

	await getHtml(data)

	//let Moviedata = await getData(HtmlData.text)

	console.log("实现同步")
	//console.log(Moviedata)
	return new Promise((resolve, reject) => {
		resolve();
		reject('timeout');
	}).then(undefined, (error) => {
		console.error(error);
	});
}



/* 使用superagent得到json数据 */
/* 参数：页号，年份  返回值：指定页号的json文件 */
function getUrl(number, year) {

	//console.log('*********开始爬取第' + year + '年的，第' + number + '页的数据********')

	/* 处理地址有中文的情况 */
	var str = encodeURI('https://movie.douban.com/j/new_search_subjects?tags=电影&start=' + number + '&year_range=2019,2019');
	superagent.get('https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=' +
			number + '&year_range=2019,2019')
		.end((err, res) => {
			if (err) {
				console.log(`json数据抓取失败 - ${err}`)
			} else {
				let arr = JSON.parse(res.text)
				for (let i = 0; i < arr.data.length; i++) {
					JsonData.push(arr.data[i].url)
				}


				/* async.mapLimit(arr.data, 3,function(data,callback){
					getHtml(data.url)
					callback(null)
				}, function(err, data) {
					if (err) throw err
					
				}) */
				//console.log("1.下载第" + number + "页的JSON数据完成......")
			}
		});
}



/* 抓取目标网站的HTML内容 */
/* 需要参数：目标网站URL 返回值：目标网站的HTML */
async function getHtml(url) {
	//console.log("2.开始下载目标网站HTML文件.......")
	console.log("等待得到HTML")

	let res

	res = await superagent.get(url)

	console.log("得到HTML，开始爬取数据")

	let movie = await getData(res.text)

	//console.log("页面数据爬取完成......")

	//console.log(movie)

	return new Promise((resolve, reject) => {
		resolve(res);
		reject('timeout');
	}).then(undefined, (error) => {
		console.error(error);
	});
}


/* 抓取目标网站所需的数据 */
/* 需要参数：目标网站的HTML 返回值：目标网站所需的数据 */
function getData(htmlStr) {
	//console.log("3.开始爬取目标网站的数据......")

	let movie = {};
	let $ = cheerio.load(htmlStr);
	// 找到目标数据所在的页面元素，获取数据
	// console.log($("div#content").find("h1").find("span.year").text())
	$("div#content").each((idx, ele) => {
		movie = {
			MovieName: $(ele).find("h1").find("span[property]").text(),
			MovieScore: $(ele).find("div.article").find("div#interest_sectl").find("strong.rating_num").text(),
			MovieYear: $(ele).find("h1").find("span.year").text(),
			MovieReleaseDate: $(ele).find("div.article").find("div#info").find("span[content]").eq(0).text(),
			MovieProductionCountry: $(ele).find("div.article").find("div#info").text(),
			MovieCommentNumber: $(ele).find("div.article").find("div#interest_sectl").find("div.rating_right").find(
				"span[property]").text()
		};
		//数据处理
		movie.MovieYear = movie.MovieYear.slice(1, 5)
		movie.MovieReleaseDate = movie.MovieReleaseDate.slice(0, 10)
		/* 出版地区 */
		//去掉字符串空白符
		movie.MovieProductionCountry = movie.MovieProductionCountry.replace(/\s*/g, "");

		let numBgin = movie.MovieProductionCountry.search("地区")
		let numEnd = movie.MovieProductionCountry.search("语言")
		movie.MovieProductionCountry = movie.MovieProductionCountry.slice(numBgin + 3, numEnd)

		//数据存储
		//movies.push(movie) // 存入最终结果数组
		const newMovies = new Movie(movie);
		newMovies.save()
	});
	movies.push(movie)
	console.log("页面数据爬取完成......")
}
