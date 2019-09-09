 //得到显示的标签
    var myChart = echarts.init(document.getElementById('box2'))
    //console.log($("#box"))
    var btn = $("input:eq(1)");

	var ItmesJson
	
  	let name1 = $('#select2').find('select')
  	let name3 = $('#select3').find('select')
  	/* 设置切换城市 */
  	/* 第一个按钮*/
  	
  	name1.on("change",function(){
  		ChangeCountry(name1.val(), name3.val(), 0)
  	})
  	name3.on("change",function(){
  		ChangeCountry(name3.val(), name1.val(), 1)
  	})
	
	
	function ChangeCountry(name,anotherName,flag) {
		if (name == 'China') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				option2.series[0].data = ItmesJson[0].China;
				/* 设置变量名 */
				option2.legend.data[0] = 'China';
				/* 设置数据的名字 */
				option2.series[0].name = 'China';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[0].China;
				/* 设置变量名 */
				option2.legend.data[1] = 'China';
				/* 设置数据的名字 */
				option2.series[1].name = 'China';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
		if (name == 'America') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				option2.series[0].data = ItmesJson[1].America;
				/* 设置变量名 */
				option2.legend.data[0] = 'America';
				/* 设置数据的名字 */
				option2.series[0].name = 'America';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[1].America;
				/* 设置变量名 */
				option2.legend.data[1] = 'America';
				/* 设置数据的名字 */
				option2.series[1].name = 'America';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
		if (name == 'England') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				console.log(ItmesJson)
				console.log(ItmesJson[2])
				option2.series[0].data = ItmesJson[2].England;
				/* 设置变量名 */
				option2.legend.data[0] = 'England';
				/* 设置数据的名字 */
				option2.series[0].name = 'England';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[2].England;
				/* 设置变量名 */
				option2.legend.data[1] = 'England';
				/* 设置数据的名字 */
				option2.series[1].name = 'England';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
		if (name == 'Japan') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				option2.series[0].data = ItmesJson[3].Japan;
				/* 设置变量名 */
				option2.legend.data[0] = 'Japan';
				/* 设置数据的名字 */
				option2.series[0].name = 'Japan';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[3].Japan;
				/* 设置变量名 */
				option2.legend.data[1] = 'Japan';
				/* 设置数据的名字 */
				option2.series[1].name = 'Japan';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
		if (name == 'Korea') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				option2.series[0].data = ItmesJson[4].Korea;
				/* 设置变量名 */
				option2.legend.data[0] = 'Korea';
				/* 设置数据的名字 */
				option2.series[0].name = 'Korea';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[4].Korea;
				/* 设置变量名 */
				option2.legend.data[1] = 'Korea';
				/* 设置数据的名字 */
				option2.series[1].name = 'Korea';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
		if (name == 'India') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				option2.series[0].data = ItmesJson[5].India;
				/* 设置变量名 */
				option2.legend.data[0] = 'India';
				/* 设置数据的名字 */
				option2.series[0].name = 'India';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[5].India;
				/* 设置变量名 */
				option2.legend.data[1] = 'India';
				/* 设置数据的名字 */
				option2.series[1].name = 'India';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
		if (name == 'Russia') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				option2.series[0].data = ItmesJson[6].Russia;
				/* 设置变量名 */
				option2.legend.data[0] = 'Russia';
				/* 设置数据的名字 */
				option2.series[0].name = 'Russia';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[6].Russia;
				/* 设置变量名 */
				option2.legend.data[1] = 'Russia';
				/* 设置数据的名字 */
				option2.series[1].name = 'Russia';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
		if (name == 'Germany') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				option2.series[0].data = ItmesJson[7].Germany;
				/* 设置变量名 */
				option2.legend.data[0] = 'Germany';
				/* 设置数据的名字 */
				option2.series[0].name = 'Germany';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[7].Germany;
				/* 设置变量名 */
				option2.legend.data[1] = 'Germany';
				/* 设置数据的名字 */
				option2.series[1].name = 'Germany';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
		if (name == 'France') {
			//判断是第几个选择
			if(flag == 0){
				/* 设置数据 */
				option2.series[0].data = ItmesJson[8].France;
				/* 设置变量名 */
				option2.legend.data[0] = 'France';
				/* 设置数据的名字 */
				option2.series[0].name = 'France';
			}else{
				/* 设置数据 */
				option2.series[1].data = ItmesJson[8].France;
				/* 设置变量名 */
				option2.legend.data[1] = 'France';
				/* 设置数据的名字 */
				option2.series[1].name = 'France';
			}
			// 使用指定的配置项和数据显示图表。
			myChart.setOption(option2);
		}
	}
	




    // 基于准备好的dom，初始化echarts实例
    option2 = {
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
    btn.on('click', function (data) {
        $.get("http://localhost:8080/Module2", function (data) {
            //console.log(data);
            renderReport(data);
        })
    })

    function renderReport(data) {

         ItmesJson = JSON.parse(data);

        //console.log(weatherItmesJson);
        //console.log(typeof weatherItmesJson);
        option2.series[0].data = ItmesJson[0].China
        option2.series[1].data = ItmesJson[1].America
        //console.log(weatherItmesJson[0].MoviesNum)

        myChart.setOption(option2);
    }