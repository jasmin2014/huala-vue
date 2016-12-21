<template>
     <div class="successmodel" v-if="coupon">
        <div class="sucinner">
          <div class="text">
            <p><img src="../../assets/yhq.png"></p>
          </div>
          <div class="sign sign2">
            <div class="signpic2">
              <img src="../../assets/rpaper_list.png">
              <span class="expire">￥{{coupon.sums/100}}</span>
              <span class="substract">￥{{coupon.balance/100}}</span>
              <p class="warn">{{coupon.name}}</p>
              <p class="prescription">
              	红包有效期：{{coupon.startDay | dateFormat}} 至 {{coupon.endTime | dateFormat}}
              </p>
            </div>
            <p class="signtext">优惠券已存入账户，扫码即刻使用！</p>
          </div>
          <div class="lcode">
            <p class="codepic">
            	<img src="../../assets/code.jpg">
            </p>
            <p class="codemess">扫我关注，极速购物</p>
          </div>
        </div>
        <div class="sucbutton" @click="goPay()"><span>继续支付</span></div>
     </div>
    
	 <div class="successmodel" v-if="!coupon">
	    <div class="sucinner">
	      <div class="text">
	        <p>
	        	<img src="../../assets/dlcg.png">
	        </p>
	      </div>
	      <div class="sign">
	        <p class="signpic">
	        	<img src="../../assets/sign.png">
	        </p>
	        <p>您的新手红包已经领过啦...</p>
	      </div>
	      <div class="lcode">
	        <p class="codepic">
	        	<img src="../../assets/code.jpg">
	        </p>
	        <p class="codemess">扫我关注，极速购物</p>
	      </div>
	    </div>
	    <div class="sucbutton" @click="goPay()"><span>继续支付</span></div>
	 </div>
</template>
<script>
  export default {
    name: 'login-success',
    data () {
      return {
      }
    },
    props: ['order','coupon'],
    created () {
    },
    methods: {
      // 继续去支付
      goPay () {
         window.location.href = "scan.html?sellerId=" + this.order.seller.id;
      }
    }
  }
</script>
<style>
	
</style>