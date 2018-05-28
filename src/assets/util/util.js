//import {exCode,userName,callCode} from './config.js'

export function fun1() {
	console.log("fun1=====");
}

export function fun2() {
	fun1();
	console.log("fun2=====");
}
/****************************url**************************/

/**
 * 初始保存对外访问url传的参数
 */
export function initSaveOutParams() {

//	exCode = $route.query.exCode;
//	exCode = getUrlParam("exCode");
//	userName = getUrlParam("userName");
//	callCode = getUrlParam("callCode");
	console.log("params:"+exCode,userName,callCode);
}

/**
 * 对外访问接口url组装
 * 
 * 【页面跳转html】与【ajax】都需要使用该方法
 * 
 * 例如：getOutUrl(getRootPath_web(),"/test/test1?flag=out&orderNum=1001");
 * 
 * 输入格式：http://localhost:8090/QueryCenterWeb/test/test1?flag=out&orderNum=1001&exCode=....
 * 
 * @param uri
 * @param query
 * @returns {String}
 */
export function getOutUrl(uri,query) {
	var str = "exCode="+exCode+"&userName="+userName+"&callCode="+callCode;
	if (query.indexOf("?") > 0) {
		str = '&' + str;
	} else {
		str = '?' + str;
	}
	var url = uri + query + str;
	//console.log("outApiUrl:"+url);
	return url;
}


/**
 * 获取url中的参数
 * @param name 参数名称
 * @returns
 */
export function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    //if (r != null) return unescape(r[2]); return null; //返回参数值 escape()编码/unescape()解码
    if (r != null) return decodeURI(r[2]); return null; //返回参数值 encodeURI()编码/decodeURI()解码
}

/**
 * 获取主机名
 * @returns
 */
export function getRootPath_ip() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    return localhostPaht;
}

/**
 * 获取主机名+项目名
 * @returns
 */
export function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
/***************************日期处理********************/
/**
 * 获取当前日期
 * 
 * str:需要什么样的格式 如：yyyy-mm-dd
 * 返回格式：2015-01-10
 */
export function getCurrentDate(str) {
	var clock = getTime("",0);
   	clock = changeDateFomate(clock,str);
    return(clock);
} 

/**
 * 获取时间间隔
 * @param mNum 当前分钟数加几分钟
 * 返回格式：2015-03-30 01:00~01:05
 */
export function getTimeInterval(clock1,clock2) {
	var clock = changeDateFomate(clock1,"yyyy-mm-dd hh:mm") + "-" + changeDateFomate(clock2,"hh:mm");
	//console.log(clock);
	return(clock);
}

/**
 * 获取日期(如果time不为空，则获取该时间的5分钟后的时间)
 * 
 * @param time:'20150330010001000'
 * @param mNum:当前分钟数加几分钟 如：5：加5分钟   -5：减5分钟
 * 返回格式：20150330010501000
 */
export function getTime(time,mNum) {
	
	var now = null;
	
	if (time != "" && time != null && time.length == 17) {
		// 手机浏览器不支持parse()方法
		now = new Date(time.substring(0, 4),time.substring(4, 6) - 1,time.substring(6, 8),time.substring(8, 10),time.substring(10, 12),time.substring(12, 14)); 
	} else {
		now = new Date(); 
	}
	
    now.setMinutes(now.getMinutes() + mNum);
    
    var year = now.getFullYear();       //年   
    var month = now.getMonth() + 1;     //月    0~11 
    var day = now.getDate();            //日
    var hour = now.getHours();
    var minute = now.getMinutes() ;
    
    var seconds = now.getSeconds()
    
    month = month < 10 ? "0" + month :  month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    // 数值与字符间隔，否则会相加
    var clock = year + "" +month + "" + day + "" + hour + "" + minute + "" + seconds + "000";
	
   	//console.log(clock);
    return(clock);
} 

/**
 * 将格式：20150330010101000 转为：2015-03-30 01:01:01
 * @param time
 * @param str  转换格式
 * @returns
 */
