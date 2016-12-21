<template>
    <paysuccess :is-login.sync="isLogin" :order.sync="order" v-if="!isShow"></paysuccess>
    <loginsuccess :coupon.sync="coupon" :order.sync="order" v-if="isShow"></loginsuccess>
</template>
<script>
    import paysuccess from './pay.success';
    import loginsuccess from './login.success';
    import { Indicator ,Toast} from 'mint-ui';
    
    export default {
        name: 'success',
        data () {
            return {
            	isShow: false,
            	isLogin: localStorage.getItem('isLogin'),
            	order: {seller:{}},
            	coupon: {}
            }
        },
        components: {
            paysuccess,loginsuccess
        },
        created () {
        	this.getOrder();
        },
        methods: {
        	// 获取订单信息
        	getOrder () {
	            Indicator.open('加载中...');
	            let amountTemp=this.amount;
	            this.$http.get(ApiUrl + '/scan/get-order', {
	            	params: {orderSn: paramStr('orderSn')}
	            }).then((response) => {
	                Indicator.close();
	                var a=typeof response.data;
	                var j=(a==='object'?response.data:JSON.parse(response.data.toString()));
	                if(j.success) {
	              	    this.order = j.body;
	              	    this.order.openid = paramStr('openid');
	              	    this.order.alipayId = paramStr('alipayId');
	                } else {
	                  Toast(j.message);
	                }
	                this.isLoginForm=false;
	            });
        	}
        },
        events: {
		    'coupon': function (coupon) {
		        this.coupon = coupon;
		        this.isShow = true;
		    }
		}
    }
</script>
