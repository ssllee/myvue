<template>
  <div class="main">

  		<!-- 标题 start -->
	  	<header class="txc z_head">
			<div class="cl fl">
				<i class="glyphicon glyphicon-chevron-left" @click="clickBack('/order-search')"></i>
			</div>
			<div class="cr fr">&nbsp;</div>
			<div class="cc">我的订单</div>
	  	</header>
	  	<!-- 标题 end -->

  		<!--列表区域 start -->
		 <div class="listArea fakeParent" id="listid">
		 <!-- 固定区域，如果不设置fakeParent，则会整个浏览器窗口大小为加载区域 -->
		 	<ul v-for="(value,key) in theData" :id="key">
	 			<li class="hh1 line">
		 			<p class="hh1p"></p><span class="hh1sp">订单编号：</span>
		 			<a class="hh1a" href="javascript:;">{{value.exTradeId}}</a>
	 			</li>
				<li class="hh2 line">
					<span class="hh2sp">产品名称：</span>
					<span class="hh2sp2">{{value.productName}}</span>
				</li>
				<li class="hh3 line">
					<span class="hh3sp">客户名称：</span>{{value.customerName}}
				</li>
				<li class="hh5 line">
					<span class="hh5sp">装机地址：</span>
					<span class="hh5sp2">{{value.addrName}}</span> 
				</li>
				<li class="hh4 line">
					<div class="fl color-hiu hh4d">
						<span  class="hh4dsp">订单状态：</span>{{value.statusFlag}}
					</div>
					<div v-show="value.statusFlag == '已完成'">
						<div v-if="value.commentState == 1" class="fr rb"><a href="javascript:;" @click="clickToAssessSubmit('/assess-submit?orderNum='+value.orderNum+'&expNo='+value.expNo+'')">立即评价</a></div>
						<div v-else class="fr ra"><a href="javascript:;" @click="clickToAssessShow('/assess-show?orderNum='+value.orderNum+'')">查看评价</a></div>
					</div>
					<div class="fr ra1"><a href="javascript:;" @click="clickToFlow('/show-flow?orderNum='+value.orderNum+'&orderNum2='+value.exTradeId+'')">订单详情</a></div>
					
				</li>
				<li class="hh6 line">
					<div class="hhd6 color-hiu"><span class="frcl">下单时间：</span>{{value.ocAcceptDate}}</div>
				</li>
		 	</ul>

			<div class="fakeloader"></div><!-- 加载等待旋转图 -->
		</div>
		<!--列表区域 end -->
		
		<!-- 广告 bottom start -->
	  	<BottomAdvert></BottomAdvert>
  		<!-- 广告 bottom end -->
  </div>
</template>

<script>

import {autoAdapt,goToRouter,advertPosition,getOrderQueryStr} from '@/assets/util/web-util.js' 
import {getRootPath_ip} from '@/assets/util/util.js' 
import {config} from '@/assets/util/config.js' 

import BottomAdvert from '../advert/BottomAdvert.vue'

