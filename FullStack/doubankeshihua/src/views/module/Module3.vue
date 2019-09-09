<template>
	<div class="echars">
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
		<div class="contentRight">
			<div class="box" id="box3"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Echars",
		data() {
			return {
				datas: null,
				option: Object,
				myChart: null,
			}
		},
		created() {
			this.$axios.get('http://localhost:8080/Module3')
				.then(res => {
					//得到数据
					this.datas = res.data

				})
		},
		mounted() {
			this.createChart()

			setTimeout(() => {
				this.renderReport()
			}, 20)

		},
		methods: {
			renderReport() {
				//console.log(this.datas)
				var CountryItemsJson = this.datas; //将字符串转成json对象
				
				let res = this.datas
				
				this.option.series[0].data = res['num']
				this.option.series[1].data = res['high']
				this.option.series[2].data = res['low']

				// 使用指定的配置项和数据显示图表。
				this.myChart.setOption(this.option);

			},
			createChart() {

				// 基于准备好的dom，初始化echarts实例
				this.myChart = this.$echarts.init(document.getElementById('box3'));
				
				let posList = [
					'left', 'right', 'top', 'bottom',
					'inside',
					'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
					'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
				];
				
				this.myChart.configParameters = {
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
						options: this.$echarts.util.reduce(posList, function(map, pos) {
							map[pos] = pos;
							return map;
						}, {})
					},
					distance: {
						min: 0,
						max: 100
					}
				};
				
				this.myChart.config = {
					rotate: 90,
					align: 'left',
					verticalAlign: 'middle',
					position: 'insideBottom',
					distance: 15,
					onChange: function() {
						let labelOption = {
							normal: {
								rotate: this.myChart.config.rotate,
								align: this.myChart.config.align,
								verticalAlign: this.myChart.config.verticalAlign,
								position: this.myChart.config.position,
								distance: this.myChart.config.distance
							}
						};
						this.myChart.setOption({
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
						position: this.myChart.config.position,
						distance: this.myChart.config.distance,
						align: this.myChart.config.align,
						verticalAlign: this.myChart.config.verticalAlign,
						rotate: this.myChart.config.rotate,
						formatter: '{c}  {name|{a}}',
						fontSize: 16,
						rich: {
							name: {
								textBorderColor: '#fff'
							}
						}
					}
				};

				this.option = {
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
							data: []
						},
						{
							name: '高分电影数量',
							type: 'bar',
							label: labelOption,
							data: []
						},
						{
							name: '低分电影数量',
							type: 'bar',
							label: labelOption,
							data: []
						}
					]
				};


			}
		}
	}
</script>

<style scoped>
	.echars {
		width: 100%;
		height: 100%;
	}

	.contentRight {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 100%;
		height: 100%;
		/* border: 1px solid skyblue; */
		margin: 0px;
		padding: 0px;
		display: block;
		/* position: absolute; */
		right: -0px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	.box div {
		width: 100% !important;
		height: 100% !important;
	}

	.box canvas {
		width: 100% !important;
		height: 100% !important;
	}

	/* 设置盒子样式 */
	#box3 {
		padding: 0px;
		margin: 0px;
		display: block !important;
	}
</style>
