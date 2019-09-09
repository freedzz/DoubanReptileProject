//得到显示的标签
var box = document.getElementById('box7')
//console.log($("#box"))
var btn = $("input:eq(6)");

// 基于准备好的dom，初始化echarts实例
var option7 = echarts.init(box);
option7.showLoading();
btn.on("click", function() {
	$.get('http://localhost:8080/module7', function(data) {
		option7.dispose();
		option7=echarts.init(box);

		data = JSON.parse(data)
		//console.log(data)

		setdata(data)
	});
});

function setdata(data) {
	option7.hideLoading();

// 	echarts.util.each(data.children, function(datum, index) {
// 		index % 2 === 0 && (datum.collapsed = true);
// 	});
// 
	option7.setOption(option = {
		tooltip: {
			trigger: 'item',
			triggerOn: 'mousemove'
		},
		series: [{
			type: 'tree',

			data: [data],

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
