<template>
  <div id="app">
	<index></index>
	<Home></Home>
  </div>
</template>
<script>
import Index from './views/index.vue'
import Home from './views/Home.vue'
export default {
		name: "app",
		components:{
			"index":Index,
			Home
		}
	}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

</style>
