$(document).ready(function(){
	
	var index
	/* 点击对应盒子显示 */
	$('.contentLeft').find('li').click(function(){
		index = $(this).prevAll().length
		
		//console.log(index)
		//console.log($('.contentRight').find('div.box'))
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