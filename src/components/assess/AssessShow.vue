<template>
  <div class="main">
  	<!-- 标题 start -->
  	<header class="txc">
		<div class="cl fl" @click="clickBack('/order-detail')"><i class="glyphicon glyphicon-chevron-left"></i></div>
		<div class="crr fr">&nbsp;</div>
		<div class="cc">我的评价</div>
		
  	</header>
  	<!-- 标题 end -->
		
	<section>
	   <div class="z_evaluation">
	        <div class="z_veap">
	           <div class="z_veapsp1"><div><!-- 横线 --></div></div>
	           <div class="z_veapsp2 font-space-2px">您对本次服务的评价</div>
	           <div class="z_veapsp1"><div><!-- 横线 --></div></div>
	        </div>
	    </div>
	  
		<form  id="submitForm">
			<ul class="totalEval"><!-- #menu 这个会有默认样式，不要使用 -->
				<li id="3" :class="[isSelectArr[2]]">好评(9-10分)</li>
				<li id="2" :class="[isSelectArr[1]]">中评(7-8分)</li>
				<li id="1" :class="[isSelectArr[0]]">差评(1-6分)</li>
			</ul>	
			<div class="varea font-space-2px">
				<div class="a-row ">
					<div class="row-left">产品评价</div>
					<div class="row-right">
						<div id="demo-service" class="fl ratyWidth"></div>
					    <div id="hint-service" class="fl fontWidth"></div>
					</div>
				</div>
				<div class="a-row ">
					<div class="row-left">上门服务</div>
					<div class="row-right">
						<div id="demo-fashion" class="fl ratyWidth"></div>
					    <div id="hint-fashion" class="fl fontWidth"></div>
					</div>
				</div>
				<div class="a-row ">
					<div class="row-left">施工速度</div>
					<div class="row-right">
						<div id="demo-construct" class="fl ratyWidth"></div>
					    <div id="hint-construct" class="fl fontWidth"></div>
					</div>
				</div>
				<div v-show="isShow" class="a-row">
					<div class="row-left">物流服务</div>
					<div class="row-right">
						<div id="demo-extLevel1" class="fl ratyWidth"></div>
					    <div id="hint-extLevel1" class="fl fontWidth"></div>
					</div>
				</div> 
			</div>
			<div class="ps-relative mgb40">
				<textarea style="color:#cfcfcf;" class="a-textarea font-space-2px" v-model="comment" readonly>无评价内容</textarea>
			</div>
			
		</form>
		<div class="z_btn">
		   <button id="z_btn1" @click="clickBack('/order-detail')">返回</button>
		</div>
		   
	</section>

	<!-- 广告 bottom start -->
  	<BottomAdvert></BottomAdvert>
	<!-- 广告 bottom end -->

  </div>
</template>

<script>

import {autoAdapt,goToRouter,advertPosition} from '@/assets/util/web-util.js' 
import {getRootPath_ip,checkNullOrEmptyStr,getStringByteLength} from '@/assets/util/util.js' 
import {config} from '@/assets/util/config.js' 

import BottomAdvert from '../advert/BottomAdvert.vue'

import '@/assets/util/plugin/raty/jquery.raty.min.js'//五星评价插件
import '@/assets/util/plugin/raty/raty.css'//五星img样式需要提前定义，如果放本scope不起作用


