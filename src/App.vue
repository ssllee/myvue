<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<my-hello></my-hello>-->
    <!--<p class="test">我是测试</p>-->
    <!--<router-link to="./hello">hello</router-link>-->
    <router-view/>
  </div>
</template>

<script>
import {fun1,fun2,checkNullOrEmptyStr,setLocalData,getLocalData} from '@/assets/util/util.js' 
import {config,config2} from '@/assets/util/config.js'
//import HelloWorld from '@/components/HelloWorld' //

export default {
  name: 'App'
  ,data () {
	    return {
	    	msg:"App.vue"
	    }
  }
  /*,components:{
  	"my-hello":HelloWorld
  }*/
  ,methods: {
  		//入口保存app 3个重要信息
      appInfoSave() {
         let exCode = this.$root.getUrlParam("exCode");
         let userName = this.$root.getUrlParam("userName");
         let callCode = this.$root.getUrlParam("callCode");
         let appInfo = {"exCode":exCode,"userName":userName,"callCode":callCode};
         console.log("App.vue appInfoSave():"+appInfo);

         if (!checkNullOrEmptyStr(exCode) && !checkNullOrEmptyStr(callCode)) {
            setLocalData("appInfo",appInfo);
         }
      }
  }
  ,mounted() {
	  	 //跟目录中的data
	  	 console.log("App.vue mounted():"+ this.$root.msg);

       //入口保存app 3个重要信息
       this.appInfoSave(); 
       

	  	 /*console.log("config.url:"+config.url);
	  	 fun1();*/
  }
}
</script>

<style lang="scss">
//全局引入
@import url(./assets/css/common.scss);
@import url(./assets/bootstrap/css/bootstrap.min.css);//放在comm.scss下面

.test{
  font-size:pxToRem(100px);
  color:darken($baseGray,10%);
}
</style>
