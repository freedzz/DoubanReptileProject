<template>
	<div class="echars">
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
		<div class="contentRight">
			<div class="box" id="box5"></div>
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
			this.$axios.get('http://localhost:8080/Module5')
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
				var weatherItmesJson = this.datas;
				
				//console.log(weatherItmesJson)
				var arr = weatherItmesJson[0].MoviesNum;
				var newArr = arr.slice(1);
				
				this.option.series[0].data = newArr
				// 使用指定的配置项和数据显示图表。
				this.myChart.setOption(this.option);

			},
			createChart() {

				// 基于准备好的dom，初始化echarts实例
				this.myChart = this.$echarts.init(document.getElementById('box5'));
				
				
				
				var posList = [
				    'left', 'right', 'top', 'bottom',
				    'inside',
				    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
				    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
				];
				
				box5.configParameters = {
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
				        options: echarts.util.reduce(posList, function (map, pos) {
				            map[pos] = pos;
				            return map;
				        }, {})
				    },
				    distance: {
				        min: 0,
				        max: 100
				    }
				};
				
				box5.config = {
				    rotate: 90,
				    align: 'left',
				    verticalAlign: 'middle',
				    position: 'insideBottom',
				    distance: 15,
				    onChange: function () {
				        var labelOption = {
				            normal: {
				                rotate: box5.config.rotate,
				                align: box5.config.align,
				                verticalAlign: box5.config.verticalAlign,
				                position: box5.config.position,
				                distance: box5.config.distance
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
				
				var labelOption = {
				    normal: {
				        show: true,
				        position: box5.config.position,
				        distance: box5.config.distance,
				        align: box5.config.align,
				        verticalAlign: box5.config.verticalAlign,
				        rotate: box5.config.rotate,
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
					title: {
						text: '近十年中国电影评分和数量分析'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: ['Forest', 'Steppe', 'Desert', 'Wetland']
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
						data: [ /* '0-1', */ '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: 'Forest',
							type: 'bar',
							barGap: 0,
							label: labelOption,
							data: []
						},

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
	#box5 {
		padding: 0px;
		margin: 0px;
		display: block !important;
	}
</style>