export default {
	  name: 'AssessShow',
	  data () {
	    return {
	    	msg:"AssessShow.vue"

	    	,imgPath:'static/raty'//供插件使用，图片路径
	    	,orderNum: this.$route.query.orderNum // $route 不是 $router

	    	,isSelectArr:["li-off","li-off","li-off"] // 差1，中2，好3
	    	,isShow:false //是否显示物流
	    	,comment:'' //评价内容
	    }
	  }
	  ,methods: {
	  	//路由跳转
	  	clickBack: goToRouter
	  	//五星评价 -产品评价
		,initServiceRaty(num) {
			$('#demo-service').raty({
				score: num,//默认选中第5个
		        number: 5, //多少个星星设置
		        readOnly: true,//只读
		        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
		        path: this.imgPath,//图片路径
		        hints: ['非常差','差', '一般', '好', '非常好'],
		        starOff: 'a-off.png',
		        starOn: 'a-on.png',
		        target: '#hint-service',//目标div
		        scoreName: "extLevel1",// 提交表单name
		        cancel: false,
		        targetKeep: true,
		        targetText: '请评分',//无评价提示
		        click: function(score, evt) {
		        }
		    });
		}
		//五星评价 -上门服务
		,initFashionRaty(num) {
			$('#demo-fashion').raty({
				score: num,//默认选中第5个
		        number: 5, //多少个星星设置
		        readOnly: true,//只读
		        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
		        path: this.imgPath,//图片路径
		        hints: ['非常差','差', '一般', '好', '非常好'],
		        starOff: 'a-off.png',
		        starOn: 'a-on.png',
		        target: '#hint-fashion',// 目标div
		        scoreName: "extLevel2",// 提交表单name
		        cancel: false,
		        targetKeep: true,
		        targetText: '请评分',//无评价提示
		        click: function(score, evt) {
		        }
		    });
		}
		//五星评价 -施工速度
		,initConstructRaty(num) {
			$('#demo-construct').raty({
				score: num,//默认选中第5个
		        number: 5, //多少个星星设置
		        readOnly: true,//只读
		        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
		        path: this.imgPath,//图片路径
		        hints: ['非常差','差', '一般', '好', '非常好'],
		        starOff: 'a-off.png',
		        starOn: 'a-on.png',
		        target: '#hint-construct',// 目标div
		        scoreName: "constructLevel",// 提交表单name
		        cancel: false,
		        targetKeep: true,
		        targetText: '请评分',//无评价提示
		        click: function(score, evt) {
		        }
		    });
		}
		//五星评价 - 物流服务 -extLevel3
		,initaaabbbRaty(num) {
			$('#demo-extLevel1').raty({
				score: num,//默认选中第5个
		        number: 5, //多少个星星设置
		        readOnly: true,//只读
		        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
		        path: this.imgPath,//图片路径
		        hints: ['非常差','差', '一般', '好', '非常好'],
		        starOff: 'a-off.png',
		        starOn: 'a-on.png',
		        target: '#hint-extLevel1',// 目标div
		        scoreName: "extLevel3",// 提交表单name
		        cancel: false,
		        targetKeep: true,
		        targetText: '请评分',//无评价提示
		        click: function(score, evt) {
		        }
		    });
		}
	  	//初始化
	  	,initData(data) {

	  		let v1 = data.extLevel1;
			let v2 = data.extLevel2;
			let v3 = data.constructLevel;
			let v4 = data.extLevel3;
			let v5 = data.extLevel4;
			let comment = data.comment;
			
			let flag = (v1 != undefined && v2 != undefined && v3 != undefined);
			if(flag) {
				//初始化【五星评价】
				this.initServiceRaty(v1);
				this.initFashionRaty(v2);
				this.initConstructRaty(v3);
			}
			//总体评价
			if(v5 != undefined && !checkNullOrEmptyStr(v5)) {
				
		  		let index = v5-1;
		  		for(let i in this.isSelectArr) {
		  			if(i == index) {
		  				this.isSelectArr[i] = "li-on";
		  			} else {
		  				this.isSelectArr[i] = "li-off";
		  			}
		  		}

			}
			//物流服务
			if(v4 == undefined || checkNullOrEmptyStr(v4)){
				this.isShow = false;
			} else {
				this.isShow = true;
				this.initaaabbbRaty(v4);
			}
			
			if(!checkNullOrEmptyStr(comment) && comment != undefined) {
				this.comment = comment;
			}
	  	}
	  	//加载数据
	  	,loadData() {
	  		let url = 'static/data/order-assess.json';//测试json 会自动加上myvue
	  		// let url =  this.HOST + "/evaluation/queryEvaluation";//测试环境
	  		// let url =  this.APIName + "/evaluation/queryEvaluation";//生产环境

	  		this.$http.get(url,{// post  测试 get
	  			flag:"out",
	  			commentType:0,
	  			orderNum: this.orderNum
	  		}).then(res=>{
	  			let resData = res.data;//数据获取
  				if(resData.state==1){
  					this.initData(resData.data[0]);
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
	  }
	  //子组件集
	  ,components: {
	  	BottomAdvert
	  }
	  ,mounted() {
	  	
	  	//自适应
	  	// autoAdapt();

	  	//
	  	this.loadData();

	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'assess.scss';

</style>
