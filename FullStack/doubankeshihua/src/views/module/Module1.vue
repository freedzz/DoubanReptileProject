<template>
<div class="module">
	<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
	<div class="contentRight">
		<div class="box" id="box1"></div>
	</div>
	<div class="selectCountry" id = "select1">
		<select v-model="country" >
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
</div>
</template>

<script>

	export default{
		name:"Echars",
		data(){
			return {
				datas:null,
				dataAxis:['9.5-10', '9.0-9.5', '8.5-9.0', '8.0-8.5', '7.5-8.0', '7.0-7.5', '6.5-7.0', '6.0-6.5', '5.5-6.0',
					'5.0-5.5', '4.5-5.0', '4.0-4.5', '3.5-4.0', '3.0-3.5',
					'2.5-3.0', '2.0-2.5', '1.5-2.0', '1.0-1.5', '0.5-1.0' /* , '0-0.5' */
				],
				option:Object,
				myChart:null,
				country:"China"
			}
		},
		created() {
			this.$axios.get('http://localhost:8080/Module1')
			.then(res =>{
				//得到数据
				this.datas = res.data

			})
		},
		watch:{
			country(){
				//console.log(this.country)
				this.ChangeCountry(this.country)
			}
		},
		mounted() {
			this.createChart()
			
			setTimeout(()=>{
			   this.renderReport()
			},20)
			
		},
		computed:{
			WatchChange(){
				$('#select1').find('select').on("change",function(){
					name = $('#select1').find('select').val()
					this.ChangeCountry(name)
				})
				return 0
			}
			
		},
		methods:{
			ChangeCountry(name){
				if (name == 'America') {
					//传入参数
					
					this.option.series[0].data = this.datas[1].America;
					this.option.series[2].data = this.datas[1].America;
					
					//设置显示的国家
					this.option.legend.data = ['美国'];
					this.option.series[0].name = '美国';
					this.option.series[2].name = '美国';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
					
				}
				if (name == 'China') {
					//传入参数
					
					this.option.series[0].data = this.datas[0].China;
					this.option.series[2].data = this.datas[0].China;
					
					//设置显示的国家
					this.option.legend.data = ['中国'];
					this.option.series[0].name = '中国';
					this.option.series[2].name = '中国';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'England') {
					//传入参数
					
					this.option.series[0].data = this.datas[2].England;
					this.option.series[2].data = this.datas[2].England;
					
					//设置显示的国家
					this.option.legend.data = ['英国'];
					this.option.series[0].name = '英国';
					this.option.series[2].name = '英国';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'Japan') {
					//传入参数
					
					this.option.series[0].data = this.datas[3].Japan;
					this.option.series[2].data = this.datas[3].Japan;
					
					//设置显示的国家
					this.option.legend.data = ['日本'];
					this.option.series[0].name = '日本';
					this.option.series[2].name = '日本';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'Korea') {
					//传入参数
					this.option.series[0].data = this.datas[4].Korea;
					this.option.series[2].data = this.datas[4].Korea;
					
					//设置显示的国家
					this.option.legend.data = ['韩国'];
					this.option.series[0].name = '韩国';
					this.option.series[2].name = '韩国';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'India') {
					//传入参数
					this.option.series[0].data = this.datas[5].India;
					this.option.series[2].data = this.datas[5].India;
					
					//设置显示的国家
					this.option.legend.data = ['印度'];
					this.option.series[0].name = '印度';
					this.option.series[2].name = '印度';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'Russia') {
					//传入参数
					this.option.series[0].data = this.datas[6].Russia;
					this.option.series[2].data = this.datas[6].Russia;
					
					//设置显示的国家
					this.option.legend.data = ['俄罗斯'];
					this.option.series[0].name = '俄罗斯';
					this.option.series[2].name = '俄罗斯';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'Germany') {
					//传入参数
					this.option.series[0].data = this.datas[7].Germany;
					this.option.series[2].data = this.datas[7].Germany;
					
					//设置显示的国家
					this.option.legend.data = ['德国'];
					this.option.series[0].name = '德国';
					this.option.series[2].name = '德国';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
				if (name == 'France') {
					//传入参数
					this.option.series[0].data = this.datas[8].France;
					this.option.series[2].data = this.datas[8].France;
					
					//设置显示的国家
					this.option.legend.data = ['法国'];
					this.option.series[0].name = '法国';
					this.option.series[2].name = '法国';
					// 使用指定的配置项和数据显示图表。
					this.myChart.setOption(this.option);
				}
			},
			renderReport(){
				let ItmesJson = this.datas
				   
				//设置阴影
				var yMax = 1000;
				var dataShadow = [];	
				//传入参数
				this.option.series[0].data = this.datas[0].China;
				this.option.series[2].data = this.datas[0].China;
					
				//设置显示的国家
				this.option.legend.data.push('中国')
				this.option.series[0].name = '中国';
				this.option.series[2].name = '中国';
					
				//设置每个柱状图的阴影
				// for (var i = 0; i < this.datas[0].length; i++) {
				// 	dataShadow.push(yMax);
				// }
					
				// 使用指定的配置项和数据显示图表。
				this.myChart.setOption(this.option);
				
				// 设置点击图标缩小
				var zoomSize = 6;
				this.myChart.on('click', (params) => {
					//console.log(this.dataAxis)
					//console.log(this.dataAxis[8])
					//console.log(this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
					this.myChart.dispatchAction({
						type: 'dataZoom',
						startValue: this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
						endValue: this.dataAxis[Math.min(params.dataIndex + zoomSize / 2, this.option.series[0].data.length - 1)]
					});
				});
	
			},
			createChart(){
				
				// 基于准备好的dom，初始化echarts实例
				this.myChart = this.$echarts.init(document.getElementById('box1'));
				
					
				this.option = {
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
						data: this.dataAxis,
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
								/* 鼠标覆盖颜色 */
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
							},
						},
						/* 柱状体阴影颜色 */
						{
							//name: '美国',
							type: 'bar',
							itemStyle: {
								normal: {
									 color: 'rgba(0,0,0,0.05)'
								}
							},
							barGap: '-100%',
							barCategoryGap: '40%',
							// data: dataShadow,
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
					
				
			}
		}
	}
	
</script>

<style scoped>
	.module{
		width: 100%;
		height: 100%;
	}
	.contentRight{
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
	.box>div{
		width: 100%;
		height: 100%;
	}
	canvas{
		width: 100%;
		height: 100%;
	}
	/* 下拉菜单定位 */
	.selectCountry {
		position: absolute;
		left: 80%;
		top: 8%;
		z-index: 999;
		float: right;
		display: none;
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
	#box1{
		padding: 0px;
		margin: 0px;
	}
	
	#box1 {
		display: block;
	}
</style>
