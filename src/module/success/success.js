import './css.css';
import '../../assets/font/iconfont.css'
import 'mint-ui/lib/toast/style.css';
import 'mint-ui/lib/indicator/style.css';
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './app'
import '../../api'
import '../../utils'

/**
 * 日期格式化过滤
 */
Vue.filter('dateFormat', function (value) {
	if(value != undefined) {
		let d = new Date(value);
		return d.getFullYear()+'-'+(d.getMonth() + 1)+'-'+d.getDate()+' '+
		   d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	}
})

Vue.use(VueResource)

new Vue({
  el: 'body',
  components: {App}
})

