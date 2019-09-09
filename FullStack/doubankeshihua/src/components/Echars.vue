<template>
	<div class="echars">
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
		<div class="contentRight">
			<div class="box" id="box1"></div>
			<div class="box" id="box2"></div>
			<div class="box" id="box3"></div>
			<div class="box" id="box4"></div>
			<div class="box" id="box5"></div>
			<div class="box" id="box6"></div>
			<div class="box" id="box7"></div>
		</div>
		<div class="selectCountry" id="select1">
			<select>
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
		<div class="selectCountry" id="select2">
			<select>
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
			<select>
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
		mounted: function() {
			
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
		margin: 0 auto;
		padding: 0px;
		display: none;
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
		left: 62%;
		top: 5px;
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
	#box1,
	#box2,
	#box3,
	#box4,
	#box5,
	#box6,
	#box7,
	#box8 {
		padding: 0px;
		margin: 0px;
	}

	#box1 {
		display: block;
	}

	/* 选择框 */

	#select2 {
		display: none;
		left: 26%;
		top: 5px;
	}

	#select3 {
		display: none;
		left: 48%;
		top: 5px;
	}
</style>
