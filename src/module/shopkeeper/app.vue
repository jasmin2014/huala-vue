<template>
    <header class="header">
        <div class="hpic">
            <img v-bind:src="imgUrl + order.seller.imgUrl + '?s=220x220'" square-picture="" height="70">
        </div>
        <div class="mess">
            <p class="name">{{order.seller.name}}</p>
            <p class="sname">花啦生活合作商家</p>
        </div>
    </header>
    <div class="discounts">
        <p class="tit">商家优惠</p>
        <div class="clear man" v-if='!order.actCard'>
            <div  v-if='order.userId'>
                <p class="left">暂无优惠</p>
                <p class="right"></p>
            </div>
            <div v-else>
                <p class="left">支付立减</p>
                <p class="right"></p>
            </div>
        </div>
        <div class="clear man" v-else>
            <p class="left" v-if="order.actCard.sums">满{{order.actCard.sums/100}}减{{order.actCard.balance/100}}</p>
            <p class="right">{{order.actCard.name}}</p>
        </div>
        <div class="clear upay">
            <p class="left">还需付款（元）</p>
            <p class="right pce">￥{{order.orderAmount/100}}</p>
        </div>
        <div v-if="env == 'dev' || env == 'test'">
            <div class="clear upay">
              <p class="left">openid</p>
              <p class="right pce">{{openid}}</p>
            </div>
            <div class="clear upay">
              <p class="left">alipayId</p>
              <p class="right pce">{{alipayId}}</p>
            </div>
            <div class="clear upay">
              <p class="left">userId</p>
              <p class="right pce">{{order.userId}}</p>
            </div>
        </div>
    </div>
    <div class="buttons">
        <button class="paynow active" @click="isLogin();">立即支付</button>
    </div>
    <div class="loginmodel" v-if='isLoginForm'>
        <div class="loginmask" @click="isLoginForm=!isLoginForm"></div>
        <div class="logininner">
            <div class="phone">
            	<input type="number" placeholder="手机号" v-model="phone">
                <p class="phone_clear"><span class="iconfont">&#xe678;</span></p>
            </div>
            <div class="clear code">
                <input type="number" v-model="password" placeholder="验证码">
                <div class="sendercode" v-bind:class="{'send1':isDisable}" @click="sendCode()" id="codeMsgId">发送验证码</div>
            </div>
            <div class="agreement">
                <span class="iconfont"></span>
                <p>注册账号就视为已阅读并同意花啦生活用户协议</p>
            </div>
            <div class="loginbtn" @click="seller()"><p>新老用户登录立减</p></div>
            <div class="topaynow" @click="goPay()">忍痛放弃，继续支付</div>
            <div class="pay_logo"><img src="../../assets/logo.png"></div>
            <div class="closemodel" @click="isLoginForm=!isLoginForm">
            	<span class="iconfont">&#xe60d;</span>
            </div>
        </div>
    </div>
</template>
<script>
  import { Toast} from 'mint-ui';

  var timer = 'undefined';
  export default {
    name: 'order',
    data () {
      return {
        env: env,
        isLoginForm: false,
        amount: '',
        imgUrl:ImgUrl,
        phone: '',
        password: '',
        isDisable: false,
        openid: localStorage.getItem('openid'),
        alipayId: localStorage.getItem('alipayId'),
        order : {seller:{}, actCard:{}}
      }
    },
    created () {
      if(this.showOut()) {
        this.seller();
      }
    },
    methods: {
      // 获取店铺信息
      seller () {
          let openid = localStorage.getItem('openid');
          let alipayId = localStorage.getItem('alipayId');
          let code;
          if(isWeiXin()) {
          	code = paramStr('code');
          } else if(isAlipay()) {
          	code = paramStr('auth_code');
          }
          let amountTemp=this.amount;
          this.$http.post(SysApiUrl + '/shopkeeper/order/page', {
              "orderSn": paramStr('orderSn'),
              "code": code,
              "openid":openid === 'undefined' ? '' : openid,
              "alipayId":alipayId === 'undefined' ? '': alipayId,
              "phone":this.phone,
              "password":this.password
          }).then(function(response) {
              this.amount=amountTemp;
              var a=typeof response.data;
              var j=(a==='object'?response.data:JSON.parse(response.data.toString()));
              if(j.success) {
              	  this.order = j.body;
                  localStorage.setItem('openid',this.order.openid);
                  localStorage.setItem('alipayId',this.order.alipayId);
                  if(this.order.userId) {
                  	// 登录成功之后 将登录的信息保存至本地缓存
                  	localStorage.setItem('isLogin', true);
                  }
              } else {
                  Toast(j.message);
              }
              this.isLoginForm=false;
          });
      },
      isLogin () {
          if(this.order.userId) {
            // 用户登录 则直接去支付
            this.goPay();
          } else {
            this.isLoginForm=true;
          }
      },
      goPay () {
          // 设置支付成功之后的跳转地址
          this.order.seccessUrl = window.location.href.substring(0,window.location.href.lastIndexOf('/')) + "/success.html";
		      this.$http.post(SysApiUrl + '/shopkeeper/order/confirm', this.order).then(function(response)  {
            var j=(typeof response.data==='object'?response.data:JSON.parse(response.data.toString()));
 			      if(j.success) {
                  var res = j.body;
                  if(isWeiXin()) {
                    window.location.href = res.payUrl;
                  } else {
                    // 支付宝支付 则跳转到支付宝的收银台
                    this.alertAlipayTable(res);
                  }
                } else {
                    Toast(j.message);
                }
          }, function(response) {
            console.log(response + '--------------');
		  });
      },
      // 发送验证码
      sendCode () {
      	if(timer != 'undefined') {
      		return;
      	}
        // 倒计时计数器
        let second = 59;
        this.$http.post(ApiUrl + '/scan/code',
          {
            'phone': this.phone
          }).then(function(response) {
			var j=(typeof response.data==='object'?response.data:JSON.parse(response.data.toString()));
 			if(j.success) {
              var codeMsg = document.getElementById("codeMsgId");
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
      	  }, function(response) {
      		codeMsg.innerHTML = "发送验证码";
		  });
      },
      // 跳转检查
      showOut () {
        // 是否显示商家的信息
        let isShow = true;
        if (isWeiXin()) {
          var openid = localStorage.getItem('openid');
          if (openid === 'undefined' || openid == null) {
            if (!paramStr('code')) {
              location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxAppId +
                '&redirect_uri=' + location.href + '&response_type=code&scope=snsapi_base&state=wx#wechat_redirect';
              isShow = false;
            }
          }
        } else if (isAlipay()) {
          var alipayId = localStorage.getItem('alipayId');
          if (alipayId === 'undefined' || alipayId == null) {
            if (!paramStr('auth_code')) {
              location.href = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + aliAppId + '&scope=auth_base&' +
                'redirect_uri=' + location.href;
              isShow = false;
            }
          }
        } else {
          Toast('请用微信或支付宝打开');
          isShow = false;
        }
        return isShow;
      },
	  // 弹出支付宝收银台
	  alertAlipayTable (res) {
	  	var el = document.createElement('form');
        el.id = 'alipaysubmit';
        el.style.display='none';
        el.action = "https://mapi.alipay.com/gateway.do?_input_charset=utf-8";
        let form = document.body.appendChild(el);
        for(let key in res) {
          let input= document.createElement('input')
          input.name = key;
          input.value = res[key];
          input.type = 'text';
          form.appendChild(input);
        }
        document.forms['alipaysubmit'].submit();
	  }
    }
  }
</script>
<style>
</style>
