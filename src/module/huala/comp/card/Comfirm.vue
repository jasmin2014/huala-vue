<template>
  <div class="confirmPageModule" id="confirmpage">
    <div class="confirmpage">
      <address-module :change-address="ChangeAddress"></address-module>
      <article class="itempic myproducts" id="myproducts">
        <ul class="mygooditems clear">
          <li>
            <p class="item-pic">
              <img src="http://wxtest.huala.com:8081/hlman-pic/goods/201512/1450071824660.jpg?s=220x220" />
            </p>
          </li>
          <li>
            <p class="item-pic">
              <img src="http://wxtest.huala.com:8081/hlman-pic/goods/201512/1450071849597.jpg?s=220x220" />
            </p>
            <span class="num_label">2</span>
          </li>
          <li>
            <p class="item-pic">
              <img src="http://wxtest.huala.com:8081/hlman-pic/goods/201511/1447654392906.jpg?s=220x220" />
            </p>
            <span class="num_label">2</span>
          </li>
          <li>
            <p class="item-pic">
              <img src="http://wxtest.huala.com:8081/hlman-pic/goods/201511/1448353874858.jpg?s=220x220" />
            </p>
          </li>
          <li>
            <p class="item-pic">
              <img src="http://wxtest.huala.com:8081/hlman-pic/goods/201511/1448353864392.jpg?s=220x220" />
            </p>
          </li>
        </ul>
        <div class="item-total">
          共7件
        </div>
        <div>
          <div class="item-more">
            <span class="iconfont"></span>
          </div>
          <div class="item-more_e"></div>
        </div>
      </article>
      <article class="confirmitem">
        预约时间
        <span class="greyclr">(仅超市、自营)</span>
        <div class="choosedate_click">
          <p class="current-time"><span>2016-11-04 12:00:00</span></p>
          <p class="changeaddressico rightico"><em class="iconfont"></em></p>
        </div>
      </article>
      <article class="confirmitem">
        商家活动
        <p class="current-hds"><span class="active_blank">暂无活动</span></p>
      </article>
      <article class="confirmitem">
        红包/优惠券
        <div class="choosedate_click">
          <p class="changeaddressico rightico" style="display:none;"><em class="iconfont"></em></p>
          <p class="rightico deleteEnve" style="display:none;"><em class="iconfont"></em></p>
          <p class="enve_blank greyclr">暂无红包</p>
          <p class="current-time" style="display:none;">有0个红包可用</p>
          <p class="current-time" style="display:none;">不使用优惠券</p>
        </div>
      </article>
      <div class="mt15 whitebg choosemethod">
        <h3>选择配送方式</h3>
        <div class="pick_up_personal">
          <p>自行提货 <span class="redclr">(免配送费)</span></p>
          <p class="pick_up_address greyclr">商家地址：开店管理时填入的地址Shop001</p>
          <span class="changeaddressico"><em class="iconfont hidden"></em></span>
        </div>
        <div class="pick_up_ps">
          <p>商家配送</p>
          <span class="changeaddressico"><em class="iconfont hidden"></em></span>
        </div>
      </div>
      <article class="money_m">
        <div class="clear">
          <span class="money_l">运费金额：</span>
          <span class="money_p">￥5.00</span>
        </div>
        <div class="clear">
          <span class="money_l">抵用金额：</span>
          <span class="money_p">￥0.00</span>
        </div>
        <div class="clear">
          <span class="money_l">商品金额：</span>
          <span class="money_p">￥84.20</span>
        </div>
      </article>
      <article class="confirmitem">
        买家留言：
        <p class="message"><input type="text" placeholder="30个字以内" /></p>
      </article>
      <article class="confirmitem footer_buy">
        <div>
          <p class="c_yingfu">应付：<span class="money_p">￥89.20</span></p>
          <button class="gotobuy" disabled="disabled">下订单</button>
        </div>
      </article>
    </div>
  </div>

</template>

<script>
    import AddressModule from '../common/AddressModule.vue';
    export default{
        components: {AddressModule},
        props: ['SellerId'],
        data(){
            return {
              sid:'',
              ChangeAddress: false
            }
        },
        computed: {
          s:function () {
            this.sid = this.SellerId;
            console.log("sid:"+this.sid);
            return this.SellerId;
          }
        },
        watch: {
          "sid":function () {
          }
        },
        methods: {

        }
    }
