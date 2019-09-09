<template>
	<div class="echars">
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
		<div class="contentRight">
			<div class="box" id="box6"></div>
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
			this.$axios.get('http://localhost:8080/Module6')
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
				this.option.series[0].data = this.datas;			
				// 使用指定的配置项和数据显示图表。
				this.myChart.setOption(this.option);

			},
			createChart() {

				// 基于准备好的dom，初始化echarts实例
				this.myChart = this.$echarts.init(document.getElementById('box6'));


				this.option = {
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
	#box6 {
		padding: 0px;
		margin: 0px;
		display: block !important;
	}
</style>
