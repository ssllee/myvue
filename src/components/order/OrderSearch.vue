<template>
  <div class="main">
  	
  	<!-- 标题 start -->
		<header class="txc">
			<div class="cr fl">&nbsp;</div>
			<!-- <div class="cl fl"><i class="glyphicon glyphicon-chevron-left" onclick="goBack2()"></i></div> -->
			<div class="cr fr">&nbsp;</div>
			<div class="cc">订单查询</div>
  	</header>
		<!-- 标题 end -->
		
		<!-- 广告 top start -->
	  	<!-- <div class="advert-top"></div> -->
	  	<div class="advert-top font-ht">
	  		<p>感谢您选择联通业务</p>
	  		<p>请按下方提示查询您的订单</p>
	  	</div>
  	<!-- 广告 top end -->
	  	
  	<!-- 中间查询区 end -->
  	<section class="panel_2">
			<ul class="nav nav-tabs" style="border-bottom: 0.1rem solid #ddd;">
			    <li :class="{change:true, active:showUlDiv1}" id="phoneSearch">
				    <a href="javascript:;" @click="showDiv('id1')">
				    	<img v-show="showUlDiv1" src="~assets/images/order/web-li.png"/>
				    	身份证查询
				    </a>
			    </li>
			    <li :class="{change:true, active:showUlDiv2}" id="serialSearch">
			    	<a href="javascript:;" @click="showDiv('id2')">
			    		<img v-show="showUlDiv2" src="~assets/images/order/web-li.png"/>
			    		业务号码查询
			    	</a>
			    </li>
	  	</ul>
			
			<form action="javascript:;" id="searchForm" class="form-horizontal">		
				
				<!--隐藏块1  联系电话查询  start-->
				<div class="row_2" id="id1" v-show="showUlDiv1">
					  <div class="input-group_2  deletB">
					  	 <input name="IDNum" v-model="IDNum" @focus="inputFoc2()" type="text" placeholder="请输入办理业务的身份证号码" class="form-control input_2">
					     <div v-show="jobIm2" @click="deleIDNum()" class="dele-icon">
					          <img  class="shanImg2" src="~assets/images/order/chuo1.png"/>
					     </div>
					  </div>
					  <hr>
					  <div class="input-group_2  deletB">
					  	<input name="phoneNum" v-model="phoneNum" @focus="inputFoc1()" type="text" placeholder="请输入办理业务时所留的手机号码" class="form-control input_2">
					    <div v-show="jobIm1"  @click="delePhoneNum()" class="dele-icon">
					          <img  class="shanImg1" src="~assets/images/order/chuo1.png"/>
					    </div>
					  </div>
					  <hr>
				      <div class="input-group_2" style="position:relative;">
						 <input name="codeNumber" v-model="codeNumber" type="text" placeholder="验证码"  class="form-control input_2">
						 <input type="button" :class="{'bg-orange':true,'btn-sendMessage-bg1': !btnSendMs,'btn-sendMessage-bg2': btnSendMs}" id="sendMessage" @click="btnCode()" :value="btnSendMsText" :disabled="btnSendMs">
					  </div>
	                  <hr>
					  <div class="a-div-tele">
						<div class="teleMess">验证码将发送至您办理该业务时所留的手机号码</div>
					  </div>
					  
				</div>
				<!--隐藏块1 联系电话查询  end-->
				
				<!-- 隐藏块2 业务号查询  start-->
				<div class="row_2" id="id2" v-show="showUlDiv2">
					  <div class="input-group_2  deletB" >
					  	<input name="accNum" v-model="accNum" @focus="inputFoc4()" type="text" placeholder="请输入宽带号码" :class="{'form-control':true,'input_2':true,'input-bg1':jobIm4,'input-bg2':!jobIm4}" >
					    <div v-show="jobIm4"  @click="deleAccNum()" class="dele-icon">
					          <img  class="shanImg4" src="~assets/images/order/chuo1.png"/>
					   </div>
					  </div>
					  <hr>
					  <div class="input-group_2  deletB" >
					  	<input name="serialNumber" v-model="serialNumber" @focus="inputFoc()" type="text" placeholder="请输入手机号码" :class="{'form-control':true,'input_2':true,'input-bg1':jobIm,'input-bg2':!jobIm}" >
					    <div v-show="jobIm"  @click="deleSerialNumber()" class="dele-icon">
					          <img  class="shanImg" src="~assets/images/order/chuo1.png"/>
					    </div>
					  </div>
					  <hr>
					  <div class="input-group_2  deletB" >
					  	<input name="teleNum" v-model="teleNum" @focus="inputFoc5()" type="text" placeholder="请输入固话号码" :class="{'form-control':true,'input_2':true,'input-bg1':jobIm5,'input-bg2':!jobIm5}" >
					    <div v-show="jobIm5"  @click="deleTeleNum()" class="dele-icon">
					          <img  class="shanImg5" src="~assets/images/order/chuo1.png"/>
					    </div>
					  </div>
					  <hr>
					  <div class="a-div-tele">
						<div class="teleMess">固定电话号码请加010</div>
					  </div>
				</div>
				<!-- 隐藏块2 业务号查询  end-->
				
				<div class="a-btn-group">
					<input type="button" class="btn btn_search" @click="btnNext()" value="下一步">
				</div>
			</form>
		</section>
		<!-- 中间查询区 end -->
		
		<!-- 广告 bottom start -->
	  	<BottomAdvert></BottomAdvert>
  		<!-- 广告 bottom end -->
		
  </div>
