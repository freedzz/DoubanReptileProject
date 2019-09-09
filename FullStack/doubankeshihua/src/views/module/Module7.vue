<template>
	<div class="echars">
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
		<div class="contentRight">
			<div class="box" id="box7"></div>
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
			this.$axios.get('http://localhost:8080/Module7')
				.then(res => {
					//得到数据
					this.datas = res.data

				})
		},
		mounted() {
			setTimeout(() => {
				this.createChart()
			}, 20)

		},
		methods: {
			createChart() {

				// 基于准备好的dom，初始化echarts实例
				this.myChart = this.$echarts.init(document.getElementById('box7'));
				this.myChart.setOption(this.option = {
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
						type: 'tree',
				
						data: [this.datas],
				
						top: '1%',
						left: '7%',
						bottom: '1%',
						right: '20%',
				
						symbolSize: 7,
				
						label: {
							normal: {
								position: 'left',
								verticalAlign: 'middle',
								align: 'right',
								fontSize: 9
							}
						},
				
						leaves: {
							label: {
								normal: {
									position: 'right',
									verticalAlign: 'middle',
									align: 'left'
								}
							}
						},
				
						expandAndCollapse: true,
						animationDuration: 550,
						animationDurationUpdate: 750
					}]
				});


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
	#box7 {
		padding: 0px;
		margin: 0px;
		display: block !important;
	}
</style>
