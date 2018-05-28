<template>
  <div class="main">
  		  	
	<!-- 广告 bottom start -->
  	<div class="advert-bottom width100 opacity-0"><!--dp-none position-fiexd opacity-0-->
  		<!-- <i class="glyphicon glyphicon-remove"></i> -->
  		<img src="~assets/images/order/sj-bottom.png"/>
  		<div class="rect"></div>
  	</div>
  	<!-- 广告 bottom end -->
		
  </div>
</template>

<script>

import {advertPosition} from '@/assets/util/web-util.js' 

export default {
	  name: 'BottomAdvert',
	  data () {
	    return {
	    }
	  }
	  ,methods: {
	  }
	  ,mounted() {
	  	// console.log("BottomAdvert mounted");
	  	  	
	   //执行广告定位
		 //等页面事件都执行完，再广告浮动
		 setTimeout(function(){
			 advertPosition();//广告位置是否浮动
		 },0);

	  }
}
</script>

<style scoped>

/*底部广告图片*/
.advert-bottom img{
    height:auto;
    width:100%;
    margin-top: 1rem;
}
/*底部广告图片关闭按钮*/
.advert-bottom i{
    position: absolute;
    right: 0.5rem;
    top: 1.3rem;
    color: #fff;
}
/*底部广告矩形占位*/
.advert-bottom .rect{
    background-color:#fe9900;
    height:1.5rem;
}
/*底部广告整体浮动*/
.position-fiexd{
    position: fixed;
    bottom: 0;
}
</style>
