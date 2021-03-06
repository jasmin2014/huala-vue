import  'mint-ui/lib/style.css'
import  './css.css'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'
import App from './app'
import '../../api.js'
import MovieList from './comp/MovieList'
import Vote from './comp/Vote'


Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Mint)
const router = new VueRouter();
router.map({
  '/movieList/:sellerId': {
    name: 'movieList',
    component: MovieList
  },
  '/vote/:sellerId/:address': {
    name: 'vote',
    component: Vote
  }
})
router.beforeEach(function (transition) {
  //登录中间验证，页面需要登录而没有登录的情况直接跳转登录
  //处理左侧滚动不影响右边
  //console.log(transition);
  transition.next();
})
router.redirect({
  '*': '/movieList'
})
Vue.http.interceptors.push(function (request, next) {
  Vue.$indicator.open('加载中');
  request.url = (request.url.indexOf(ApiUrl) >= 0) ? request.url : (ApiUrl + request.url);
  next(function (response) {
    Vue.$indicator.close();
    //console.log(response)
    if (response.status == 200) {
      if((typeof response.body)=='string'){
          response.body=JSON.parse(response.body);
      }
    } else {
      Vue.$toast(response.statusText);
    }
    return response
  });
})
router.start(App, 'app')
