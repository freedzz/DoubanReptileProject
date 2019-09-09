const fs = require('fs')

/* 实现同步 */
var async = require("async");

/* es6转换成es5*/
require('babel-register');
require('babel-polyfill');

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

require("./models/movieurl");
const MovieUrl = mongoose.model('MovieUrl');

//连接数据库
var url = 'mongodb://localhost:27017/2018movies';
mongoose.connect(url)
	.then(() => {
		console.log("mongodb connected....");
	})
	.catch(err => {
		console.log(err);
	})

//保存电影信息
/* 用于调试的时候保存数据 */
var movies = []
var JsonData = []


//路由
app.get("/", (req, res) => {
	
	/* 爬取当前年份的URL地址 */
	/* 
		调用函数要两个参数 
		参数1：爬取数据条数一般设置10000就够了
		参数2：爬取的年份
	*/
	//getUrlStart(10000,2019)
	
	/* 通过URL地址爬取所需要的数据 */
	/* 不需要参数 */
	//getDataStart()
	
	res.send(
	`<h1>开始爬虫啦!!!!!<h1>
	<h2>查看命令行中是否在开始运行了呢?<h2>
	<h2>注意当前页面不能再刷新哦,否则爬虫会再次运行的!!!<h2>`
	)
	
})

//监听端口
let server = app.listen(8080, function() {
	let host = server.address().address;
	let port = server.address().port;
	console.log('Your App is running at http://%s:%s', host, port);
});

/* 爬取URL */
function getUrlStart(number,year) {
	var flag = 0
	var page = number //设置最终值，该值除以20得到爬虫页数
	var timer //定时器
	var Interval = 1000 //设置爬虫间隔时间

	timer = setInterval(function() {
		getUrl(flag, year);
		console.log(flag)
		if (flag == page) {
			console.log("数据爬完了！！！")
			clearInterval(timer)
		}
		flag = flag + 20
	}, Interval)
}

/* 爬取数据 */
function getDataStart() {

	/* 从数据库中获得所有数据 */
	MovieUrl.find({})
		.sort({
			data: "desc"
		})
		.then(URL => {
			
			let data = URL
			//JsonData = URL
			//console.log(data)
			
			/* 
			爬取数据：方案1 串行爬虫
			缺点：每秒爬取一次，速度慢，爬取7000条要1个小时
			*/
			let flag = 0
			let page = data.length //设置最终值，该值除以20得到爬虫页数
			let timer //定时器
			let Interval = 150 //设置爬虫间隔时间
			
			timer = setInterval(function() {
				getHtml(data[flag].url)
				console.log(flag)
				if (flag >= page) {
					console.log("数据爬完了！！！")
					clearInterval(timer)
				}
				flag++
			}, Interval);
		});

}

/* 使用superagent得到json数据 */
/* 参数：页号，年份  返回值：指定页号的json文件 */
function getUrl(number, year) {

	/* 处理地址有中文的情况 */
	superagent.get('https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=' +
			number + '&year_range='+ year +','+ year +'')
		.end((err, res) => {
			if (err) {
				console.log(`json数据抓取失败 - ${err}`)
			} else {
				let arr = JSON.parse(res.text)
				for (let i = 0; i < arr.data.length; i++) {
					//JsonData.push(arr.data[i].url)
					let data = {
						url: arr.data[i].url
					}
					/* 存入数据库 */
					const newMovies = new MovieUrl(data);
					newMovies.save()
				}
			}
		});

}

/* 抓取目标网站的HTML内容 */
/* 需要参数：目标网站URL 返回值：目标网站的HTML */
function getHtml(url) {
	superagent.get(url)
		/* 设置超时 */
		.timeout({
			response: 20000, // Wait 5 seconds for the server to start sending,
			deadline: 60000, // but allow 1 minute for the file to finish loading.
		})
		.then(res => {
			getData(res.text)
		}, err => {
			if (err.timeout) {
				/* timed out! */
				console.log("请求或响应超时")
			} else {
				/* other error */
				console.log(`HTML抓取失败 - ${err}`)
			}
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

		if (movie.MovieScore == "") {
			movie.MovieScore = 0;
		}
		if (movie.MovieCommentNumber == "") {
			movie.MovieCommentNumber = 0;
		}

		//数据存储
		const newMovies = new Movie(movie);
		newMovies.save()
	});
	movies.push(movie) // 存入最终结果数组

}
