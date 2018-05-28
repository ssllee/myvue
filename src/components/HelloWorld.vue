<template>
  <div class="main">
	  	{{msg}}
	  	<button @click="funTest()">funTest</button>
	  	<button @click="ajaxFunDev()">ajaxFunDev</button>
	  	<button @click="ajaxFunDevPost()">ajaxFunDevPost</button>
	  	<button @click="ajaxFunBuild()">ajaxFunBuild</button>
	  	<button @click="ajaxFunQueqyWebPost()">ajaxFunQueqyWebPost</button>
	  	<div class="mydiv">
				<svg viewBox="0 0 120 120" version="1.1"
				  xmlns="http://www.w3.org/2000/svg">
				  <circle cx="60" cy="60" r="50"/>
				</svg>
			</div>
			<div class="hh">
				  <p>当前完整路径fullPath:{{$route.fullPath}}</p>
					<p>当前路径path:{{$route.path}}</p>
					<p>当前路径参数params:{{$route.params}}</p>
					<p>当前查询参数query:{{$route.query}}</p>
					<p>hash:{{$route.hash}}</p>
					<p>router:{{$route.router}}</p>
			</div>
			
			<div>
					<router-link to="/order-search">订单查询</router-link>
					<router-link to="/order-detail">新闻</router-link>
			</div>
  </div>
</template>

<script>
import {fun1,fun2,initSaveOutParams} from '@/assets/util/util.js' 
import {config,config2} from '@/assets/util/config.js' 

export default {
	  name: 'HelloWorld',
	  data () {
	    return {
	    	msg:"HelloWorld.vue"
	    }
	  }
	  ,methods: {
	  	funTest(){
	  		console.log("=="+this.$route.query)
	  		fun1()
	  		fun2()
	  		this.msg = config.url + "=" + config2.url2 + "=" + exCode
	  	}
	  	,ajaxFunDev(){
	  			//let url="http://localhost:8089/api/sxtstu/news/iqiyi_comment.php";
		  		/*方式一     测试开发阶段proxy代理 target: 'http://www.wwtliu.com', */
		  		let url = this.HOST + "/sxtstu/news/iqiyi_comment.php";
		  		console.log("url:"+url);
		  		this.$http.get(url,{
			  			parmas:{
			  				type:String,
			  				count:30
			  			}
		  		}).then(res=>{
		  				console.log(res);
		  		}).catch(error=>{
		  				console.log(error);
		  		});
	  	}
	  	,ajaxFunDevPost(){
	  			//let url="http://localhost:8089/api/process/queryProcess?....";
		  		/*方式一     测试开发阶段proxy代理 target: 'http://localhost:8081/QueryCenterWeb', */
		  		let url = this.HOST + "/process/queryProcess";
		  		console.log("url:"+url);
		  		this.$http.post(url,{
			  			flag:"out",
		  				orderNum:"1803141912251510006",
		  				exCode:"tmall",
		  				userName:"18510729630",
		  				callCode:"131172ad8ea3875a00eac487df6f3d05"
		  		// },{  
      //               emulateJSON:true  // post Content-Type: application/x-www-form-urlencoded
                }).then(res=>{
		  				console.log(res.data);
		  		}).catch(error=>{
		  				console.log(error);
		  		});
	  	}
	  	,ajaxFunBuild() {
	  		  //let url="http://www.wwtliu.com/sxtstu/news/iqiyi_comment.php";
		  	 	/*方式二     axios配置的 ip:port  */
		  		let url = this.$axios.defaults.baseUrl+"/sxtstu/news/iqiyi_comment.php";
		  		this.$axios.get(url,{
			  			parmas:{
			  				type:String,
			  				count:30
			  			}
		  		}).then(res=>{
		  				console.log(res.data.data);
		  		}).catch(error=>{
		  				console.log(error);
		  		});
	  		
	  	}
	  	,ajaxFunQueqyWebPost() {
		  		/*方式二    当前服务器ip:port */
		  		//let url = "http://localhost:8081/QueryCenterWeb/process/queryProcess?flag=out&orderNum=1803141912251510006&exCode=tmall&userName=18510729630&callCode=131172ad8ea3875a00eac487df6f3d05";
		  		let url = this.APIName + "/process/queryProcess"
		  		this.$http.post(url,{
			  			flag:"out",
		  				orderNum:"1803141912251510006",
		  				exCode:"tmall",
		  				userName:"18510729630",
		  				callCode:"131172ad8ea3875a00eac487df6f3d05"
		  		}).then(res=>{
		  				console.log(res);
		  		}).catch(error=>{
		  				console.log(error);
		  		});
	  		
	  	}
	  }
	  ,mounted() {
	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

/*变量定义*/
//变量定义
$font20: 1rem;

.mydiv {
	background-color: yellowgreen;
	width: 5rem;
	height:5rem;
}

.hh {
	font-size: pxToRem(50px);
}
</style>