</script>
<style>
  .confirmPageModule {
    background: #eee;
    min-height: 100vh;
  }
  @media (min-height: 480px){
    .confirmpage {
      padding-bottom: 4em;
    }
  }
  @media (min-width: 320px){
    .mygooditems {
      height: 4.4em;
      overflow: hidden;
    }
  }
  @media (min-width: 320px){
    .myproducts .item-total, .mygooditems li {
      width: 4.4em;
      height: 4.4em;
      line-height: 4.4em;
    }
    .myproducts .item-more {
      right: 4.4em;
      height: 4.4em;
      line-height: 4.4em;
    }
    .myproducts {
      height: 5em;
    }
  }
  .confirmPageModule .myproducts {
    position: relative;
    display: block;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 0 3%;
    background: #fff;
    margin-top: .6em;
  }
  .mygooditems {
    width: 77%;
    overflow: hidden;
  }
  .mygooditems li{
    position: relative;
    float: left;
    padding: .3em;
    margin-top: .3em;
  }
  .mygooditems li p.item-pic{
    width: 100%;
    padding: .2em;
    border: 1px solid #E0E0E0;
    border-radius: 3px;
  }
  p.item-pic img {
    width: 100%;
  }
  .myproducts .item-total{
    position: absolute;
    right: 1%;
    top: 0;
    text-align: center;
    color: #666;
  }
  .myproducts .item-more {
    position: absolute;
    top: 0;
    text-align: center;
    color: #666;
  }
  .myproducts .num_label{
    position: absolute;
    right: 0;
    top: 0;
    width: 1.4em;
    height: 1.4em;
    background-color: #ff3c00;
    color: #fff;
    text-align: center;
    line-height: 1.4em;
    border-radius: 50%;
    font-size: 86%;
  }
  .confirmitem{
    display: block;
    position: relative;
    height: 3.6em;
    line-height: 3.6em;
    padding: 0 3%;
    font-size: 86%;
    background: #fff;
    margin-top: .6em;
  }
  .confirmitem .choosedate_click {
    position: absolute;
    right: 3%;
    top: 0;
    width: 50%;
    height: 3.6em;
  }
  .confirmitem .choosedate_click .current-time{
    position: absolute;
    right: 3em;
    top: 50%;
    margin-top: -1.8em;
    color: #ff3c3c;
  }
  .confirmitem .changeaddressico.rightico {
    right: 3%;
  }
  .confirmitem .current-hds {
    position: absolute;
    right: 3%;
    top: 0;
    width: 60%;
    text-align: right;
    height: 3.6em;
    overflow: hidden;
    color: #ff3c3c;
  }
  .confirmitem .deleteEnve {
    position: absolute;
    right: 3%;
    top: 50%;
    margin-top: -2em;
  }
  .confirmitem .deleteEnve em {
    font-size: 200%;
  }
  .confirmitem .choosedate_click .enve_blank {
    position: absolute;
    right: 0;
    top: 0;
    color: #9b9b9b;
  }
  .choosemethod {
    padding: .4em 0;
    margin-top: .6em;
    background-color: #fff;
  }
  .choosemethod h3{
    font-size: 110%;
    font-weight: 400;
    line-height: 2em;
    margin-left: 3%;
  }
  .choosemethod .pick_up_personal, .choosemethod .pick_up_ps {
    position: relative;
    padding: .5em 3% .5em 3.2em;
  }
  .pick_up_address {
    font-size: 86%;
    color: #9b9b9b;
  }
  .choosemethod .changeaddressico {
    left: 3%;
  }
  .money_m {
    height: auto;
    padding: .4em 3%;
    margin-top: .6em;
    background-color: #fff;
  }
  .money_m > div {
    height: 1.6em;
    line-height: 1.6em;
    font-size: 85%;
  }
  .money_m .money_l {
    float: left;
  }
  .money_m .money_p {
    float: right;
  }
  .message {
    position: absolute;
    left: 5.6em;
    top: .3em;
    width: 76%;
    height: 3em;
    line-height: 3em;
  }
  .message input {
    display: block;
    width: 100%;
    border: none;
    height: 100%;
  }
  .footer_buy {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0;
    width: 100%;
    border-top: 1px solid #eee;
    background: rgba(255,255,255,.9);
    margin-top: .6em;
  }
  .c_yingfu {
    margin-left: 3%;
  }
  .gotobuy {
    position: absolute;
    right: 0;
    top: 0;
    width: 8em;
    height: 3.6em;
    text-align: center;
    line-height: 3.6em;
    background: #ffdd24;
    font-family: "微软雅黑";
    border: none;
  }
  .gotobuy:disabled {
    background: #9b9b9b;
  }
  .redclr {
    color: red;
  }
</style>
