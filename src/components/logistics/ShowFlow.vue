<template>
  <div class="main">
  	<!-- 标题 start -->
  	<header class="txc">
		<div class="cl fl"  @click="clickBack('/order-detail')"><i class="glyphicon glyphicon-chevron-left"></i></div>
		<div class="cr fr">&nbsp;</div>
		<div class="cc">订单详情</div>
  	</header>
  	<!-- 标题 end -->
		
	<section>
  		<!-- start -->
  		<div class="flowtop">
  			<div class="t1 line pd-left-10 ps-relative">
  				<span class="circle"></span>
  				<span class="ft">订单信息</span>
  			</div>
  			<div class="t2 pd-left-10">
  				<div class="ll">
  					<span class="ft1">NO.</span>
  					<span class="ft2">订单编号:</span>
  				</div class="rr">
  				<div class="ft3 showNumber">{{orderNum2}}</div>
  			</div>
  		</div>
		<!-- end -->
		
		<!--流程展示区 start-->
		<div class="flowtest fakeParent">
			<!-- 加载等待 -->
  			<div class="fakeloader"></div>
		</div>
		<!--流程展示区 start-->
  	</section>
	

	<!-- 广告 bottom start -->
  	<BottomAdvert></BottomAdvert>
	<!-- 广告 bottom end -->
	
  </div>
</template>

<script>

import {autoAdapt,goToRouter,advertPosition} from '@/assets/util/web-util.js' 
import {getRootPath_ip,checkNullOrEmptyStr} from '@/assets/util/util.js' 
import {config} from '@/assets/util/config.js' 

import BottomAdvert from '../advert/BottomAdvert.vue'

import '@/assets/util/plugin/flowplugin/css/flowplugin.css'//流程插件样式
import '@/assets/util/plugin/flowplugin/js/flowplugin.js'//流程插件


export default {
	  name: 'ShowFlow',
	  data () {
	    return {
	    	msg:"ShowFlow.vue"

	    	,imgPath:'static/flow/'//供插件使用，图片路径

	    	,orderNum: this.$route.query.orderNum // $route 不是 $router
	    	,orderNum2: this.$route.query.orderNum2 //

	    	,theData: ''//flow data
	    }
	  }
	  ,methods: {
	  	//路由跳转
	  	clickBack: goToRouter
	  	//获取list数据
	  	,loadFlowDate() {
	  		let url = 'static/data/flow.json';//测试json 会自动加上myvue
	  		// let url = this.HOST + "/process/queryProcess";//测试
			// let url = this.APIName + "/process/queryProcess";//生产
	  		
	  		this.$http.get(url,{// post  测试 get
		  			flag:'out',
	  				orderNum: this.orderNum
	  		}).then(res=>{
	  			let resData = res.data;//数据获取
	  			//debugger;
  				if(resData.state==1){
  					this.theData = resData;
	        		this.makeFlowArea();

	        		//重构ul列表后需要重新定位广告
	        		setTimeout(function(){
						 advertPosition();//广告位置是否浮动
					},0);
	        	} else if (state == 0){
		        	  layer.open({
		    			  content: resData.message
		    			  ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
		    			  ,time: 3
					  });
	            }
	  		}).catch(error=>{
  				
	  		});

	  		
	  	}
	  	//展示数据
		,makeFlowArea() {
			var opt = {
					"jsonDate":this.theData,//json数据
					"imgPath":this.imgPath, //图片路径
					"imgType":"png" //图片类型
				};
			
			$(".flowtest").flowplugin(opt);
			
			//单页面特殊处理广告位重新加载
			advertPosition();
		}
	  	//
	  	//
	  }
	  //子组件集
	  ,components: {
	  	BottomAdvert
	  }
	  ,mounted() {
	  	
	  	//自适应
	  	// autoAdapt();

	  	//初始化
	  	this.loadFlowDate();

	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.flowtop {
    /* 240px */
    margin: 1rem 2rem 0;
    background-color: #fff;


	p {
		font-size: 1.5rem;/* 30px; */
		color:#8b6d57;
		position: absolute;
		top: 3.5rem; /* 60px; */
		left: 18%;/* 160px; */
	}
	.t1 {
		min-height: 3rem;
		line-height: 3rem;
	}
	.t2 {
		line-height: 1.5rem;
		overflow: hidden;
		padding-top: .8rem;
		padding-bottom: .8rem;
		padding-right: .6rem;
		display: table;
		/* vertical-align: middle; */
		table-layout: fixed;
		word-wrap: break-word;
		width: 100%;
	}
	.line {
		border-bottom: 1px solid #ff6733;
	}

	.t1 img {
		width: .45rem;
		height: .45rem;
		position: absolute;
		top: 0.7rem;
	}

	.t1 .circle{
	    position: absolute;
	    background-color: red;
	    height: .5rem;
	    width: .5rem;
	    display: block;
	    border-radius: .5rem;
	    top: 50%;
	    transform: translateY(-50%);
	}
	.t1 .ft {
		font-size: 1.1rem;
		color:#ff6733;
		padding-left: 1rem;
	}

	.t2 .ll {
		/* float: left; */
		width: 7.5rem;
		display: table-cell;
	}
	.t2 .ft1 {
		font-size: .8rem;
		color: #a9a8a8;
		
	}
	.t2 .ft2 {
		font-size: 1rem;
		color: #000;
	}
	.t2 .ft3 {
		font-size: 1.1rem;
		color:#000;
		/* display: table-cell; */
		/* vertical-align: middle; */
		/* table-layout: fixed; */
		/* word-wrap: break-word; */
		/* width: 65%; */
	}

}

.pd-left-10 {padding-left: .6rem;}

</style>