export default {
	  name: 'OrderDetail',
	  data () {
	    return {
	    	msg:"OrderDetail.vue"

	    	,theData:""//ul数据

	    }
	  }
	  ,methods: {
	  	
	  	//获取list数据
	  	loadListDate() {

	  		let url = 'static/data/order-list.json';//测试json 会自动加上myvue
	  		// let url = this.HOST + "/trade/queryOrder?flag=out"+getOrderQueryStr();//测试
	  		// let url = this.APIName + "/trade/queryOrder?flag=out"+getOrderQueryStr();//生产

	  		this.$http.get(url,{// post  测试 get
	  		
	  		}).then(res=>{
	  			let resData = res.data;//数据获取
  				if(resData.state==1){
	        		  this.theData = resData.rows;

	        		  //重构ul列表后需要重新定位广告
	        		  setTimeout(function(){
						 advertPosition();//广告位置是否浮动
					 },0);
	        	} else{
	    		   layer.open({
	    			  content: resData.message
	    			  ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
	    			  ,time: 2
				  });
	    	   }
	  		}).catch(error=>{
  				
	  		});

	  		
	  	}
	  	//路由跳转
	  	,clickBack: goToRouter
	  	//跳转到流程展示
	  	,clickToFlow: goToRouter
	  	//跳转到
	  	,clickToAssessSubmit: goToRouter
	  	//跳转到
	  	,clickToAssessShow: goToRouter
	  	
	  	//
	  }
	  //子组件集
	  ,components: {
	  	BottomAdvert
	  }
	  ,mounted() {
	  	
	  	//自适应
	  	// autoAdapt();
	  	
	  	//初始化数据
	  	this.loadListDate();

	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

/*订单列表区域 start*/

.color-bule {
	color: #64cbed;
}

.color-green {
	color: #019c29;
}

.color-orange {
	color: #fd6b00;
}

.z_head{
	background-color:#fe9901;
}

.listArea {
	overflow: hidden;
	padding-top: 0.9rem;/*18px;*/
	/* background-color:#fbfaf8; */
	min-height: 10rem;

	.line {
		border-bottom: 0.1rem solid #f6f6f6; /*2px*/
	    width: 95%;
	    margin:auto;
	}

	ul {
		margin: 0 0.8rem 0.9rem 0.8rem; /*0 22px 18px 22px;*/
		background-color: #f4f4f4;
		border-radius: 1.1rem;/*22px;*/
		list-style: none;
		border: 0.25rem solid #e1e0de;/*5px solid #fff;*/
	/* 	border-image-source:url(../../images/order/phone-line.png);
		border-image-width: 0 0 1.05rem 100%;0 0 21px 100%  top right bottom left */

		li {
			position: relative;
			display: table;
			table-layout: fixed;
			word-wrap: break-word;
		} 
	}

	.hh1 {
		height:4.5rem;
		font-size: 1.3rem; /* 30px; */
		line-height:4.5rem ; /*原6rem 120px; 改后为3.5rem 70px;*/
	    padding: 0.5rem 1.0rem; /* 24px; */
	    margin-top:0.8rem;
		background-color:#e5e5e5;

		.hh1a{
			display:block;
			float:left;
			width:60%;
		   font-size:1.1rem;
			color:#9a9a9a;
			line-height:2.0rem;
			margin-top:1.25rem;
			
		}
		.hh1sp{
			display:block;
			float:left;
			color:#000;
			margin-left:0.5rem;
			font-weight: 545;
		}
		.hh1p{
			float:left;
			width:2.8rem;
			height:2.8rem;
			background:url('~assets/images/order/sj-dd-1.png') no-repeat;
			background-size:100% 100%;
			margin-top:0.8rem;
		}
	}
	
	.hh2{
		margin-top:0.8rem;
	/* 	font-size: 1.3rem; */ /* 26px; */
		/* color: #d3d3d3; */
		color:#707070;
		line-height: 3.5rem; /* 70px; */
		padding: 0.6rem 1.0rem 0.6rem  1.0rem; /* 24px; */
		background-color:#fff;

		.hh2sp{
			float:left;
			color:#000;
			font-size:1.3rem;
			line-height:2.0rem;
			font-weight: 545;
		}
		.hh2sp2{
			float:left;
			width:70%;
			font-size:1.1rem;
			line-height:2.0rem;
		}
	}

	.hh3 {
		margin-top: 0.8rem;
		font-size: 1.1rem; /* 26px; */
		/* color: #d3d3d3; */
		color:#707070;
		padding: 0.6rem 1.0rem 0.6rem  1.0rem; /* 24px; */
		background-color:#fff;

		.hh3sp{
			color:#000;
			font-size:1.3rem;
			font-weight: 545;
		}
	}
	
	.hh4 {
		font-size: 1.3rem; /* 30px; */
		color: #000;
		line-height: 2.0rem; /* 60px; */
		padding:1.25rem 0 1.0rem 1.25rem; /* 24px; */
		margin-top: 1rem;/* 20px 0; */
		/* width: 100%; */
		background-color:#fff;

		.color-hiu{
			/* color:#d3d3d3; */
			color:#707070;
			font-size:1.1rem;
		}
		/*已评价*/
		.ra {
			padding:0 0.8rem;
			margin-right: 1.3rem; /* 60px; */
			background-color:#f7b135;
			border:solid 0.1rem #f7b135;
		     border-radius:0.5rem ;
		}
		/* 订单详情按钮 */
		.ra1 {
			color: #fff;
			padding:0 0.5rem;
			margin-right:1.0rem;
			/* margin-right: 2.3rem;  *//* 60px; */
			background-color:#f7b135;
			border:solid 0.1rem #f7b135;
		     border-radius:0.5rem ;
		}
		/* 订单详情按钮--只有一个按钮时-- */
		.ra2 {
			color: #fff;
			padding:0 0.5rem;
			margin-right: 1.3rem; /* 60px; */
			background-color:#f7b135;
			border:solid 0.1rem #f7b135;
		     border-radius:0.5rem ;
		}
		/*立即评价*/
		.rb {
			border: 0.1rem solid #f7b135;
			border-radius: 0.5rem; /* 30px; */
		    padding:0 0.5rem;
			text-align: center;
			margin-right: 1.3rem; /* 24px; */
			background-color:#f7b135;
			display: table;
		}
		.ra a {
			font-size:1.3rem;
			color:#fff;

			&:hover {
				color:#fff;
			}
		}
		.ra1 a,.ra2 a {
			font-size:1.3rem;
			color:#fff;
		}
		
		.rb a {
			color:#fff;

			&:hover {
				color:#fff;
			}
		}
		
		.hh4dsp{
			font-family: 'Verdana', 'Microsoft Yahei', sans-serif;
			font-size:1.3rem;
			font-weight: 545;
			color:#000;
		}
	}
	

	.hh5 {
		position: relative;
		/* width: 100%; */
		min-height:2.4rem;
		font-size: 1.3rem; /* 30px; */
		/* color: #d3d3d3; */
		color:#707070;
		line-height: 150%;
		/* padding-left: 5.0rem; 24px;
		padding-right: 2.5rem; 24px;
		padding-bottom:0.5rem; */
		padding: 1.0rem 0 1.0rem 3.0rem;
		margin-top:0.5rem;
		background-color:#fff;

		&:before {
			/* content:url(../../images/order/info1.png);
			vertical-align:middle;
			display:inline-block; */
			
			content: " ";
			background: url(~assets/images/order/sj-24x29.png) center no-repeat;
			background-size: 100% auto;
			left: 1.0rem; /* 30px; */
			top: 0.9rem; 
			height: 1.57rem; /* 29px; */
			width: 1.2rem; /* 24px; */
			position: absolute;
		}

		.hh5sp{
			float:left;
			font-family: 'Verdana', 'Microsoft Yahei', sans-serif;
			font-size:1.3rem;
			font-weight: 545;
			color:#000;
			
		}
		.hh5sp2{
			float:left;
			width:70%;
		    font-size:1.1rem;
		}
	}
	
	.hh6 {
		font-size: 1.3rem; /* 26px; */
		color: #000;
		line-height: 4.5rem; /* 90px; */
		/* padding: 0 2.5rem 0 3.3rem; */
		padding-left:1.0rem;
	/* 	width: 100%; */

		.fr {
			position: relative;
		}
		.hhd6:before {
			/* content:url(../../images/order/info2.png);
			vertical-align:middle;
			display:inline-block;
			padding-right: 0.5rem;
			line-height: 4.5rem; */
			
		    content: " ";
		   /*  background: url(../../images/order/info2.png) center no-repeat;
		    background-size: 100% auto; */
		    position: absolute;
		    left: -2rem; /* -40px; */
		    top: 1.45rem; /* 29px; */
		    height: 1.6rem; /* 29px; */
		    width: 1.6rem; /* 29px; */
		}
		.hhd6 .frcl{
			font-family: 'Verdana', 'Microsoft Yahei', sans-serif;
			font-weight: 545;
			color:#000;
			font-size:1.3rem;
		}
	}

	
	
}


/*订单列表区域 end*/
</style>
