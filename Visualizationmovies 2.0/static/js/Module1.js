$(document).ready(function(){
	//得到显示的标签
		
		//console.log($("#box"))
		var btn = $("input:eq(0)");
		var box = document.getElementById('box1');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(box);

		var ItmesJson

		//点击显示标签
		btn.on("click", function() {
			$.get("http://localhost:8080/Module1", function(data) {
				myChart.dispose();
				myChart=echarts.init(box)
				renderReport(data);
			})
		})

		/* 设置切换城市 */
		const countrySelector=$('#select1').find('select');
		
		countrySelector.on('change',function(){
			myChart.dispose();
			myChart=echarts.init(box)
			let countryName = countrySelector.val();
			ChangeCountry(countryName)
		})
// 		//第一次检测
// 		$('#select1').find('select').hover(function() {
// 			setTimeout(function() {
// 				name1 = $('#select1').find('select').val()
// 			}, 500)
// 
// 		})
// 
// 		setInterval(function() {
// 			name2 = $('#select1').find('select').val()
// 			if (name1 != name2) {
// 				
// 			}
// 		}, 500)


		function ChangeCountry(name) {
			if (name == 'America') {
				//传入参数
				option.series[0].data = ItmesJson[1].America;
				option.series[2].data = ItmesJson[1].America;

				//设置显示的国家
				option.legend.data = ['美国'];
				option.series[0].name = '美国';
				option.series[2].name = '美国';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			if (name == 'China') {
				//传入参数
				option.series[0].data = ItmesJson[0].China;
				option.series[2].data = ItmesJson[0].China;

				//设置显示的国家
				option.legend.data = ['中国'];
				option.series[0].name = '中国';
				option.series[2].name = '中国';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			if (name == 'England') {
				//传入参数
				option.series[0].data = ItmesJson[2].England;
				option.series[2].data = ItmesJson[2].England;

				//设置显示的国家
				option.legend.data = ['英国'];
				option.series[0].name = '英国';
				option.series[2].name = '英国';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			if (name == 'Japan') {
				//传入参数
				option.series[0].data = ItmesJson[3].Japan;
				option.series[2].data = ItmesJson[3].Japan;

				//设置显示的国家
				option.legend.data = ['日本'];
				option.series[0].name = '日本';
				option.series[2].name = '日本';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			if (name == 'Korea') {
				//传入参数
				option.series[0].data = ItmesJson[4].Korea;
				option.series[2].data = ItmesJson[4].Korea;

				//设置显示的国家
				option.legend.data = ['韩国'];
				option.series[0].name = '韩国';
				option.series[2].name = '韩国';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			if (name == 'India') {
				//传入参数
				option.series[0].data = ItmesJson[5].India;
				option.series[2].data = ItmesJson[5].India;

				//设置显示的国家
				option.legend.data = ['印度'];
				option.series[0].name = '印度';
				option.series[2].name = '印度';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			if (name == 'Russia') {
				//传入参数
				option.series[0].data = ItmesJson[6].Russia;
				option.series[2].data = ItmesJson[6].Russia;

				//设置显示的国家
				option.legend.data = ['俄罗斯'];
				option.series[0].name = '俄罗斯';
				option.series[2].name = '俄罗斯';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			if (name == 'Germany') {
				//传入参数
				option.series[0].data = ItmesJson[7].Germany;
				option.series[2].data = ItmesJson[7].Germany;

				//设置显示的国家
				option.legend.data = ['德国'];
				option.series[0].name = '德国';
				option.series[2].name = '德国';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			if (name == 'France') {
				//传入参数
				option.series[0].data = ItmesJson[8].France;
				option.series[2].data = ItmesJson[8].France;

				//设置显示的国家
				option.legend.data = ['法国'];
				option.series[0].name = '法国';
				option.series[2].name = '法国';
				// 使用指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
		}




		function renderReport(data) {

			ItmesJson = JSON.parse(data);

			//console.log(ItmesJson)

			//传入参数
			option.series[0].data = ItmesJson[0].China;
			option.series[2].data = ItmesJson[0].China;

			//设置显示的国家
			option.legend.data.push('中国')
			option.series[0].name = '中国';
			option.series[2].name = '中国';

			//设置每个柱状图的阴影
			for (var i = 0; i < ItmesJson[0].length; i++) {
				dataShadow.push(yMax);
			}

			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option);

		}
		var dataAxis = ['9.5-10', '9.0-9.5', '8.5-9.0', '8.0-8.5', '7.5-8.0', '7.0-7.5', '6.5-7.0', '6.0-6.5', '5.5-6.0',
			'5.0-5.5', '4.5-5.0', '4.0-4.5', '3.5-4.0', '3.0-3.5',
			'2.5-3.0', '2.0-2.5', '1.5-2.0', '1.0-1.5', '0.5-1.0' /* , '0-0.5' */
		];
		var yMax = 1000;
		var dataShadow = [];


		var option = {
			title: {
				text: '电影评分与数量的对比',
			},
			/* 图例 */
			legend: {
				data: [],
			},
			/* 鼠标覆盖显示具体数据 */
			tooltip: {
				backgroundColor: 'rgba(0,0,0,0.7)', //背景颜色（此时为默认色）
				borderRadius: 8, //边框圆角
				padding: 10, // [5, 10, 15, 20] 内边距
				show: true,
				width: 20,
				height: 20,
				/* 显示x,y轴坐标 */
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			/* 右上角各种切换按钮 */
			toolbox: {
				feature: {
					magicType: {
						show: true,
						type: ['line', 'bar']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},

			xAxis: {
				data: dataAxis,
				/* 是否显示坐标标签 */
				axisLabel: {
					/* 标签显示位置 */
					inside: false,
					/* 标签颜色 */
					textStyle: {
						color: '#999'
					}
				},
				/* 是否显示刻度 */
				axisTick: {
					show: true
				},
				/* 是否显示轴线 */
				axisLine: {
					show: true
				},
				z: 10
			},
			yAxis: {
				axisLine: {
					show: true
				},
				axisTick: {
					show: true
				},
				axisLabel: {
					textStyle: {
						color: '#999'
					}
				}
			},
			dataZoom: [{
				type: 'inside'
			}],
			series: [
				/* 柱状体颜色 */
				{
					name: '美国',
					type: 'bar',
					hoverAnimation: true,
					itemStyle: {
						/* 正常颜色 */
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1,
								[{
										offset: 0,
										color: '#83bff6'
									},
									{
										offset: 0.5,
										color: '#188df0'
									},
									{
										offset: 1,
										color: '#188df0'
									}
								]
							)
						},
						/* 鼠标覆盖颜色 */
						emphasis: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1,
								[{
										offset: 0,
										color: '#2378f7'
									},
									{
										offset: 0.7,
										color: '#2378f7'
									},
									{
										offset: 1,
										color: '#83bff6'
									}
								]
							)
						}
					},
					data: [],
					/* 显示数字 */
					label: {
						normal: {
							show: true,
							position: 'top',
							color: '#999'
						}
					},
				},
				/* 柱状体阴影颜色 */
				{
					name: '美国',
					type: 'bar',
					itemStyle: {
						normal: {
							color: 'rgba(0,0,0,0.05)'
						}
					},
					barGap: '-100%',
					barCategoryGap: '40%',
					data: dataShadow,
					animation: false
				},
				/* 线条 */
				{
					name: '美国',
					type: 'line',
					data: [],
					color: '#999'
				},
			]
		};

		// 设置点击图标缩小
		var zoomSize = 6;
		myChart.on('click', function(params) {
			console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
			myChart.dispatchAction({
				type: 'dataZoom',
				startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
				endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, option.series[0].data.length - 1)]
			});
		});
})
		