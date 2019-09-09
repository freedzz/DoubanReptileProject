$(function() {



	$(".itemList").find("span").eq(2).on('click', function() {
		$.ajax({
			type: "GET",
			contentType: "application/json;charset=UTF-8",
			url: "http://localhost:8080/Module3",
			data: '',
			success: function(result) {
				console.log(result)
				let res = JSON.parse(result)
				let num = res['num']
				let high = res['high']
				let low = res['low']
				let app = echarts.init(document.getElementById('box3'));
				let posList = [
					'left', 'right', 'top', 'bottom',
					'inside',
					'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
					'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
				];

				app.configParameters = {
					rotate: {
						min: -90,
						max: 90
					},
					align: {
						options: {
							left: 'left',
							center: 'center',
							right: 'right'
						}
					},
					verticalAlign: {
						options: {
							top: 'top',
							middle: 'middle',
							bottom: 'bottom'
						}
					},
					position: {
						options: echarts.util.reduce(posList, function(map, pos) {
							map[pos] = pos;
							return map;
						}, {})
					},
					distance: {
						min: 0,
						max: 100
					}
				};

				app.config = {
					rotate: 90,
					align: 'left',
					verticalAlign: 'middle',
					position: 'insideBottom',
					distance: 15,
					onChange: function() {
						let labelOption = {
							normal: {
								rotate: app.config.rotate,
								align: app.config.align,
								verticalAlign: app.config.verticalAlign,
								position: app.config.position,
								distance: app.config.distance
							}
						};
						app.setOption({
							series: [{
								label: labelOption
							}, {
								label: labelOption
							}, {
								label: labelOption
							}, {
								label: labelOption
							}]
						});
					}
				};


				let labelOption = {
					normal: {
						show: true,
						position: app.config.position,
						distance: app.config.distance,
						align: app.config.align,
						verticalAlign: app.config.verticalAlign,
						rotate: app.config.rotate,
						formatter: '{c}  {name|{a}}',
						fontSize: 16,
						rich: {
							name: {
								textBorderColor: '#fff'
							}
						}
					}
				};

				option3 = {
					color: ['#003366', '#006699', '#4cabce', '#e5323e'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: ['电影总数量', '高分电影数量', '低分电影数量']
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						top: 'center',
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar', 'stack', 'tiled']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '电影总数量',
							type: 'bar',
							barGap: 0,
							label: labelOption,
							data: num
						},
						{
							name: '高分电影数量',
							type: 'bar',
							label: labelOption,
							data: high
						},
						{
							name: '低分电影数量',
							type: 'bar',
							label: labelOption,
							data: low
						}
					]
				};
				app.setOption(option3);
			}
		})
	})
});
