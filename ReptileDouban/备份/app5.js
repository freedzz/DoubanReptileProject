const fs = require('fs')

/* 实现同步 */
var async = require("async");


/* es6转换成es5*/
require('babel-register');
require('babel-polyfill');

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

require("./models/movieurl");
const MovieUrl = mongoose.model('MovieUrl');

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
	
	
	getStart()
	res.send({
		movies: movies
		//JsonData: JsonData
	});

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
async.mapLimit(data, 3,function(data,callback){
	Reptile(data)
	callback(null)
}, function(err, data) {
	if (err) throw err
	
})
*/




/* 爬取URL */
// 	var flag = 0
// 	var page = 9740 //设置最终值，该值除以20得到爬虫页数
// 	var timer //定时器
// 	var Interval = 1000 //设置爬虫间隔时间
// 
// 	timer = setInterval(function() {
// 		getUrl(flag,2019);
// 		console.log(flag)
// 		if (flag == page) {
// 			console.log("数据爬完了！！！")
// 			clearInterval(timer)
// 		}
// 		flag = flag + 20
// 	}, Interval)




/* 爬取数据 */
function getStart() {
	fs.readFile('./data2.json', function(err, data) {

		data = JSON.parse(data)

		/* 
		爬取数据：方案1 串行爬虫
		缺点：每秒爬取一次，速度慢，爬取7000条要1个小时
		*/
		var flag = 0
		var page = data.length //设置最终值，该值除以20得到爬虫页数
		var timer //定时器
		var Interval = 100 //设置爬虫间隔时间

		timer = setInterval(function() {
			getHtml(data[flag])
			console.log(flag)
			if (flag >= page) {
				console.log("数据爬完了！！！")
				clearInterval(timer)
			}
			flag++
		}, Interval)

		/*
		爬取数据：方案2 并发爬虫 
		缺点：无法解决每爬3条数据等待1s的问题，
		*/
		// 	var flag = 0
		// 	var page = data.length //设置最终值，该值除以20得到爬虫页数
		// 	var timer //定时器
		// 	var Interval = 1000 //设置爬虫间隔时间
		// 
		// 	timer = setTimeout(function() {
		// 
		// 		async.mapLimit(data, 1, function(data, callback) {
		// 			getHtml(data)
		// 			callback(err, null)
		// 		}, function(err, data) {
		// 			if (err) throw err
		// 		})
		// 		
		// 		console.log(flag)
		// 		if (flag >= page) {
		// 			console.log("数据爬完了！！！")
		// 			clearInterval(timer)
		// 		}
		// 		flag = flag + 1;
		// 		
		// 	}, Interval)

	});
}
// async.mapLimit(data, 3,function(data,callback){
// 	Reptile(data)
// 	callback(null)
// }, function(err, data) {
// 	if (err) throw err
// 	
// })



/* 数据爬取流程 */
/*  入口函数   */
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
	var str = encodeURI('https://movie.douban.com/j/new_search_subjects?tags=电影&start=' + number +
		'&year_range=2019,2019');
	superagent.get('https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=' +
			number + '&year_range=2019,2019')
		.end((err, res) => {
			if (err) {
				console.log(`json数据抓取失败 - ${err}`)
			} else {
				let arr = JSON.parse(res.text)
				for (let i = 0; i < arr.data.length; i++) {
					JsonData.push(arr.data[i].url)
					let data = {
						url: arr.data[i].url
					}
					/* 存入数据库 */
					// const newMovies = new MovieUrl(data);
					// newMovies.save()
				}
			}
		});

}



/* 抓取目标网站的HTML内容 */
/* 需要参数：目标网站URL 返回值：目标网站的HTML */
function getHtml(url) {
	let res
	superagent.get(url)
		/* 设置超时 */
		.timeout({
			response: 5000, // Wait 5 seconds for the server to start sending,
			deadline: 60000, // but allow 1 minute for the file to finish loading.
		})
		.then(res => {
			if (res.text != '') {
				getData(res.text)
			} else {
				console.log("URL地址无效")
			}
		}, err => {
			if (err.timeout) {
				/* timed out! */
				console.log("请求或响应超时")
			} else {
				/* other error */
				console.log(`HTML抓取失败 - ${err}`)
			}
		});


	// .end((err, res) => {
	// 	if (err) {
	// 		console.log(`HTML抓取失败 - ${err}`)
	// 	} else {
	// 		//得到电影URL地址
	// 		//爬取电影详细信息
	// 		getData(res.text)
	// 	}
	// });

	//let movie = await getData(res.text)


	// return new Promise((resolve, reject) => {
	// 	getData(res.text)
	// 	resolve();
	// 	reject('timeout');
	// }).then(undefined, (error) => {
	// 	console.error(error);
	// });
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
		//movies.push(movie) // 存入最终结果数组
		const newMovies = new Movie(movie);
		newMovies.save()
	});
	movies.push(movie)
	//console.log("页面数据爬取完成......")
}
