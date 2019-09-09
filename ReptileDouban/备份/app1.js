/*  爬虫整个流程  */
/* 1.使用express搭建一个服务器 */
/* 2.使用superagent访问目标网站获取到目标网站的HTML代码 */
/* 3.使用cheerio去查找到HTML代码中所需要的数据*/
/* 4.把数据返回给服务器，然后展示出来 */
/* 5.爬取本地新闻的时候，本地新闻是在加载完页面后通过ajax获取的，所以使用下载HTML静态文件的方式获取不到 */
/* 6.使用nightmare在爬取数据的时候，模拟访问服务器获取数据 */
/* 7.然后在把获取到的数据使用cheerio去查找到HTML代码中所需要的数据 */
const fs = require('fs')

/* 实现同步 */
//var async = require("async");
require('babel-register');
require('babel-polyfill');

const PAQ = require('priority-async-queue');
const paq1 = new PAQ();
const paq2 = new PAQ();

//引入框架
const express = require('express');
//实例化对象
const app = express();

// 引入所需要的第三方包，爬取页面信息
const cheerio = require('cheerio');

// 引入所需要的第三方包,下载不需要异步的页面
const superagent = require('superagent');

// 自动化测试包，处理动态页面，设置代理等
const Nightmare = require('nightmare');

const nightmare = Nightmare({
	/* 设置代理 */
	// switches: {
	// 	'proxy-ip': '121.232.199.9:9000' // set the proxy server here ...
	// },
	show: true
}); // show:true  显示内置模拟浏览器

//引入数据库
const mongoose = require('mongoose');

//引入数据模型
//可以在当前页面使用idea来进行数据库操作
require("./models/movie");
const Movie = mongoose.model('Movie');

//连接数据库
//var db = require("./config/mongodb")
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


//路由
app.get("/", (req, res) => {

	getUrl(0, 2019)
	res.send({
		movies: movies
	});

	// fs.writeFile('data.json', JSON.stringify(movies), (err) => {
	// 	if (err) throw err;
	// })

})


//监听端口
let server = app.listen(8080, function() {
	let host = server.address().address;
	let port = server.address().port;
	console.log('Your App is running at http://%s:%s', host, port);
});


const syncTask = (n) => {
	for (let i = 0; i < n;) {
		paq1.addTask(() => {
			getUrl(i, 2019)
			i = i + 20;
			return i;
		});
	}
};

//syncTask(1);


/* 使用superagent得到json数据 */
async function getUrl(number, year) {

	console.log('*********开始爬取第' + year + '年的，第' + number + '页的数据********')

	/* 处理地址有中文的情况 */
	var str1 = encodeURI(
		'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=' +
		number + '&year_range=2019,2019')
	var str = encodeURI('https://movie.douban.com/j/new_search_subjects?tags=电影&start=' + number +
		'&year_range=2019,2019');
	superagent.get(str)
		.end((err, res) => {
			if (err) {
				console.log(`json数据抓取失败 - ${err}`)
			} else {

				let arr = JSON.parse(res.text)

				console.log("JSON数据下载完成......")

				//得到电影URL地址
				//爬取电影详细信息
				/* arr.data.forEach((data) => {
					//console.log(data.url)
					getHtml(data.url)
				}) */
				for (let i = 0; i < arr.data.length;i++) {
					paq2.addTask(() => {
						getHtml(arr.data[i].url)
						return i;
					});
				}
			}
		});
		console.log('*********第' + year + '年的，第' + number + '页的数据爬取完成********')
}



/* 抓取目标网站的HTML内容 */
async function getHtml(url) {

	console.log("开始下载目标网站HTML文件.......")
	let data
	superagent.get(url)
		.end((err, res) => {
			if (err) {
				console.log(`HTML抓取失败 - ${err}`)
			} else {
				data = res.text
			}
		});
	let movie = await getData(data)
	console.log(movie)
	movies.push(movie)
	/* 存储数据到数据库 */
	const newMovies = new Movie(movie);
	newMovies.save()

}


/* 抓取目标网站所需的数据 */
async function getData(htmlStr) {

	console.log("页面数据爬取开始......")

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

	});
	 //console.log("页面数据爬取完成......")
	//return movie
	return new Promise(resolve => {

		resolve(movie);

	});
}
