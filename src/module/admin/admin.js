import  'mint-ui/lib/style.css'
import  './css.css'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'
import App from './app'
import '../../api.js'
import '../../components/uploader'
import Home from './comp/Home.vue'
import SellerAuth from './comp/SellerAuth.vue'
import Login from './comp/Login.vue'
import ShopAuth from './comp/seller/ShopAuth.vue'
import  Order from './comp/Order.vue'
import SpikeAct from './comp/spike/SpikeAct.vue'
import Movie from './comp/hng/Movie.vue'
import SellerDetail from './comp/SellerDetail.vue'
import SellerDetailInfo from './comp/sellerInfo/SellerDetailInfo.vue'


Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Mint)
const router = new VueRouter();
router.map({
  '/': {
    component: Home
  },
  '/seller-auth': {
    component: SellerAuth,
    subRoutes: {
      '/shop-auth/:sellerId': {
        component: ShopAuth
      }
    }
  },
  '/seller-detail':{
    component: SellerDetail,
    subRoutes: {
      '/seller-detail-info/:sellerId':{
        component: SellerDetailInfo
      }
    }
  },
  '/order': {
    component: Order
  },
  '/spike-act':{
    component:SpikeAct
  },
  '/movie':{
    component:Movie
  },
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
  request.headers.token = window.localStorage.getItem('token')
  request.headers.city = window.localStorage.getItem('city')
  request.url = (request.url.indexOf(SysApiUrl) >= 0) ? request.url : (SysApiUrl + request.url);
  //console.log(request.url)
// continue to next interceptor
  next(function (response) {
    // ...
    // 请求发送后的处理逻辑
    // ...
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    //console.log(response);
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
