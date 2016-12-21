<template>
  <mt-popup :visible.sync="true" position="right" class="mint-popup-3">
    <mt-header fixed title="固定在顶部">
      <mt-button icon="back" slot="left" @click="popupClose()"></mt-button>
    </mt-header>
  <div class="shopinfo container">
    <div class="mtswitch"><mt-switch :value.sync="sales">是否上架默认商品</mt-switch></div>
    <div class="buttons">
      <mt-button size="small" type="primary" @click="audit('auth')">审核通过</mt-button>
      <mt-button size="small" type="default" @click="showUnauth()">审核不通过</mt-button>
      <div class="reason" v-bind:class="{'hide':hideReasons}">
        <p>{{reason}} <span><i></i></span></p>
        <div class="reasonlist" v-bind:class="{'hide':hideReasonLists}">
          <div v-for="r in reasonList" @click="audit('unauth',r)">{{r}}</div>
        </div>
      </div>
    </div>
    <div class="mytab">
      <div class="tabchangeinfo" v-bind:class="{'showreason':!hideReasonLists}">
        <mt-navbar class="page-part" :selected.sync="selected" :fixed="true">
          <mt-tab-item id="0">基本信息</mt-tab-item>
          <mt-tab-item id="1">附加信息</mt-tab-item>
          <mt-tab-item id="2">地推信息</mt-tab-item>
        </mt-navbar>
        <mt-tab-container :active.sync="selected">

          <mt-tab-container-item id="0">
            <seller-basic :seller-id="sellerId" :show-edit="false"></seller-basic>
          </mt-tab-container-item>

          <mt-tab-container-item id="1">
            <seller-ext :seller-id="sellerId"></seller-ext>
          </mt-tab-container-item>

          <mt-tab-container-item id="2">
            <seller-ditui :seller-id="sellerId"></seller-ditui>
          </mt-tab-container-item>

        </mt-tab-container>
      </div>
    </div>
  </div>
  </mt-popup>

</template>

<script>
  import { MessageBox } from 'mint-ui/lib/';
  import SellerBasic from './SellerBasic.vue';
  import SellerExt from './SellerExt.vue';
  import SellerDitui from './SellerDitui.vue';
  export default{
      components: {MessageBox,SellerBasic,SellerExt,SellerDitui},
      props: {
          type: 0//请求参数类型，0没审核1已审核
      },
      data(){
          return {
            sellerId: this.$route.params.sellerId,
            sales: false,
            hideReasons: true,
            hideReasonLists: true,
            reason:'',
            reasonList: ["姓名、身份证号、微信号无效","身份证照片不清晰","店铺不存在","客服电话为无效","店铺营业时间、起送、配送费无效","银行卡信息无效"],
            selected: '0',
            sellerInfo: [],
            materialPic: []
          }
      },
      ready(){
      },
      methods: {
        popupClose(){
          window.history.back();
        },
        showUnauth(){
          this.hideReasons=this.hideReasons?false:true;
          this.hideReasonLists=false;
        },
        audit(a,desc){
          if(desc&&desc!=""){
            this.reason = desc;
          }
          this.$http.post("/seller/seller-auth",{
            "id": this.sellerId,
            "sales": this.sales,
            "sellerStatus": a,
            "desc":this.reason
          }).then(function (response) {
            //console.log(response.body);
            if(response.body.success){
              if(a === "unauth"){
                MessageBox('温馨提示', "操作成功！");
              }else{
                MessageBox('温馨提示', "审核通过！");
              }
            }else{
              MessageBox('温馨提示', response.body.message);
            }
          });
          this.hideReasons = true;
          this.hideReasonLists = true;
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


  .shopinfo {
    width: 100%;
    min-height: 100vh;
    background:#fff;
  }
  .buttons {
    width:90%;
    margin: 0 auto;
    padding:0 5% .8em 5%;
    border-bottom: 1px solid #bbb;
  }
  .buttons .mint-button {
    width: 46%;
    margin-top: .8em;
    font-size: 80%;
    height: 3em;
    line-height: 3em;
    font-family: "Microsoft Yahei";
  }
  .buttons .mint-button--primary {
    background: #fedc23;
    color: #333;
    margin-right: 4%;
  }
  .mtswitch .mint-switch-core:checked {
    background: #fedc23;
    border-color: #fedc23;
  }
  .mtswitch {
    padding: 0.4em 5%;
    background: #f8f8f8;
    margin-top: 40px;
  }
  .mtswitch .mint-switch-label {
    font-size: 80%;
  }
  .buttons select {
    width: 100%;
    font-size: 85%;
    font-family: "Microsoft Yahei";
    height: 3em;
    line-height: 3em;
    margin-top: .8em;
  }
  .buttons select.hide {
    display: none;
  }
  .shopinfo .mytab {
    height: 75vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-top: 0;
  }
  .reason {
    width: 98%;
    height: 2.8em;
    line-height: 2.8em;
    margin-top: .8em;
    border: 1px solid #bbb;
    font-size: 80%;
    position: relative;
  }
  .reason p {
    position: relative;
    width: 96%;
    height: 2.8em;
    line-height: 2.8em;
    padding-left: .8em;
  }
  .reason >p >span{
    width: 12px;
    height: 6px;
    overflow: hidden;
    position: absolute;
    right: 6px;
    top: 50%;
    margin-top: -3px;
  }
  .reason >p >span i{
    position: absolute;
    left: 2px;
    top: -3px;
    width: 8px;
    height: 8px;
    background: #333;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
  }
  .reasonlist {
    position: absolute;
    width: 100%;
    border: 1px solid #e5e5e5;
    left: -1px;
    top: 2.8em;
    z-index: 2;
    background: #fff;
  }
  .reasonlist >div {
    padding-left: .8em;
    border-bottom: 1px solid #e5e5e5;
  }
  .reason.hide, .reasonlist.hide {
    display: none;
  }
  .tabchangeinfo {
    padding-top: 3em;
    background: #f8f8f8;
  }
  .tabchangeinfo .mint-navbar.is-fixed {
    top: 9.2em;
    box-shadow: 0 0 1px #ccc;
  }
  .tabchangeinfo .mint-navbar .mint-tab-item.is-selected {
    color: #fedc23;
    border-color: #fedc23;
  }
  .tabchangeinfo.showreason {
    padding-top: 5em;
  }
  .tabchangeinfo.showreason .mint-navbar.is-fixed{
    top: 11.4em;
  }
</style>
