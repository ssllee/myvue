<template>
  <div class="main">
  	<!-- 标题 start -->
  	<header class="txc">
		<div class="cl fl" @click="clickBack('/order-detail')"><i class="glyphicon glyphicon-chevron-left"></i></div>
		<div class="cr fr">&nbsp;</div>
		<div class="cc">订单评价</div>
  	</header>
  	<!-- 标题 end -->
	
	<section>
	   <div class="z_evaluation">
	        <div class="z_veap">
	           <div class="z_veapsp1"><div><!-- 横线 --></div></div>
	           <div class="z_veapsp2 font-space-2px">您对本次服务满意吗？</div>
	           <div class="z_veapsp1"><div><!-- 横线 --></div></div>
	        </div>
	    </div>
		<form id="submitForm">
			<ul class="totalEval"><!-- #menu 这个会有默认样式，不要使用 -->
				<li id="3" :class="[isSelectArr[2]]" @click="selectEval(3)">好评(9-10分)</li>
				<li id="2" :class="[isSelectArr[1]]" @click="selectEval(2)">中评(7-8分)</li>
				<li id="1" :class="[isSelectArr[0]]" @click="selectEval(1)">差评(1-6分)</li>
				<input type="hidden" name="extLevel4" v-model="curSelectNum">
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
				<div v-show="expNo != 'undefined' && expNo != '' " class="a-row">
					<div class="row-left">物流服务</div>
					<div class="row-right">
						<div id="demo-extLevel1" class="fl ratyWidth"></div>
					    <div id="hint-extLevel1" class="fl fontWidth"></div>
					</div>
				</div> 
			</div>
			<div class="ps-relative mgb40">
				<textarea class="a-textarea font-space-2px" v-model.trim="comment" name="comment" placeholder="亲，您的鼓励是我们用心服务的最大动力！(文字输入上限为100字)" @keyup="countWord()">
				</textarea>
				<span class="z_num ps-absolute"><span id="textNum">{{curNum}}</span>/{{curTotal}}</span>
			</div>
			<div class="a-btn-group">
				<button type="button" @click="submit()" class="btn btn_search assessSubmit">立即评价</button>
			</div>	
			
		</form>
		
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
	  name: 'AssessSubmit',
	  data () {
	    return {
	    	msg:"AssessSubmit.vue"

	    	,isSelectArr:["li-off","li-off","li-on"] // 差1，中2，好3
	    	,curSelectNum:3//当前选中 3

	    	,imgPath:'static/raty'//供插件使用，图片路径

	    	,orderNum: this.$route.query.orderNum // $route 不是 $router
	    	,expNo: this.$route.query.expNo

	    	,comment:'' //评价内容
	    	,curNum:0 //当前字数
	    	,curTotal:100 //100个汉字，200个字符
	    }
	  }
	  
	  ,methods: {
	  	//路由跳转
	  	clickBack: goToRouter
	  	//选择总体评价
	  	,selectEval(num) {
	  		this.curSelectNum = num;
	  		
	  		let index = num-1;
	  		for(let i in this.isSelectArr) {
	  			if(i == index) {
	  				this.isSelectArr[i] = "li-on";
	  			} else {
	  				this.isSelectArr[i] = "li-off";
	  			}
	  		}
	  	}
	  	//五星评价 -产品评价
		,initServiceRaty() {
			$('#demo-service').raty({
				score: 5,//默认选中第5个
		        number: 5, //多少个星星设置
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
		,initFashionRaty() {
			$('#demo-fashion').raty({
				score: 5,//默认选中第5个
		        number: 5, //多少个星星设置
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
		,initConstructRaty() {
			$('#demo-construct').raty({
				score: 5,//默认选中第5个
		        number: 5, //多少个星星设置
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
		//五星评价 - 物流服务 extLevel3
		,initaaabbbRaty() {
			$('#demo-extLevel1').raty({
				score: 5,//默认选中第5个
		        number: 5, //多少个星星设置
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
		//评价字数实时统计
		,countWord() {
			let commentNum = getStringByteLength(this.comment);
			this.curNum = Math.ceil(commentNum/2)//这句是在键盘按下时，实时的显示字数
			$('#textNum').text(Math.ceil(commentNum/2));//这句是在键盘按下时，实时的显示字数
			if( commentNum > 2 * this.curTotal){
			    this.curNum = this.curTotal;//长度大于100时0处显示的也只是100
			    //长度大于200时截取钱200个字符
				let index = 0;
				for (let i = 0; i < this.comment.length; i++) {
					if(getStringByteLength(thi.scomment.substring(0,i)) <= 2 * this.curTotal)
						index=i;
				}
					   
			    this.comment = this.comment.substring(0,index);
			}
		}
	  	//初始化
	  	,init() {

	  		//初始化【五星评价】
			this.initServiceRaty();
			this.initFashionRaty();
			this.initConstructRaty();
			
			if(this.expNo != 'undefined' && this.expNo != '' ) {
				this.initaaabbbRaty();
			}
	  	}
	  	//提交评价
	  	,submit() {
	  		let paramsArr = $("#submitForm").serializeArray();
			console.log(paramsArr);

			let url = 'static/data/order-next.json?flag=out&commentType=0&orderNum=' + this.orderNum;//测试json 会自动加上myvue
			// let url =  this.HOST + "/evaluation/submitEvaluation?flag=out&commentType=0&orderNum=" + this.orderNum;//测试环境
	  		// let url =  this.APIName + "/evaluation/submitEvaluation?flag=out&commentType=0&orderNum=" + this.orderNum;//生产环境
	  		

	  		this.$http.get(url,paramsArr)// post  测试 get
	  		.then(res=>{
	  			let resData = res.data;//数据获取
  				if(resData.state==1){
  					let _this = this;//需要
	        		layer.open({
	    			  content: '评价成功！'
	    			  ,style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
	    			  ,time: 1
	    			  ,end: function(e){
	    				  //成功后返回上一页
	    				  _this.clickBack('/order-detail');
	    			  }
				    }); 
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
	  	//
	  }
	  //子组件集
	  ,components: {
	  	BottomAdvert
	  }
	  ,mounted() {
	  	
	  	console.log("AssessSubmit--",this.orderNum,this.expNo);

	  	//自适应
	  	// autoAdapt();
	  	
	  	//
	  	this.init();
	  	
	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'assess.scss';// assess.scss
// @import 'assess';// _assess.scss

</style>
