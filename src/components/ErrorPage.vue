<template>
  <div class="main">
	  	<div class="mpanel">
				<p>{{msg}}</p>
			</div>
  </div>
</template>

<script>

export default {
	  name: 'NotFoundComponent',
	  data () {
	    return {
	    	msg:"对不起!登录超时或您没有权限访问该页面。"
	    }
	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
    position: absolute;
		width:272px;
		height:120px;
		top:20%;
		left:50%;
		margin-left: -136px;
		border: 1px solid #0190FE;
		background-color: #0092fd;
		border-radius:10px;
	}
	
.mpanel {
	padding: 35px;
	text-align:center;
	font-size: 16px;
	color: #fff;
}
</style>
