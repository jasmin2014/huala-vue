import  'mint-ui/lib/style.css'
import  './css.css'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Loadmore from 'mint-ui/lib/loadmore'
import header from 'mint-ui/lib/header'
import button from 'mint-ui/lib/button'
import Indicator from 'mint-ui/lib/indicator';
import Toast from 'mint-ui/lib/toast';
import MessageBox from 'mint-ui/lib/message-box';
import App from './app'
import '../../api.js'
import Brm from './pages/Brm.vue'
import BrmCash from './pages/BrmCash.vue'
import BrmDetail from './pages/BrmDetails.vue'


Vue.use(VueResource)
Vue.use(VueRouter)

//Vue.use(Mint)
Vue.component(Loadmore.name, Loadmore);
Vue.component(header.name, header);
Vue.component(button.name, button);

Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$indicator = Vue.prototype.$indicator = Indicator;
const router = new VueRouter();
router.map({
  '/brm': {
    component: Brm
  },
  '/brmcash': {
    name: 'BrmCash',
    component: BrmCash
  },
  '/brmdetail': {
    name: 'BrmDetail',
    component: BrmDetail
  }
})
router.beforeEach(function (transition) {
  //登录中间验证，页面需要登录而没有登录的情况直接跳转登录
  //处理左侧滚动不影响右边
  //console.log(transition);
  transition.next();
})
router.redirect({
  '*': '/brm/'
});
Vue.http.interceptors.push(function (request, next) {
  Vue.$indicator.open('加载中');

  //request.headers.token = "86f82986-695a-4651-ba69-8f29e51b31df";
  while (true){
    let _token = window.sessionStorage.getItem('token');
    request.headers.token = _token;
    break;
  }

  request.url = (request.url.indexOf(SysApiUrl) >= 0) ? request.url : (SysApiUrl + request.url);
  next(function (response) {
    Vue.$indicator.close();

    if (response.status == 200) {
      if((typeof response.body)=='string'){
          response.body=JSON.parse(response.body);
      }
    } else {
      if(response.status==401&&window.sessionStorage.getItem('token')!==""){
        window.location.href = "NMApp::reLogin";
      }
      Vue.$toast(response.statusText);
    }
    return response
  });
});
Vue.filter('toFixed', function(value) {
  if(value>=0){
    return "+"+value.toFixed(2);
  }else{
    return value.toFixed(2);
  }
});
Vue.filter('toFixedPositive', function(value) {
  return value.toFixed(2);
});
/*Vue.filter("CardNoFormat",function (value) {
  return value.substring(0,4)+" "+value.substring(5,8) + " " + value.substring(9,13)+ " " + value.substring(14,value.length);
})*/
Vue.filter('toDate', function (value) {
  let year = value.getFullYear();
  let month = (value.getMonth()+1)<10?("0"+(value.getMonth()+1)):(value.getMonth()+1);
  let day = value.getDate()<10?("0"+value.getDate()):value.getDate();
  return year+"-"+month+"-"+day;
})
router.start(App, 'app');




