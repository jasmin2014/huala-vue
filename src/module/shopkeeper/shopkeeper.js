import './css.css';
import '../../assets/font/iconfont.css'
import 'mint-ui/lib/toast/style.css';
import 'mint-ui/lib/indicator/style.css';
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './app';
import '../../utils';
import '../../api'
import Indicator from 'mint-ui';

Vue.use(VueResource)
Vue.use(Indicator)

Vue.http.interceptors.push(function (request, next) {
  Vue.$indicator.open('加载中');
  next(function (response) {
    Vue.$indicator.close();
    return response
  });
})

new Vue({
  el: 'body',
  components: {App}
})
