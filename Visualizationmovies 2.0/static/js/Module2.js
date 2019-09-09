//得到显示的标签
 var myChart = echarts.init(document.getElementById('box2'))
 //console.log($("#box"))
 var btn = $("input:eq(1)");

 var ItmesJson
 let country1Selector = $('#select2').find('select');
 let country2Selector = $('#select3').find('select');
 let country1 = country1Selector.val();
 let country2 = country2Selector.val();
 const countries = ["China", "America", "England", "Japan", "Korea", "India", "Russia", "Germany", "France"];
 /* 设置切换城市 */
 country1Selector.on('change', function(e) {
	 country1=country1Selector.val();
	 myChart.dispose();
	 myChart = echarts.init(document.getElementById('box2'))
 	ChangeCountry(country1, 0)
 })
 country2Selector.on('change', function(e) {
	 country2=e.currentTarget.value;
	 myChart.dispose();
	 myChart = echarts.init(document.getElementById('box2'))
 	ChangeCountry(country2, 1)
 })

 function ChangeCountry(countryName, flag) {
 	countries.forEach((v, i) => {
 		if (countryName == v) {
 			if (flag == 0) {
 				/* 设置数据 */
 				option2.series[0].data = ItmesJson[i][v];
 				/* 设置变量名 */
 				option2.legend.data[0] = v;
 				/* 设置数据的名字 */
 				option2.series[0].name = v;
 			} else {
 				/* 设置数据 */
 				option2.series[1].data = ItmesJson[i][v];
 				/* 设置变量名 */
 				option2.legend.data[1] = v;
 				/* 设置数据的名字 */
 				option2.series[1].name = v;
 			}
 			myChart.setOption(option2);
 		}
		flag == 1 && $('#select2').find('option').each((index,elem)=>{
			elem.removeAttribute('disabled');
			elem.value==countryName && elem.setAttribute('disabled','disabled');
		})
		flag == 0 && $('#select3').find('option').each((index,elem)=>{
			elem.removeAttribute('disabled');
			elem.value==countryName && elem.setAttribute('disabled','disabled');
		})
 	})
 }





 // 基于准备好的dom，初始化echarts实例
 option2 = {
 	legend: {
 		data: ['China', 'America'],
 	},

 	tooltip: {
 		trigger: 'axis'
 	},
 	toolbox: {
 		show: true,
 		feature: {
 			dataZoom: {
 				yAxisIndex: 'none'
 			},
 			dataView: {
 				readOnly: false
 			},
 			magicType: {
 				type: ['line', 'bar']
 			},
 			restore: {},
 			saveAsImage: {}
 		}
 	},
 	xAxis: {
 		type: 'category',
 		data: ['9.5-10', '9.0-9.5', '8.5-9.0', '8.0-8.5', '7.5-8.0', '7.0-7.5', '6.5-7.0', '6.0-6.5', '5.5-6.0',
 			'5.0-5.5', '4.5-5.0', '4.0-4.5', '3.5-4.0', '3.0-3.5',
 			'2.5-3.0', '2.0-2.5', '1.5-2.0', '1.0-1.5', '0.5-1.0'
 		]
 	},
 	yAxis: {
 		type: 'value'
 	},
 	series: [{
 			name: 'China',
 			data: [2, 13, 35, 137, 296, 422, 466, 544, 526, 475, 460, 433, 438, 440, 350, 192, 2, 0, 0],
 			type: 'line',
 		},
 		{
 			name: 'America',
 			data: [5, 56, 155, 283, 559, 715, 940, 1011, 858, 614, 409, 350, 274, 176, 116, 27, 0, 0, 0],
 			type: 'line'
 		}
 	]
 };
 btn.on('click', function(data) {
 	$.get("http://localhost:8080/Module2", function(data) {
 		//console.log(data);
		myChart.dispose();
		myChart = echarts.init(document.getElementById('box2'))
 		renderReport(data);
 	})
 })

 function renderReport(data) {
	
 	ItmesJson = JSON.parse(data);

 	//console.log(weatherItmesJson);
 	//console.log(typeof weatherItmesJson);
 	option2.series[0].data = ItmesJson[0].China
 	option2.series[1].data = ItmesJson[1].America
 	//console.log(weatherItmesJson[0].MoviesNum)

	country1Selector.find('option').each((index,elem)=>{
		elem.removeAttribute('disabled');
		country2Selector.val()==elem.value && elem.setAttribute('disabled','disabled');
	})
	country2Selector.find('option').each((index,elem)=>{
		elem.removeAttribute('disabled');
		country1Selector.val()==elem.value && elem.setAttribute('disabled','disabled');
	})

 	myChart.setOption(option2);
 }
