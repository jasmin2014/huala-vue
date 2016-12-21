<template>
  <mt-popup :visible.sync="true" position="right" class="mint-popup-3">
    <mt-header fixed title="店铺详情">
      <mt-button icon="back" slot="left" @click="popupClose()"></mt-button>
    </mt-header>
    <div class="sellerinfomenu">
      <span @click="showmenu=showmenu?false:true;">...</span>
      <div class="sellermenulist" v-bind:class="{'show':showmenu}">
        <p>商家信息</p>
        <p>结算管理</p>
        <p>转账提现</p>
        <p>店铺银行卡</p>
        <p>卡券列表</p>
      </div>
    </div>
  <div class="sellerinfo container">
    <!--<seller-message :seller-id="sellerId"></seller-message>
    <seller-balance :seller-id="sellerId"></seller-balance>
    <bank-card :seller-id="sellerId"></bank-card>-->
  </div>
  </mt-popup>

</template>

<script>
  import { MessageBox } from 'mint-ui/lib/';
  /*import SellerMessage  from './SellerMessage.vue';
  import SellerBalance from './SellerBalance.vue';
  import BankCard from './BankCard.vue';*/
  export default{
      components: {MessageBox/*, SellerMessage, SellerBalance, BankCard*/},
      props: [],
      data(){
          return {
            showmenu: false,
            sellerId: this.$route.params.sellerId,
            sellerInfo: [],
            selected: '0',
            showEdit: false
          }
      },
      ready(){
        //console.log(this.showEdit);
      },
      methods: {
        popupClose(){
          window.history.back();
        }
      }
  }
</script>
<style>
  .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    z-index: 1000;
  }
  .popup-swipe {
    height: 90%;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }
  .sellerinfo {
    width: 100%;
    min-height: 100vh;
    background:#fff;
  }
  .sellerinfomenu {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 25px;
  }
  .sellerinfomenu span {
    font-size: 130%;
    width: 100%;
    height: 100%;
    display: block;
  }
  .sellermenulist {
    width: 80px;
    position: absolute;
    left: -40px;
    font-size: 80%;
    line-height: 2.4em;
    top: 40px;
    background: #fff;
    border: 1px solid #fedc23;
    display: none;
  }
  .sellermenulist.show {
    display: block;
  }
  .sellermenulist >p {
    height: 2.4em;
    line-height:2.4em;
    border-bottom: 1px solid #fedc23;
  }
  .sellermenulist >p:last-child {
    border-bottom: none;
  }
  .myedititem {
    padding: .8em;
    border-bottom: 1px solid #e5e5e5;
    display: none;
  }
  .myedititem.show {
    display: block;
  }
  .myedititem >div{
    width: 60px;
    height: 2.4em;
    line-height: 2.4em;
    text-align: center;
    background: #fedc23;
    font-size: 80%;
    float: left;
    margin-right:.8em;
  }
</style>
