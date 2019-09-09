$(function(){

	//得到显示的标签
	var box = document.getElementById('box6')
	//console.log($("#box"))
	var btn = $(".itemList").find("span").eq(5)

	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(box);

	var option6 = {
		title: {
			text: '近十年中国发行的电影每一年的数量分布图'
		},
		tooltip: {},
		legend: {
			data: ['电影数量']
		},
		xAxis: {
			name: '年份',
			data: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
		},
		yAxis: {
			name: '数量'
		},
		series: [{
			name: '电影数量',
			type: 'bar',
			data: [],
			/* 显示数字 */
			label: {
				normal: {
					show: true,
					position: 'top',
					color: '#999'
				}
			},
		}]
	};

	btn.on("click", function() {
		$.get("http://localhost:8080/Module6", function(data) {
			//console.log(data);
			renderReport(data);
		})

	})

	function renderReport(data) {
		data = JSON.parse(data)
		//console.log(data)
		/* var ItemsJson = JSON.parse(data);//将字符串转成json对象
		 for(var index in ItemsJson){
		  
		     options.series[0].data.push(num);
		 }*/
		option6.series[0].data = data;
		myChart.setOption(option6);

	}
})