export function changeDateFomate(time,str) {
	
	if (time.length == 17) {
		if (str == "yyyy-mm-dd hh:mm:ss") {
			time = time.substring(0, 4)+"-"+time.substring(4, 6)+"-"+time.substring(6, 8)
			+" "+time.substring(8, 10)+":"+time.substring(10, 12)+":"+time.substring(12, 14);
		} else if (str == "yyyy-mm-dd hh:mm"){
			time = time.substring(0, 4)+"-"+time.substring(4, 6)+"-"+time.substring(6, 8)
			+" "+time.substring(8, 10)+":"+time.substring(10, 12);
		} else if (str == "yyyy-mm-dd"){
			time = time.substring(0, 4)+"-"+time.substring(4, 6)+"-"+time.substring(6, 8);
		} else if (str == "hh:mm"){
			time = time.substring(8, 10)+":"+time.substring(10, 12);
		} else if (str == "yyyymmdd000000000"){
			time = time = time.substring(0, 8) + "000000000";
		} else {
			
		}
	}
	return time;
}

/****************************校验******************/
/**
 * 校验空或null
 * @param str
 * @returns
 */
export function checkNullOrEmptyStr(str) {
	return str == "" || str == null || str=="null"? true : false;
}
	

/****************************数字处理******************/

/**
 * 保留两个小数
 * @param num
 */
export function roundNum(num) {
	if (checkNullOrEmptyStr(num)) return '';
	num = Math.round(num*100)/100;
	return num;
}

/***************************String**************/

/**
 * jquery trim() ie8不支持，这里重写
 * 字符串首尾去空格
 * 例：" abc " -> "abc"
 * 
 * */
String.prototype.trim = function () {
	var re = /(^\s*)|(\s*$)/ig;
	var newstr = this.replace(re,"");
	return newstr;
}

/**************************table*************/

/**
 * 获取查询条件 返回json格式
 */
export function getQueryParams(params, formId) {
    return $("#" + formId).serialize() + "&" + $.param(params);
}

/**
 * bootstrap-table传参,直接可以使用如：<table id="table" data-query-params="queryParams" ....>
 * 
 * @param params
 *  	searchForm  查询条件form的id 如：<form id="searchForm">
 *  
 * @returns
 */
export function queryParams(params) {
    return getQueryParams(params, "searchForm");
}

/**********************返回按钮*****************/
/**
 * 【返回】按钮事件
 */
export function goBack(){
	//window.history.back();//微信里使用不起作用
	history.back(-1);//微信里使用起作用
}

/**
 * 【提交成功后】返回上一页并刷新
 * 直接传上一页url
 */
export function goBackUrl(url) {
	location.href = url;
}


/**
 * 【提交成功后】返回并刷新上一页  浏览器支持，手机不支持
 */
export function goBackRefresh() {
	//window.location.href=document.referrer;//浏览器可以，微信不支持
	//history.back();location.reload();//浏览器可以，手机不刷新
	window.location.replace(document.referrer);//浏览器可以，手机不刷新
}

/**
 * 当前页面重新加载
 */
export function reloadPage() {
	location.reload();
}
/************************pc**************/

/**
 * div : #div  .div
 */
export function setScreenHeight(str,topPX) {
	var screenHeight = document.documentElement.clientHeight;//ie不支持 window.innerHeight;//窗口大小，随着窗口大小变化大小
	screenHeight = screenHeight - topPX;
	$(str).css({minHeight: screenHeight+"px"});
}

/************************弹出层**************/

/**
 * 弹出层-右边显示
 */
export function showRightLayer(layerId,layerTitle,layerUrl) {
	layer.open({
		  type: 2,
		  id: layerId, //设定一个id，防止重复弹出
		  title: layerTitle,//title: false, //不显示标题栏 
		  shadeClose: true,
		  shade: 0,//背景  shade: 0.8
		  area: ['490px', '98%'],
		  offset: 'r',
		  skin: 'a-layer', //
		  content: layerUrl //iframe的url
		  /*,end: function () {
              location.reload();
          }*/
    });
    
}


/**********************校验****************/
/**
 * 电话号码转换
 */
export function telFormat(tel){
	var reg = tel.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
	//console.log("转换后的电话号码："+reg);
	return reg;
}

