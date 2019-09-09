$(function(){
	
	
	var index
	/* 点击对应盒子显示 */
	$(".box").find("span.title").click(function(){
		index = $(this).prevAll().length
		let flag = $(this).parents("li").prevAll().length
		if(flag == 1 ){
			index = index + 3;
		}
		if(flag == 2){
			index = index + 5;
		}
		//console.log(index)
		$('.contentRight').find('div.box').hide()
		$('.contentRight').find('div.box:eq('+ index +')').show()
		$('.selectCountry').hide();
		if(index == 0){
			$('#select1').show();
		}
		if(index==1){
			$('#select2').show();
			$('#select3').show();
		}
		
	})
		
});