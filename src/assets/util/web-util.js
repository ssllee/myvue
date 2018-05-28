
/**********这里写手机端 需要的公用js**********/
//页面加载前执行
//autoAdapt();

/*
 * 自适应设置
 * html里设置换算单位   font-size=20px;
 * clientWidth*20/720 表示按720px宽度设计图开发页面，然后把css中px  换算成rem 实现响应式   
 */
export function autoAdapt(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth*20/720+'px';
	window.onresize=function(){
	  document.documentElement.style.fontSize=document.documentElement.clientWidth*20/720+'px';       
	};
}

/************新************/
//存储 对外 订单列表   (查询条件)
export function setOrderQueryStr(query) {
	sessionStorage.setItem("orderListQueryStr",query);
}

// 获取  对外 订单列表  (查询条件)
export function getOrderQueryStr() {
	var str = sessionStorage.getItem("orderListQueryStr");
	return str;
}


//广告位置根据内容来决定位置
export function advertPosition() {
	//初始化删除浮动，使广告跟在页面尾部算入bodyH高度里
	$(".advert-bottom").removeClass("position-fiexd");
	//$(".advert-bottom").addClass("dp-none");//初始化时增加这个会使bodyH不包含广告高度
	
	var screenW = document.documentElement.clientWidth;
	var screenH = document.documentElement.clientHeight;
	var bodyH = document.body.clientHeight;//不包含display:none元素高度
	//console.log("screenH:"+screenH+" bodyH:"+bodyH);
	
	//重新加样式
	if (screenH > bodyH) {// 内容少时广告浮动
		$(".advert-bottom").addClass("position-fiexd");
	}
	$(".advert-bottom").removeClass("opacity-0");
	//$(".advert-bottom").removeClass("dp-none");
	
	/*
	//【关闭】
	$(".advert-bottom i").click(function(){
		$(".advert-bottom").removeClass("position-fiexd");
		$(".advert-bottom i").hide();
	});*/
}

/*****************************************/
//跳转路由
export function goToRouter(str) {
	this.$router.push(str);//$router为VueRouter实例
}