</template>

<script>

import {autoAdapt,goToRouter,advertPosition,setOrderQueryStr} from '@/assets/util/web-util.js' 
import {checkID,checkPhoneNum,checkcodeNumber,checkAccAndTele,getRootPath_ip,getRootPath_web} from '@/assets/util/util.js' 
import {config} from '@/assets/util/config.js' 


/*import selectClose from '@/assets/images/order/chuo1.png'
import advertBottom from '@/assets/images/order/sj-bottom.png'
*/

import BottomAdvert from '../advert/BottomAdvert.vue'


export default {
	  name: 'OrderSearch',
	  data () {
	    return {
	    	msg:"OrderSearch.vue"
//	    	,selectClose:selectClose
//	    	,advertBottom:advertBottom
//	    	
	    	,messageCodeMinute: 60//短信验证码倒计时 60秒
	    	,IDNum:'' //身份证号
	    	,phoneNum:'' //手机号
	    	,codeNumber:'' //验证码
	    	,accNum:'' //宽带账号
	    	,serialNumber:''//业务号码
	    	,teleNum:''//固话号码

	    	,showUlDiv1:false
	    	,showUlDiv2:false
	    	,jobIm1:false//手机号
	    	,jobIm2:false//身份证
	    	,jobIm:false//业务号-手机号
	    	,jobIm4:false//宽带
	    	,jobIm5:false//固话

	    	,btnSendMs:false //发送验证码按钮背景色显示
	    	,btnSendMsText:'获取短信验证码' //
	    }
	  }
	  ,methods: {
	  	//路由跳转
		nextPage: goToRouter
	  	//ul切换
	  	,showDiv(objId) {
	  			//debugger;
					this.showUlDiv1 = false;
					this.showUlDiv2 = false;
					
				  if(objId == "id2"){
				  	 this.showUlDiv2 = true;
				  }else{
				  	 this.showUlDiv1 = true;
				  };
				   
				  //单页面特殊处理广告位重新加载
				  advertPosition();
	  	}
	  	//input框获取焦点时事件
	  	,inputFoc1(param) {
	  		this.jobIm1 = true;
	  	}
	  	,inputFoc2(param) {
	  		this.jobIm2 = true;
	  	}
	  	,inputFoc(param) {
	  		this.jobIm = true;
	  		this.jobIm4 = false;
	  		this.jobIm5 = false;
	  		this.accNum = '';
	  		this.teleNum = '';
	  	}
	  	,inputFoc4(param) {
	  		this.jobIm4 = true;
	  		this.jobIm = false;
	  		this.jobIm5 = false;
	  		this.serialNumber = '';
	  		this.teleNum = '';
	  	}
	  	,inputFoc5(param) {
	  		this.jobIm5 = true;
	  		this.jobIm = false;
	  		this.jobIm4 = false;
	  		this.accNum = '';
	  		this.serialNumber = '';
	  	}
	  	//删除input内容
	  	,deleIDNum() {
	  		this.IDNum = "";
	  		this.jobIm2 = false;
	  	}
	  	,delePhoneNum() {
	  		this.phoneNum = "";
	  		this.jobIm1 = false;
	  	}
	  	,deleAccNum() {
	  		this.accNum = "";
	  		this.jobIm4 = false;
	  	}
	  	,deleSerialNumber() {
	  		this.serialNumber = "";
	  		this.jobIm = false;
	  	}
	  	,deleTeleNum() {
	  		this.teleNum = "";
	  		this.jobIm5 = false;
	  	}
	  	//按电话号码查询之校验
	  	,phoneSearchCheck(){
			let idNum = this.IDNum;
		  	let phoneNum = this.phoneNum;		
			if(idNum==""&&phoneNum==""){
		    	  layer.open({
					  content: '请输入您的查询信息'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 2
				  });
		    }
			  if(idNum==""&&phoneNum!=="") {
				  layer.open({
					  content: '请输入办理业务的身份证号码'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 2
				  });
			  } 
			  if(phoneNum==""&&idNum!==""){
				  layer.open({
					  content: '请输入办理业务所留手机号码'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 2
				  });
			  }
			  if(idNum!==""&&phoneNum!==""){
				  		
					var boo1=checkID(idNum);
					var boo2=checkPhoneNum(phoneNum);
					//if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idNum))){
					//if(!/^\d{17}(\d|x)$/i.test(ID)
					if(boo1==false){
						layer.open({
							  content: '您的身份证号有误，请重填'
							  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
							  ,time: 2
						});
					}else if(boo2==false){ 
				    	layer.open({
							  content: '您的手机号码有误，请重填'
							  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
							  ,time: 2
						});
					}else if((boo1=true)&&(boo2=true)){
						
						return true;//校验成功		
					}
			  }	
		}
		//【获取短信验证码】
		,btnCode() {
			let idNum = this.IDNum;
		  	let phoneNum = this.phoneNum;	
			let validate= this.phoneSearchCheck();
			if(validate){	//手机号和身份证号校验通过，则发送短信
				this.getMessData(idNum,phoneNum);
			}
		}
		//ajax调用发送验证码请求
		,getMessData(idNum,phoneNum) {

			
			let url = 'static/data/order-search.json';//测试json 会自动加上myvue
			// let url = this.HOST + "/trade/sendMessage";//测试环境
			// let url = this.APIName + "/trade/sendMessage";//生产环境

	  		console.log("getMessData url:"+url);
	  		this.$http.get(url,{// post  测试 get
		  			flag:'out',
	  				phoneNumber: phoneNum,
	  				credentialCode: idNum
	  		}).then(res=>{
	  			let resData = res.data;//数据获取
  				if(resData.state==1){
	        		  layer.open({
	        			   content: resData.message
	        			  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
	        			  ,time: 2
	        		  });
	        		//存
	  				//setOrderListLocalData(1,phoneNum,idNum,"","","");
	        		this.countdown();//发送验证码后要先提示验证次数，所以要延时跳转验证码页面 	  
	        	}else{
	        		  layer.open({
	        			  content: resData.message
	        			  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
	        			  ,time: 2
	        		  });
	        	}
	  		}).catch(error=>{
  				layer.open({
					  content: '系统原因'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 2
			    });
			    
	  		});

			
		}
		//验证码发送倒计时
		,countdown(){
			this.messageCodeMinute=60;
		    this.settime();
		    
		}
		,settime() { //发送验证码倒计时
			if ((this.messageCodeMinute == 0)||(this.messageCodeMinute==61)) { 
		    	this.btnSendMs = false;
		       	this.btnSendMsText = "重新获取验证码";
		        return;
		    } else { 
		    	this.btnSendMs = true;
		        this.btnSendMsText = "还剩" + this.messageCodeMinute + "秒";
		        this.messageCodeMinute--; 
		    } 

		    let _this = this;//setTimeout this指向不是本对象，所以需要这样
			setTimeout(function() { _this.settime() },1000) 
		}
		//【下一步】
		,btnNext() {
			//按电话
			if(this.showUlDiv1) {
				let validate = this.phoneSearchCheck();
				let codeNumber = this.codeNumber;
				
				if(validate){//手机和身份证校验通过
					if(codeNumber==""){ //短信验证码为空
						layer.open({
			 			   content: '请输入您收到的短信验证码'
			 			  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
			 			  ,time: 2
						});
						return;			
					}else if(codeNumber!==""){
						var codeValidate = checkcodeNumber(codeNumber);//短信验证码校验
						if(codeValidate==true){
							//checkData(codeNumber);//校验通过则传入后台查询
							this.getOrderData1();
						}else{
							layer.open({
								content: '请输入您收到的短信验证码'
					 			,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					 			,time: 2
							});
							return;	
						}
					}
				}	
			} 
			//按业务号
			else {
				 let booSerial = checkPhoneNum(this.serialNumber);
				 let booAcc = checkAccAndTele(this.accNum);
				 let booTele = checkAccAndTele(this.teleNum);
				 //var idNum = $("#idNum").val();
				 if(this.serialNumber == "" && this.accNum == "" && this.teleNum =="") {
					 layer.open({
						 content: '请输入您的查询信息！'
						 ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
						 ,time: 2
					});
						return false;
				 };
				 if(this.teleNum !='' && booTele==false){
					layer.open({
						content: '您的固话号码有误，请重填'
						,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
						,time: 2
					});		
						return;
				 }
				 if(this.serialNumber !='' && booSerial==false){
					 layer.open({
						 content: '您的手机号码有误，请重填'
						 ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
						 ,time: 2
					});	
						return;
					}
				if(this.accNum !='' && booAcc==false){
					layer.open({
						content: '您的宽带号码有误，请重填'
						,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
						,time: 2
					});	
						return;
				}
				
				this.getOrderData2();
				//----------end
			}
		}
		
		//ajax获取订单详情数据
		,getOrderData1() {
			let url = 'static/data/order-next.json';//测试json 会自动加上myvue
			// let url = this.HOST + "/trade/queryOrder"; //测试阶段
	  		// let url = this.APIName + "/trade/queryOrder"; //生产阶段

	  		this.$http.get(url,{// post  测试 get
		  			flag:'out',
	  				phoneNumber: this.phoneNum,
	  				code: this.codeNumber,
	  				credentialCode: this.idNum
	  		}).then(res=>{
	  			let resData = res.data;//数据获取
  				if(resData.state==1){
  					  //存查询条件
			  		  setOrderQueryStr("&phoneNumber="+this.phoneNum+"&credentialCode="+this.IDNum); 
	    	   
  		    	      //跳转到订单列表页面  order-list
  		    	      this.nextPage('/order-detail');
	        		  
	        	} else if(resData.state==3 || resData.state==2){
	  	    		layer.open({
		  				  content: resData.message,
		  				  style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
		  				  ,time: 2
		  			});
	  	    	    this.codeNumber='';//清除验证码
  	    	  	}
	  		}).catch(error=>{
  				layer.open({
					  content: '系统原因'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 2
			    });
			    
	  		});
		}
		,getOrderData2() {
				       
			let url = 'static/data/order-next.json';//测试json 会自动加上myvue如：http://localhost:8089/myvue/static/data/order-next.json
			// let url = this.HOST + "/trade/queryOrder";//测试环境
	  		// let url = this.APIName + "/trade/queryOrder";//生产环境

	  		this.$http.get(url,{// post  测试 get
		  			flag:'out',
	  				serialNumber: this.serialNumber,
	  				accNum: this.accNum,
	  				teleNum: this.teleNum

	  		}).then(res=>{
	  			let resData = res.data;//数据获取
  				if(resData.state==1){
	        		  //存查询条件
	  				  setOrderQueryStr("&serialNumber="+this.serialNumber+"&accNum="+this.accNum+"&teleNum="+this.teleNum);  
	    	     		    	   
  		    	      //跳转到订单列表页面  order-list
  		    	     this.nextPage('/order-detail');
	        		  
	        	} else{
	    		   layer.open({
					  content: '此号码无数据'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 2
	    		   });
	    	   }
	  		}).catch(error=>{
  				layer.open({
					  content: '系统原因'
					  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
					  ,time: 2
			    });
			    
	  		});
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
	  		  	
	  	//初次show div1
	  	this.showDiv("id1");
	  	

	 	 	//执行广告定位
		//等页面事件都执行完，再广告浮动
		setTimeout(function(){
			//广告位置是否浮动
			advertPosition();
		},1000);

	  }
}
</script>

<style lang="scss" scoped>


/* 输入框置灰start */

.intro{
font-size:120%;
color:red;
} 
/* 输入框置灰end */


/* 提示语样式 */
.a-div-tele{
	margin: 0.5rem 0 0;
} 
.a-div-tele .teleMess {
	font-size: 1rem; /* 26px; */
	color: #ccc;
	height: 2.5rem;
}

/* 删除功能样式 */
.deletB{
	position:relative;
}
.dele-icon{
	position:absolute;
	top: 0.6rem;
	right: 0.6rem;
	width: 2rem;
	height: 2rem;
}
.shanImg , .shanImg1 , .shanImg2 ,.shanImg4 ,.shanImg5{
	display:block;
	width:100%;
	height:100%;
}
/*【获取验证码】*/
.btn-sendMessage-bg1 { 
	background-color: #f7b135; 

	&:hover{
	    color:#fff;
	    background-color:#eb6100;
	}

	&:focus{
	    color:#fff;
	    outline:none;
	}
}
/*【倒计时】*/
.btn-sendMessage-bg2 {
	background-color: #ccc;

	&:hover {
		background-color: #ccc
	}
}


.input-bg1 { background-color: #fff; }
.input-bg2 { background-color: #f5f5f5; } /*#e0dede*/
</style>
