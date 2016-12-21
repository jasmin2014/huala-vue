<template>
    <div class="successmodel">
        <div class="ilogin" v-if="!isLogin">
            <h2>登录赢红包</h2>
            <div class="ilogininner clear">
                <div class="iloginleft">
                    <p class="inputphone">
                        <input type="text" v-model="phone">
                        <span class="iconfont"></span>
                    </p>
                    <div class="clear">
                        <p class="inputcode">
                            <input type="text" v-model="password">
                        </p>
                        <p class="isendercode" v-bind:class="{'send1':isDisable}" @click="sendCode()" id="codeMsgId">发送验证码</p>
                    </div>
                </div>
                <div class="iloginright" @click="login()">登录</div>
            </div>
        </div>
        <div class="sucinner" style="margin-top:1rem">
            <div class="sellerlogo">
                <div class="slogoinr">
                    <p class="slogo">
                        <img src="../../assets/logo.png">
                    </p>
                    <span class="bigfont">{{order.seller.name}} </span>
                </div>
            </div>
            <div class="amount">
                <p class="alabel">实付金额：</p>
                <p class="aprice">￥{{order.payAmount/100}}</p>
            </div>
            <div class="message">
                <p class="clear red">
                    <span class="mlabel">优惠金额：</span>
                    <span class="mprice">￥{{order.discountAmount/100}}</span>
                </p>
                <p class="clear">
                	<span class="mlabel">商品金额：</span>
                    <span class="mprice">￥{{order.goodAmount/100}}</span>
                </p>
            </div>
            <div class="ordermess">
                <p>订单编号：{{order.orderSn}}</p>
                <p>订单时间：{{order.addTime | dateFormat}}</p>
            </div>
            <div class="code">
                <p class="codepic"><img src="../../assets/code.jpg"></p>
                <p class="codemess">扫我多认识一个良心的购物平台</p>
            </div>
        </div>
        <div class="iloginbanner" v-if="is-login">
            <img src="../../assets/banner.png">
        </div>
        <div class="sucbutton" @click="goPay()">
            <span>继续支付</span>
        </div>
    </div>
</template>
<script>
    import { Indicator ,Toast} from 'mint-ui';

	var timer = 'undefined';
    export default {
        name: 'success',
        data () {
            return {
            	phone: '',
                isDisable: false,
            	password: ''
            }
        },
        props: ['is-login','order'],
        created () {
        },
        methods: {
            // 继续去支付
        	goPay () {
        		window.location.href = "scan.html?sellerId=" + this.order.seller.id;
        	},
        	// 发送验证码
	        sendCode () {
		      	if(timer != 'undefined') {
		      		return;
		      	}
		        Indicator.open('发送中...');
		        // 倒计时计数器
		        let second = 59;
		        this.$http.post(ApiUrl + '/scan/code',
		          {
		              'phone': this.phone
		          }).then((response) => {
		          	  Indicator.close();
					  var j=(typeof response.data==='object'?response.data:JSON.parse(response.data.toString()));
		 			  if(j.success) {
		                  var codeMsg = document.getElementById("codeMsgId");
			          	  Indicator.close();
                    this.isDisable = true;
                    let self = this;
			          	  timer = setInterval(function(d) {
                        self.isDisable = true;
			              	  codeMsg.innerHTML = (second--) + "s";
						      if(second <= 0) {
                    self.isDisable = false;
								  codeMsg.innerHTML = "发送验证码";
								  clearInterval(timer);
								  timer = 'undefined';
							  }
				          },1000);
		             } else {
		                 Toast(j.message);
		             }
		      	 }, (response) => {
		      		codeMsg.innerHTML = "发送验证码";
				 });
	         },
	         // 用户登录
	         login () {
				 Indicator.open('加载中...');
	             let amountTemp=this.amount;
	             this.$http.post(ApiUrl + '/scan/login', {
	            	 mobile: this.phone,
	            	 email: this.password,
	            	 openid: localStorage.getItem('openid'),
	            	 alipayId: localStorage.getItem('alipayId'),
	            	 sellerId: this.order.seller.id
	             }).then((response) => {
	                 Indicator.close();
	                 var a=typeof response.data;
	                 var j=(a==='object'?response.data:JSON.parse(response.data.toString()));
	                 if(j.success) {
	                 	 // 将优惠信息转发到父组件
	                 	 this.$dispatch('coupon', j.body);
	                 } else {
	                     Toast(j.message);
	                 }
	                 this.isLoginForm=false;
	             });
	         }
         }
    }
</script>
