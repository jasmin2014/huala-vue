import  'mint-ui/lib/style.css'
import  './css.css'
import './fonts/iconfont.css'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Loadmore from 'mint-ui/lib/loadmore'
import header from 'mint-ui/lib/header'
import button from 'mint-ui/lib/button'
import Indicator from 'mint-ui/lib/indicator';
import Toast from 'mint-ui/lib/toast';
import MessageBox from 'mint-ui/lib/message-box';
import Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';

import App from './app'
import '../../api.js'
import '../../components/uploader'
import Login from './pages/Login.vue'
import SellerList from './pages/sellers/SellerList.vue'
import SellerDetail from './pages/sellers/SellerDetail.vue'
import GoodsList from './pages/goods/GoodsList.vue'
import GoodsDetail from './pages/goods/GoodsDetail.vue'
import Address from './pages/user-center/address/Address.vue'
/*import Card from './comp/card/List.vue'
import CardComfirm from './comp/card/Comfirm.vue'
import Order from './comp/order/List.vue'
import OrderDetail from './comp/order/Detail.vue'
import Personal from './comp/personal/Center.vue'
import Address from './comp/address/address.vue'
import Active from './comp/active/Active.vue'*/


Vue.use(VueResource)
Vue.use(VueRouter)


//Vue.use(Mint)
Vue.component(Loadmore.name, Loadmore);
Vue.component(header.name, header);
Vue.component(button.name, button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$indicator = Vue.prototype.$indicator = Indicator;


const router = new VueRouter();
router.map({
  '/': {
    component: SellerList
  },
  '/seller-detail/:sellerId' : {
    component:SellerDetail
  },
  '/goods/:sellerId': {
    component: GoodsList
  },
  '/goods-detail/:sellerId/:goodsId': {
    component: GoodsDetail
  },
  '/address':{
    component: Address
  },
  /*'/card':{
    component: Card
  },
  '/card-comfirm/:sellerId':{
    component: CardComfirm
  },
  '/order': {
    component: Order,
    subRoutes: {
      '/order-detail/:orderId' : {
        component: OrderDetail
      }
    }
  },
  '/personal':{
    component:Personal
  },
  '/active':{
    component: Active
  },*/
  '/login': {
    component: Login
  }
})
router.beforeEach(function (transition) {
  //登录中间验证，页面需要登录而没有登录的情况直接跳转登录
  //处理左侧滚动不影响右边
  let token = window.localStorage.getItem('token')
  if (transition.to.path != '/login') {
    //console.log(transition);
    if (!token) {
      transition.redirect('/login');
    } else {
      transition.next();
    }
  } else {
    transition.next();
  }
})
router.redirect({
  '*': '/'
})
Vue.http.interceptors.push(function (request, next) {
  Vue.$indicator.open('加载中');
  // modify request
  //request.headers.token = window.localStorage.getItem('token')
  //request.headers.city = window.localStorage.getItem('city')
  if(request.url.indexOf("//")>=0){
  }else{
    request.url = (request.url.indexOf(ApiUrl) >= 0) ? request.url : (ApiUrl + request.url);
  }
  //console.log(request.url)
  //continue to next interceptor
  next(function (response) {
    // ...
    // 请求发送后的处理逻辑
    // ...
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    console.log(response);
    Vue.$indicator.close();
    if (response.status == 401 || response.status == 403) {
      window.localStorage.removeItem('token')
      router.go('/login');
    }
    if (response.status == 200) {
      if((typeof response.body)=='string'){
        //console.log(response);
        response.body=JSON.parse(response.body);
      }
    } else {
      Vue.$toast(response.statusText);
    }
    return response
  });
})
router.start(App, 'app')
Vue.filter('toFixed', function(value) {
  return value.toFixed(2);
});
Vue.filter('toDate', function (value) {
  let year = value.getFullYear();
  let month = (value.getMonth()+1)<10?("0"+(value.getMonth()+1)):(value.getMonth()+1);
  let day = value.getDate()<10?("0"+value.getDate()):value.getDate();
  return year+"-"+month+"-"+day;
})
