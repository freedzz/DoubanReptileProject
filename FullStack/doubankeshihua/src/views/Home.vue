<template>
	<div class="home" id="tag">
		<div class="container">
			<div class="leftContent">
				<h1 class="leftContentTitle" @click="$router.push('/')">
					第一小组
				</h1>
				<div class="leftContentMain">
					<ul>
						<li v-for="(item,index) in titles" :key="index">
							<ItemList :item="item"></ItemList>
						</li>
						
					</ul>
				</div>
			</div>
			<div class="rightContent">
				<div class="rightContentTop">
					<div class="title">
						<h2>豆瓣电影数据可视化分析平台</h2>
					</div>
				</div>
				<div class="rightContentMain">
					<!-- <Echars></Echars> -->
					<router-view></router-view>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	// @ is an alias to /src
import ItemList from '@/components/ItemList.vue'
import Echars from '@/components/Echars.vue'
export default {
  name: 'home',
  components: {
    ItemList,
	Echars
  },
  data(){
	  return {
		  titles:[
			  {title:"近十年全世界电影分析",icon:"bar-chart",child:[
				   {tip:"影评分和电影数量分析",id:1},
				   {tip:"影评分和电影数量对比分析",id:2},
				   {tip:"近十年每年发行的电影分析",id:3}
			  ]},
			  {title:"近十年中国电影分析",icon:"area-chart",child:[
				  {tip:"近十年中国发行的电影分析",id:4},
				  {tip:"近十年每年中国电影分布图",id:5}
			  ]},
			  {title:"2019年电影分析",icon:"pie-chart",child:[
				  {tip:"2019每个国家的电影数量分析",id:6},
				  {tip:"2019年评分5分以下的电影名称",id:7}
			  ]},
		  ]
	  }
  },
}

</script>
<style scoped>
	.home{
		width: 100%;
		height: 100%;
	}
	ul,
	li {
		list-style: none;
	}
	.container {
		display: flex;
		width: 100%;
		height: 100%;
	}

	/* 左边区域 */
	.container .leftContent {
		width: auto;
		height: 100%;
		
		background-image: url(../assets/leftBac.png);
		background-size: 100%;
	}
	
	/* 左侧大标题 */
	.container .leftContent .leftContentTitle {
		color: white;
		text-align: center;
		line-height: 80px;
	}
	.container .leftContent .leftContentTitle:hover{
		cursor: pointer;
	}
	.leftContent .leftContentMain{
		width: 100%;
	}
	.leftContent .leftContentMain ul li {
		height: 100%;
		width: 100%;
		color: white;
		text-align: center;
		position: relative;
	}
	


	/* 右边区域 */
	.container .rightContent {
		width: 100%;
		height: auto;
		background-color: white;
	}
	.rightContent .rightContentTop{
		width: 100%;
		height: auto;
		background-color: rgb(29, 35, 55);
	}
	.rightContent .rightContentTop .title h2{
		color: white;
		line-height: 50px;
		width: 100%;
		text-align: center;
	}
	
	.rightContentMain{
		width: 100%;
		height: calc(100% - 50px);
		/* background-image: url(../assets/可视化2.jpg); */
		background-repeat: no-repeat;
		background-size: 100%;
		position: relative;
	}

</style>
