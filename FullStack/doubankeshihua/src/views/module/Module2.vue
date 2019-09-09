<template>
	<div class="echars">
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
		<div class="contentRight">
			<div class="box" id="box2"></div>
		</div>
		<div class="selectCountry" id="select2">
			<select v-model="country1">
				<option value="China">中国</option>
				<option value="America">美国</option>
				<option value="England">英国</option>
				<option value="Japan">日本</option>
				<option value="Korea">韩国</option>
				<option value="India">印度</option>
				<option value="Russia">俄罗斯</option>
				<option value="Germany">德国</option>
				<option value="France">法国</option>
			</select>
		</div>
		<div class="selectCountry" id="select3">
			<select v-model="country2">
				<option value="China">中国</option>
				<option value="America" selected>美国</option>
				<option value="England">英国</option>
				<option value="Japan">日本</option>
				<option value="Korea">韩国</option>
				<option value="India">印度</option>
				<option value="Russia">俄罗斯</option>
				<option value="Germany">德国</option>
				<option value="France">法国</option>
			</select>
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
				country1: "China",
				country2: "America",
			}
		},
		created() {
			this.$axios.get('http://localhost:8080/Module2')
				.then(res => {
					//得到数据
					this.datas = res.data

				})
		},
		watch: {
			country1() {
				//console.log(this.country)
				this.ChangeCountry(this.country1,0)
			},
			country2() {
				//console.log(this.country)
				this.ChangeCountry(this.country2,1)
			}
		},
		mounted() {
			this.createChart()

			setTimeout(() => {
				this.renderReport()
			}, 20)

		},
		methods: {
			ChangeCountry(name,flag) {
				if (name == 'China') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						console.log(1)
						this.option.series[0].data = this.datas[0].China;
						/* 设置变量名 */
						this.option.legend.data[0] = 'China';
						/* 设置数据的名字 */
						this.option.series[0].name = 'China';
						console.log(2)
					} else {	
						/* 设置数据 */
						console.log(1)
						this.option.series[1].data = this.datas[0].China;
						/* 设置变量名 */
						this.option.legend.data[1] = 'China';
						/* 设置数据的名字 */
						this.option.series[1].name = 'China';
						console.log(2)
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'America') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						console.log(1)
						this.option.series[0].data = this.datas[1].America;
						/* 设置变量名 */
						this.option.legend.data[0] = 'America';
						/* 设置数据的名字 */
						this.option.series[0].name = 'America';
						console.log(2)
					} else {
						/* 设置数据 */
						this.option.series[1].data = this.datas[1].America;
						/* 设置变量名 */
						this.option.legend.data[1] = 'America';
						/* 设置数据的名字 */
						this.option.series[1].name = 'America';
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'England') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						
						this.option.series[0].data = this.datas[2].England;
						/* 设置变量名 */
						this.option.legend.data[0] = 'England';
						/* 设置数据的名字 */
						this.option.series[0].name = 'England';
					} else {
						/* 设置数据 */
						this.option.series[1].data = this.datas[2].England;
						/* 设置变量名 */
						this.option.legend.data[1] = 'England';
						/* 设置数据的名字 */
						this.option.series[1].name = 'England';
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'Japan') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						this.option.series[0].data = this.datas[3].Japan;
						/* 设置变量名 */
						this.option.legend.data[0] = 'Japan';
						/* 设置数据的名字 */
						this.option.series[0].name = 'Japan';
					} else {
						/* 设置数据 */
						this.option.series[1].data = this.datas[3].Japan;
						/* 设置变量名 */
						this.option.legend.data[1] = 'Japan';
						/* 设置数据的名字 */
						this.option.series[1].name = 'Japan';
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'Korea') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						this.option.series[0].data = this.datas[4].Korea;
						/* 设置变量名 */
						this.option.legend.data[0] = 'Korea';
						/* 设置数据的名字 */
						this.option.series[0].name = 'Korea';
					} else {
						/* 设置数据 */
						this.option.series[1].data = this.datas[4].Korea;
						/* 设置变量名 */
						this.option.legend.data[1] = 'Korea';
						/* 设置数据的名字 */
						this.option.series[1].name = 'Korea';
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'India') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						this.option.series[0].data = this.datas[5].India;
						/* 设置变量名 */
						this.option.legend.data[0] = 'India';
						/* 设置数据的名字 */
						this.option.series[0].name = 'India';
					} else {
						/* 设置数据 */
						this.option.series[1].data = this.datas[5].India;
						/* 设置变量名 */
						this.option.legend.data[1] = 'India';
						/* 设置数据的名字 */
						this.option.series[1].name = 'India';
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'Russia') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						this.option.series[0].data = this.datas[6].Russia;
						/* 设置变量名 */
						this.option.legend.data[0] = 'Russia';
						/* 设置数据的名字 */
						this.option.series[0].name = 'Russia';
					} else {
						/* 设置数据 */
						this.option.series[1].data = this.datas[6].Russia;
						/* 设置变量名 */
						this.option.legend.data[1] = 'Russia';
						/* 设置数据的名字 */
						this.option.series[1].name = 'Russia';
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'Germany') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						this.option.series[0].data = this.datas[7].Germany;
						/* 设置变量名 */
						this.option.legend.data[0] = 'Germany';
						/* 设置数据的名字 */
						this.option.series[0].name = 'Germany';
					} else {
						/* 设置数据 */
						this.option.series[1].data = this.datas[7].Germany;
						/* 设置变量名 */
						this.option.legend.data[1] = 'Germany';
						/* 设置数据的名字 */
						this.option.series[1].name = 'Germany';
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'France') {
					//判断是第几个选择
					if (flag == 0) {
						/* 设置数据 */
						this.option.series[0].data = this.datas[8].France;
						/* 设置变量名 */
						this.option.legend.data[0] = 'France';
						/* 设置数据的名字 */
						this.option.series[0].name = 'France';
					} else {
						/* 设置数据 */
						this.option.series[1].data = this.datas[8].France;
						/* 设置变量名 */
						this.option.legend.data[1] = 'France';
						/* 设置数据的名字 */
						this.option.series[1].name = 'France';
					}
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
			},
			renderReport() {
				//console.log(this.datas)
				//设置显示的国家
				this.option.series[0].data = this.datas[0].China
				this.option.series[1].data = this.datas[1].America

				// 使用指定的配置项和数据显示图表。
				this.myChart.setOption(this.option);

			},
			createChart() {

				// 基于准备好的dom，初始化echarts实例
				this.myChart = this.$echarts.init(document.getElementById('box2'));


				this.option = {
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

	/* 下拉菜单定位 */
	.selectCountry {
		position: absolute;
		left: 80%;
		top: 8%;
		z-index: 999;
		float: right;
		display: block;
		width: 65px;
		height: 20px;
	}

	.selectCountry select {
		width: 65px;
		height: 22px;
		text-align: center;
		border: 1px solid skyblue;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		font-size: 14px;
		line-height: 20px;
	}

	/* 设置盒子样式 */
	#box2 {
		padding: 0px;
		margin: 0px;
		display: block !important;
	}

	/* 选择框 */

	#select2 {
		display: block;
		left: 48%;
		top: 8%;
	}

	#select3 {
		display: block;
		left: 68.5%;
		top: 8%;
	}
</style>
