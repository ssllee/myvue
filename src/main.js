import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'//全局引入
import $ from 'jquery'//全局引入

// import '@/assets/bootstrap/css/bootstrap.min.css' //App.vue 全局引入
// import '@/assets/bootstrap/css/bootstrap-theme.css'
// import '@/assets/bootstrap/js/bootstrap.min.js'

import '@/assets/util/plugin/layui/layer/mobile/layer.js'
import '@/assets/util/plugin/layui/layer/mobile/need/layer.css'

//import './assets/css/web-base.css' 

import {initSaveOutParams,getLocalData} from '@/assets/util/util.js' 
//import './assets/util/config.js' 

//Vue.prototype.utilHelper = global

Vue.prototype.$axios = Axios // axios 统一设置api地址
Axios.defaults.baseUrl = "http://www.wwtliu.com"
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.config.productionTip = false
Vue.prototype.HOST = '/api'// index.js proxyTable测试代理   统一设置api地址

Vue.prototype.APIName = '/QueryCenterWeb'// 生产接口名称

//vue http 请求以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样
Vue.http.options.emulateJSON = true;

//vue http 拦截器
Vue.http.interceptors.push((request, next) => {
	//console.log("main.js interceptors msg:"+mainVue.$data.msg);//Vue实例的data 一刷新就没
	console.log("main.js interceptors this:"+this);//此处this为请求所在页面的Vue实例

	//在请求之前可以进行一些预处理和配置
	//modify request
	//request.method = 'POST';
	
	//请求的URL参数对象赋值
	let params = getLocalData("appInfo");
	request.params = params;//{"exCode":exCode,"userName":userName,"callCode":callCode};
	console.log("main.js interceptors:"+request.url,params);
	

	// continue to next interceptor
	next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
		
		//response.body = '...';
		console.log("main.js next():"+this);
		return response;

  });

});


Axios.interceptors.request.use(function(config){
		if(config.method == "post"){
				config.data = qs.stringify(config.data)
		}
		return config;
},function(error){
		return Promise.reject(error);
});

Axios.interceptors.response.use(function(response){
	return response;
},function(error){
		return Promise.reject(error);
});


/* eslint-disable no-new */
var mainVue = new Vue({
  el: '#app',
  data() {
  	return {//记录全局变量
  		msg:"主Vue实例"
  	}
  }
  ,methods: {// 记录全局方法
  		//获取url中的问号传的某参数值
	  	getUrlParam(name) {
	  			let jsonObj = this.$route.query
	  			let value = '';
	  			for (var key in jsonObj) {
	  				  if (key == name)
					    value = jsonObj[key] //获取对应的value值
					}
	  			return value
	  	}
  }
  ,mounted() {

  },
  router,
  render: h => h(App)
})

