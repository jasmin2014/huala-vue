<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <header class="headerModule" returnback="true" middle="true" v-bind:class="{'Fiexd':Fixed}">
    <form>
      <p class="seearound" v-if="pageName!=='SellerList'">
        <a href="/">
          <em class="iconfont icon-location"></em>
          <span class="around_txt">周边看看</span>
        </a>
      </p>
      <a href="javascript:window.history.go(-1)" class="returnback" v-if="pageName==='SellerList'"><em class="iconfont"></em></a>
      <p class="middle" @click="openAddress()" v-if="pageName=='SellerList'||pageName=='sellerDetail'">
        <a href="javascript:void(0);"><span class="sendto">送至：{{LocationAddress}}</span><em class="iconfont downico"></em></a>
      </p>
      <p class="addressbox ng-scope" v-if="searchBox&&showMiddle==true">
        <input type="search" name="keyword" placeholder="搜索本店商品" ng-focus="gotoSearch()">
      </p>
      <p class="icon-cart">
        <a href="#/cart"> <em class="iconfont icon-big"></em>
          <span class="cart_label" ng-show="cartIcon"></span>
        </a>
      </p>
      <p class="icon-nav">
        <em class="iconfont icon-big"></em>
      </p>
      <nav class="popup">
        <ul>
          <li><a href="#/seller">回到店铺</a></li>
          <li><a href="#/order/list">订单中心</a></li>
          <li><a href="#/my">个人中心</a></li>
        </ul>
        <p class="triangle">
          <span></span>
        </p>
      </nav>
    </form>
  </header>
</template>
<script>
  export default{
    props:['pageName','searchBox','Fixed','LocationAddress','showMiddle'],
    components:{},
    data(){
      return {
        geo:''
      }
    },
    ready(){
    },
    methods: {
      openAddress(){
        this.$router.go({path:'/address'})
      }
    },
  }
</script>
<style>
  .headerModule {
    position: relative;
    display: block;
    width: 100%;
    height: 3em;
    line-height: 3em;
    background-color: #ffdd24;
    color: #4a4a4a;
    font-size: 85%;
    text-align: center;
  }
  .headerModule.Fiexd {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
  }
  .headerModule form {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .headerModule .returnback,.headerModule .middle {
    position: absolute;
    top: 0;
  }
  .headerModule .returnback{
    left: 0;
    z-index: 99;
    width: 3em;
    height: 3em;
    line-height: 3em;
    text-align: center;
  }
  .headerModule .middle{
    text-align: center;
    left: 50%;
    margin-left: -23%;
    width: 46%;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .headerModule .downico{
    font-size: 100%;
    margin-left: 5px;
    float: left;
  }
  .headerModule .icon-cart{
    position: absolute;
    width: 3em;
    height: 3em;
    right: 3em;
    content: "&#xe60a;";
  }
  .headerModule .icon-cart .icon-big, .headerModule .icon-nav .icon-big{
    font-size: 160%;
  }
  .headerModule .icon-nav , .headerModule .icon-cart .cart_label {
    position: absolute;
    right: 0;
  }
  .headerModule .icon-nav {
    width: 3em;
    height: 3em;
    top:0;
    content: "&#xe608;";
  }
  .headerModule .icon-cart .cart_label{
    width: 6px;
    height: 6px;
    background-color: #ff3000;
    border-radius: 50%;
    top: 9px;
  }
  .headerModule .popup{
    position: absolute;
    right: 1%;
    top: 3em;
    z-index: 99;
    width: 30%;
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    padding: .2em 0;
    border-radius: 4px;
    display: none;
  }
  .headerModule .popup li{
    line-height: 2em;
    text-align: center;
    position: relative;
  }
  .headerModule .popup a {
    color: #fff;
  }
  .headerModule .triangle{
    position: absolute;
    right: 2%;
    top: -10px;
    width: 20px;
    height: 10px;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 4px 0 0 4px;
  }
  .headerModule .triangle span{
    display: block;
    width: 14px;
    height: 14px;
    background: rgba(0, 0, 0, 0.6);
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -m-transform: rotate(-135deg);
  }
  .headerModule .seearound {
    position: absolute;
    left: 3%;
    top: .6em;
    line-height: 2em;
    font-size: 86%;
  }
  .headerModule .seearound em.icon-location{
    font-size: 160%;
    display: block;
    line-height: .8em;
  }
  .headerModule .seearound .around_txt{
    font-size: 86%;
    line-height: 1.6em;
    display: block;
  }
  .headerModule .addressbox {
    position: absolute;
    top: .3em;
    text-align: center;
    left: 50%;
    margin-left: -29%;
    width: 58%;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 2.4em;
    padding: .4em 0 .4em 3%;
    border-radius: 3px;
    background-color: #fff;
  }
  .headerModule .addressbox input{
    position: absolute;
    left: 5%;
    top: 50%;
    width: 90%;
    height: 1.6em;
    line-height: 1.6em;
    margin-top: -.8em;
    border: none;
    color: #333;
    font-size: 108%;
  }
  .headerModule .sendto {
    width: 86%;
    height: 3em;
    overflow: hidden;
    display: inline-block;
    white-space:nowrap;
    text-overflow:ellipsis;
    float: left;
  }
</style>
