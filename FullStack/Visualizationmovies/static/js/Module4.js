$(document).ready(function(){
    //得到显示的标签
    var box = document.getElementById('box4')
    //console.log($("#box"))
    var btn4 = $("input:eq(3)");

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(box);


    var yMax = 2500;
    var dataShadow = [];


    var tempOptions = {
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
        series: [
            // { // For shadow
            //     type: 'bar',
            //     itemStyle: {
            //         normal: {
            //             color: 'rgba(0,0,0,0.05)'
            //         }
            //     },
            //     barGap: '-100%',
            //     barCategoryGap: '40%',
            //     data: dataShadow,
            //     animation: false
            // },
            {
				name:'电影数量',
                type: 'bar',
                itemStyle: {
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
				}
            }
        ]
    };
    //点击显示标签
    btn4.on("click", function () {
        $.get("http://localhost:8080/Module4", function (data) {
            renderReport(data);
        })
    })


    function renderReport(data) {

        var CountryItemsJson = JSON.parse(data); //将字符串转成json对象
            for(var i=0;i<CountryItemsJson.length;i++){
                for(var key in CountryItemsJson[i]){
                    
                    tempOptions.xAxis.data[i] = key;
                    tempOptions.series[0].data.push(CountryItemsJson[i][key][0]);
                }
            }
        myChart.setOption(tempOptions);
    }
})