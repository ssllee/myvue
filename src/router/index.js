import Vue from 'vue'
import Router from 'vue-router'
import VueResource  from 'vue-resource'
import HelloWorld from '@/components/HelloWorld' //
import ErrorPage from '@/components/ErrorPage'//错误提示页面
import OrderSearch from '@/components/order/OrderSearch' //订单查询主入口
import OrderDetail from '@/components/order/OrderDetail' //订单详情
import ShowFlow from '@/components/logistics/ShowFlow' //物流展示
import AssessSubmit from '@/components/assess/AssessSubmit' //订单评价
import AssessShow from '@/components/assess/AssessShow' //我的评价

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
	mode: 'history',//路径中去掉#号(hash模式)，利用了history.pushState API来完成URL的跳转而不需要重新加载页面
	base: '/myvue/',//加上这一行 与assetsPublicPath: '/myvue/'  同时服务器需要配置 index.html  或者直接配置成path:'/myvue/hello'
	routes: [
	    { 
	    	path: '*', //path: '*','/'  没有匹配到路由时路径
	    	component: ErrorPage
	    },
	    {
	      path: '/hello',// '/myvue/hello'
	      name: 'HelloWorld',
	      component: HelloWorld
	    }
	    ,{
	      path: '/order-search',
	      name: 'OrderSearch',
	      component: OrderSearch
	    },
	    {
	      path: '/order-detail',
	      name: 'OrderDetail',
	      component: OrderDetail
	    },
	    {
	      path: '/show-flow',
	      name: 'ShowFlow',
	      component: ShowFlow
	    },
	    {
	      path: '/assess-submit',
	      name: 'AssessSubmit',
	      component: AssessSubmit
	    },
	    {
	      path: '/assess-show',
	      name: 'AssessShow',
	      component: AssessShow
	    }
	]
})
