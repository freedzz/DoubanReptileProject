<template>
<div class="box">
	
		<div class="leftContentMainTitle" >
			<div class="itemTitle" >
			<i :class="'fa fa-'+item.icon" aria-hidden="true"></i>
			<span class="Itemtitle">{{item.title}}</span>
			<i @click="isShowItem = !isShowItem" 
			class="fa fa-angle-up" 
			:class="{'translateAngle':isShowItem}" 
			aria-hidden="true"></i>
		</div>
		<div class="itemList" v-show="isShowItem">
			<router-link class="title"
			tag="span"
			v-for="(tips,i) in item.child"
			:key="i" 
			:to="'module'+ tips.id"
			>{{tips.tip}}</router-link>
			<!-- <span
			class="title"
			v-for="(tips,i) in item.child"
			:key="i" 
			>{{tips.tip}}</span> -->
		</div>
	</div>
	
	
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
	  return {
		  isShowItem:false,
		  ShowNumber:0,
	  }
  },
  props: {
    item:Object,
  },
	methods:{
		
	}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 外层大盒子 */
	.leftContentMainTitle{
		display: inline-block;
		text-align: left;
	}
	.itemTitle{
		width: 200px;
		margin: 0px 10px;
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
	}
	/* 点击添加背景 */
	.addclass{
		background-image: url(../assets/xuanzhong1.png);
		background-size: 100% 100%;
	}
	/* 点击选中三角 */
	.translateAngle{
		transform: rotate(180deg);
	}
	.leftContentMainTitle>span{
		display: inline-block;
		width: 150px;
	}
	.leftContent .leftContentMain ul li .Itemtitle {
		text-align: left;
		line-height: 52px;
		font-size: 14px;
		margin-left: 10px;
		/* 超出文字隐藏 */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.itemTitle>i:last-child{
		position: absolute;
		top: 17px;
		right: 20px;
		text-align: right;
	}
	.itemTitle>i:last-child:hover{
		cursor: pointer;
	}
	/* 弹窗 */
	.itemList{
		display: inline-block;
	}
	.itemList>.title{
		text-align: left;
		line-height: 52px;
		font-size: 14px;
		margin-left: 10px;
		width: 160px;
		display: block;
		padding: 0px 20px;
		/* 超出文字隐藏 */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.itemList>.title:hover{
		/* background-image: url(../assets/xuanzhong1.png);
		background-size: 100% 100%; */
		cursor: pointer;
	}
	/* 选中样式 */
	.itemList .active{
		background-image: url(../assets/xuanzhong1.png);
		background-size: 100% 100%;
	}
	.leftContent .leftContentMain ul li {
		height: 100%;
		width: 100%;
		color: white;
		text-align: center;
		position: relative;
	}
</style>
