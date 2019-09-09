<template>
	<div class="index">
		<div class="container">
			<h1>豆瓣电影数据可视化</h1>
			<h4>本网站由第一小组设计</h4>
			<button><a href="#tag">Start</a></button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Index',
	}
	
	
	
	
	
	
	
	
</script>

<style scoped>
	.index{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container{
		color: #FFF;
		border-radius: 10px;
		width: 500px;
		height: 300px;
		background-color: #000000;
		opacity: 0.3;
		border: 1px solid #808080;
		position: relative;
	}
	.container>h1{
		width: 100%;
		text-align: center;
		line-height: 100px;
	}
	.container>h4{
		width: 100%;
		text-align: center;
		line-height: 20px;
	}
	.container button{
		width: 90px;
		height: 50px;
		border-radius: 5px;
		background-color: #D8D8D8;
		border: none;
		font-size: 25px;
		position: absolute;
		bottom: 80px;
		left: 50%;
		margin-left: -45px;
		outline: none;    
	}
	.container button:hover{
		/* background-color: #000000; */
		background-color: #FFFFFF;
		/* color:#fff; */
	}
</style>