/**
 * placeholder 兼容ie8 解决方式
 * @param target
 */
export function placeholder(target){
    $(target).val($(target).attr("datavalue")).addClass("inpupt-placeholder");
    $(target).focus(function() {
        if($(this).val() == $(this).attr("datavalue")) {
            $(this).val("").removeClass("inpupt-placeholder");
        } 
        
    })
    $(target).blur(function(){
        if($(this).val() == "" || $(this).val() == $(this).attr("datavalue")) {
            $(this).val($(target).attr("datavalue")).addClass("inpupt-placeholder");
        }
    })
}


/*18位身份证有效性校验*/
export function checkID(ID) {
	if(typeof ID !== 'string') 
		return false;
    var city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",
    		22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",
    		36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",
    		46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",
    		62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",
    		91:"国外"};
    //截出生年月日   1994/4/28
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2)); 
    var d = new Date(birthday);   //   1994/4/28
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
    
    var currentTime = new Date().getTime();  //当前日期返回距 1970 年 1 月 1 日之间的毫秒数。
    var time = d.getTime();  //出生年月日距 1970 年 1 月 1 日之间的毫秒数。
    
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var sum = 0, i, residue;
  
    if(!/^\d{17}(\d|x)$/i.test(ID)) //输入身份证位数不符
    	return false;
    if(city[ID.substr(0,2)] === undefined) 
    	return false;  //城市标识代码不存在   
    
    //身份证号的出生年月如果大于当前年月日   或   截取的日期为非法date格式
    if(time >= currentTime || birthday !== newBirthday) 
    	return false;
       
    //计算身份证号最后一位
    for(i=0; i<17; i++) { 
    	sum += ID.substr(i, 1) * arrInt[i];
    }
    residue = arrCh[sum % 11];
    
    if (residue !== ID.substr(17, 1)) 
    	return false;
    
    return true;
   // return city[ID.substr(0,2)]+","+birthday+","+(ID.substr(16,1)%2?" 男":"女")
}


//手机号校验
export function checkPhoneNum(phoneNumber) {
	if(/^1[34578]\d{9}$/.test(phoneNumber)){ 
		return true;    //手机号码格式正确
	}else{
		return false;   //手机号码格式错误
	}
}

//固话号码和宽带号码校验
export function checkAccAndTele(Str) {
	if(checkNullOrEmptyStr(Str)==false){
		if(/^010\d{8}$/.test(Str)){ 
			return true;    //固话和宽带号码格式正确
		}else{
			return false;   //固话和宽带号码错误
		}
	}else{
		return true;
	}
}
//短信验证码校验
export function checkcodeNumber(Str){
	if(checkNullOrEmptyStr(Str)==false){
		if(/^\d{6}$/.test(Str)){ 
			return true;    //固话和宽带号码格式正确
		}else{
			return false;   //固话和宽带号码错误
		}
	}else{
		return true;
	}
}

/**
 * str字符串 按num 截取换行
 * @param str
 * @param num  
 * @returns {String}
 */
export function checkLen(str,num){
	if (checkNullOrEmptyStr(str)) "";
	if (str.length > num) {
		str = str.substr(0,num) +"\n"+ str.substr(num);
	}
	return str;
}

/**
 * 获取字节长度（汉字算两个字符，字母数字算一个）
 * @param str
 * @returns
 */
export function getStringByteLength(str){
  if(str == "") return "";
  var len = 0 ;
  for (var i = 0; i < str.length; i++) {
    len += str.charCodeAt(i) > 255 ? 2 : 1;// Unicode 编码
  }
  return len;
}
/*********************存 取 localStorage****************/

/**
 * 存
 * ItemName ： key值
 * obj ： json对象 如：obj = {type:"",value:""} 
 */
export function setLocalData(ItemName,obj) {
	var objJson= JSON.stringify(obj)
	localStorage.setItem(ItemName,objJson);
}

//
/**
 * 取
 * ItemName ： key值
 * return obj  json对象 如：obj = {type:"",value:""} 
 */
export function getLocalData(ItemName) {
	var obj = localStorage.getItem(ItemName);
	obj = JSON.parse(obj);
	return obj;
}
















