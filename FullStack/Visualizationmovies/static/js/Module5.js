$(document).ready(function(){
	var myChart = echarts.init(document.getElementById('box5'));
	var btn = $("input:eq(4)");
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
	        myChart.setOption({
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
	
	option5 = {
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
	            mark: {show: true},
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    calculable: true,
	    xAxis: [
	        {
	            type: 'category',
	            axisTick: {show: false},
	            data: [/* '0-1', */'1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10']
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value'
	        }
	    ],
	    series: [
	        {
	            name: 'Forest',
	            type: 'bar',
	            barGap: 0,
	            label: labelOption,
	            data: []
	        },
	       
	    ]
		
	};
	
	btn.on("click",function(){
		$.get("http://localhost:8080/Module5",function(data){
			//console.log(data);
			renderReport(data);
		})
	})
	
	function renderReport(data){
	
		var weatherItmesJson = JSON.parse(data);
		
		//console.log(weatherItmesJson)
		var arr = weatherItmesJson[0].MoviesNum;
		var newArr = arr.slice(1);
		
		option5.series[0].data = newArr
		//console.log(weatherItmesJson[0].MoviesNum)
		
	 myChart.setOption(option5);
	 }
})
		

	