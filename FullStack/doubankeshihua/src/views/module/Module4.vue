<template>
	<div class="echars">
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
		<div class="contentRight">
			<div class="box" id="box4"></div>
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
			this.$axios.get('http://localhost:8080/Module4')
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
				    for(var i=0;i<CountryItemsJson.length;i++){
				        for(var key in CountryItemsJson[i]){
				            
				            this.option.xAxis.data[i] = key;
				            this.option.series[0].data.push(CountryItemsJson[i][key][0]);
				        }
				    }
				// 使用指定的配置项和数据显示图表。
				this.myChart.setOption(this.option);

			},
			createChart() {

				// 基于准备好的dom，初始化echarts实例
				this.myChart = this.$echarts.init(document.getElementById('box4'));


				this.option = {
					title: {
						text: '2019各个国家发行的电影数量分析',
					},
					legend: {
						data: ['电影数量'],
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
						// trigger: 'axis',
						// axisPointer: {
						// 	type: 'cross',
						// 	crossStyle: {
						// 		color: '#999'
						// 	}
						// }
					},
					xAxis: {
						data: [],

						axisLabel: {
							inside: false,
							textStyle: {
								color: '#999'
							}
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						z: 10
					},
					yAxis: {
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
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
					series: [{
						name: '电影数量',
						type: 'bar',
						itemStyle: {
							normal: {
								color: new this.$echarts.graphic.LinearGradient(
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
							emphasis: {
								color: new this.$echarts.graphic.LinearGradient(
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
						}
					}]
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
	#box4 {
		padding: 0px;
		margin: 0px;
		display: block !important;
	}
</style>
