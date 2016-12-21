<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="sellerlist container ocon">
    <mt-header fixed title="订单列表">
      <mt-button icon="back" slot="left" @click="popupClose()"></mt-button>
    </mt-header>
    <div class="aChecked" @click="hideCity=hideCity?false:true">{{selectCity}}<span><i></i></span></div>
    <ul class="addressmenu" v-bind:class="{ 'hide': hideCity }">
      <li v-for="c in cityList"><span @click="chooseCity(c)">{{c.name}}</span></li>
    </ul>
    <div class="osearch clear">
      <div class="osearchlist">
        <p @click="showsearchitem=showsearchitem?false:true;">{{searchdefalut}}<span><i></i></span></p>
        <div class="olistitems" v-bind:class="{'show':showsearchitem}">
          <p v-for="s in searchitems" @click="changeitem(s)">{{s.value}}</p>
        </div>
      </div>
      <div class="osearchinput">
        <input type="search" v-model="searchKey">
        <div class="osearchbutton" @click="searchlists()">搜索</div>
      </div>
    </div>
    <div class="orderList">
      <mt-loadmore :bottom-method="getOrderList" :bottom-all-loaded="allLoaded" :auto-fill='false'>
        <section class="oitem" v-for="o in orderList">
          <h3>
            <span class="ordersn">订单编号：{{o.orderSn}}</span>
            <span class="greenbg ocomplete">{{o.orderStatusStr}}</span>
            <span class="redbg opaytype">{{o.payType}}</span>
          </h3>
          <div class="oinfo">
            <p class="clear">
              <label>店铺名称：</label>
              <span class="ovalue osname">{{o.sellerName}}<span class="bluebg">{{o.shippingTypeStr}}</span>
            <span class="yellowbg">{{o.orderTypeStr}}</span></span>
            </p>
            <p class="clear">
              <label>收货人：</label>
              <span class="ovalue">{{o.consignee}}: {{o.mobile}}</span>
            </p>
            <p class="clear">
              <label>收货人地址：</label>
              <span class="ovalue">{{o.address}}</span>
            </p>
            <p class="clear paytext">
              <label>
                <span class="yellow">商品</span> /
                <span class="blue">优惠</span> /
                <span class="green">支付</span> /
                <span>运费</span>：
              </label>
              <span class="ovalue">
              <span class="yellow">{{o.goodAmount/100}}</span> /
              <span class="blue">{{o.discountAmount/100}}</span> /
              <span class="green">{{o.payAmount/100}}</span> /
              <span>{{o.shippingAmount/100}}</span>元
            </span>
            </p>
            <p class="clear cdate">
              <label>完成时间：{{o.bestTime}}</label>
              <span class="ovalue"><a href="javascript:void(0)" @click="getOrderInfo(o)">详情</a></span>
            </p>
          </div>
        </section>
      </mt-loadmore>
    </div>
    <mt-popup :visible.sync="showpoup" position="right" class="mint-popup-3">
      <mt-header fixed title="订单详情">
        <mt-button icon="back" slot="left" @click="showpoup=false"></mt-button>
      </mt-header>
      <div class="container orderInfo">
        <div class="mytab otab">

          <div class="oinfoTab" v-bind:class="{'showreason':!hideReasonLists}">
            <mt-navbar class="page-part" :selected.sync="selected" :fixed="true">
              <mt-tab-item id="0">基本信息</mt-tab-item>
              <mt-tab-item id="1">订单日志</mt-tab-item>
              <mt-tab-item id="2">店铺信息</mt-tab-item>
            </mt-navbar>
            <mt-tab-container :active.sync="selected">

              <mt-tab-container-item id="0">
                <order-basic :o-info="oInfo" :order-id="orderId"></order-basic>
              </mt-tab-container-item>

              <mt-tab-container-item id="1">
                <log-list :order-id="orderId"></log-list>
              </mt-tab-container-item>

              <mt-tab-container-item id="2">
                <order-seller :o-info="oInfo" :seller-id="sellerId"></order-seller>
              </mt-tab-container-item>

            </mt-tab-container>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui/lib/';
  import OrderBasic from './order/OrderBasic.vue';
  import LogList from './order/LogList.vue';
  import OrderSeller from './order/OrderSeller.vue';
  export default{
    components: {MessageBox, OrderBasic, LogList, OrderSeller},
    data(){
      return {
        page: 1,
        keyword: '',
        orderList: [],
        allLoaded: false,
        hideCity: true,
        cityList: [{city: "330100", name: '杭州'}, {city: "500100", name: '重庆'}, {city: "130100", name: '石家庄'}],
        selectCity: '杭州',
        showsearchitem: false,
        searchitems: [{"type": "all", "value": "全部条件"}, {"type": "sellerId", "value": "店铺ID"}, {
          "type": "sellerName",
          "value": "店铺名称"
        }, {"type": "orderSn", "value": "订单编号"}, {"type": "consignee", "value": "收货人名称"}, {
          "type": "mobile",
          "value": "收货人手机号"
        }],
        searchdefalut: '全部条件',
        searchKey: '',
        keyType: 'all',
        showpoup: false,
        oInfo: {},
        selected: '0',
        logList: [],
        sellerId: '',
        orderId: ''
      }
    },
    ready(){
      let city = window.localStorage.getItem('city');
      if (city) {
        this.cityList.forEach(i => {
          if (city == i.city) {
            this.selectCity = i.name;
          }
        });
      }
      ;
      this.getOrderList();
    },
    methods: {
      init(){
        this.page = 1;
        this.orderList = [];
        this.allLoaded = false;
      },
      changeitem(s){
        this.keyType = s.type;
        this.searchdefalut = s.value;
        this.showsearchitem = false;
      },
      popupClose(){
        window.history.back();
      },
      chooseCity(city){
        this.selectCity = city.name;
        window.localStorage.setItem('city', city.city);
        this.hideCity = true;
      },
      searchlists(){
        this.init();
        this.getOrderList();
      },
      getOrderList(id){
        let self = this;
        if (self.allLoaded)return;
        this.$http.get("/order/order-list?page=" + self.page + "&size=10&keyType=" + self.keyType + "&orderType=0&orderStatus=all&searchKey=" + self.searchKey + "&startTime=&endTime=")
          .then(function (i) {
            var j = i.body;
            if (j.success) {
              self.page += 1;
              if (j.rows.length <= 0)self.allLoaded = true;
              j.rows.forEach(function (res) {
                self.orderList.push(res);
              });
              this.totalpage = j.total - 1;
            } else {
              alert(j.message);
            };
            this.$broadcast('onBottomLoaded', id);
          })
      },
      getOrderInfo(o){
        this.oInfo = o;
        this.sellerId = o.sellerId;
        this.orderId = o.id;
        console.log(this.orderId);
        console.log(this.sellerId);
        this.showpoup = true;
      }
    }
  }
</script>
<style>
  .sellerlist.ocon {
    background: none;
  }
  .osearch {
    margin-top: 50px;
  }
  .osearchlist {
    font-size: 80%;
    width: 28%;
    height: 2.6em;
    background: #fedc23;
    float: left;
    position: relative;
  }
  .osearchlist > p {
    height: 2.6em;
    line-height: 2.6em;
    position: relative;
    padding-left: .3em;
  }
  .osearchinput {
    position: relative;
    width: 72%;
    float: left;
    height: 2.6em;
    font-size: 80%;
    background: #fff;
  }
  .osearchinput input {
    border: none;
    width: 80%;
    height: 100%;
    padding-left: .6em;
    font-family: "Microsoft Yahei";
  }
  .osearchbutton {
    position: absolute;
    right: 0;
    top: 0;
    height: 2.6em;
    line-height: 2.6em;
    width: 40px;
    text-align: center;
  }
  .olistitems {
    background: #fff;
    position: absolute;
    left: 0;
    z-index: 2;
    border: 1px solid #fedc23;
    display: none;
  }
  .olistitems.show {
    display: block;
  }
  .olistitems > p {
    height: 2.4em;
    line-height: 2.4em;
    padding-left: .4em;
    border-bottom: 1px solid #fedc23;
    font-size: 80%;
  }
  .olistitems > p:last-child {
    border-bottom: none;
  }
  .oitem {
    padding: .8px 0;
    background: #fff;
    margin-top: .4em;
  }
  .oitem h3 {
    font-size: 90%;
    font-weight: normal;
    border-bottom: 1px solid #fedc23;
    padding: .6em 1em 0 1em;
    position: relative;
  }
  .oitem h3 .ordersn {
    line-height: 2.4em;
  }
  .oitem h3 .ocomplete, .oitem h3 .opaytype {
    position: absolute;
    top: 1.5em;
    font-size: 80%;
    color: #fff;
  }
  .oitem h3 .ocomplete {
    right: 2.8em;
  }
  .oitem h3 .opaytype {
    right: 1em;
  }
  .ostatus {
    position: absolute;
    right: 1em;
    top: .6em;
    font-size: 80%;
  }
  .oinfo > p {
    font-size: 80%;
  }
  .oinfo > p:last-child, .oinfo > p.paytext {
    border-bottom: none;
  }
  .oinfo .ovalue > span {
    font-size: 80%;
  }
  .oinfo .ovalue.osname span {
    margin-left: .4em;
  }
  .oinfo.ogood {
    border-bottom: 1px solid #e5e5e5;
  }
  .oinfo.oinfo02 label {
    color: #888;
  }
  .oinfo.oinfo02 span.ovalue {
    float: left;
  }
  .greenbg {
    background: #5cb85c;
    color: #fff;
  }
  .bluebg {
    background: #5bc0de;
    color: #fff;
  }
  .yellowbg {
    background: #f0ad4e;
    color: #fff;
  }
  .redbg {
    background: #d9534f;
    color: #fff;
  }
  .oinfo {
    font-size: 80%;
  }
  .oinfo p {
    line-height: 2.2em;
    padding: 0 1em;
  }
  .oinfo p label {
    float: left;
  }
  .oinfo .ovalue {
    float: right;
  }
  .yellow {
    color: #f0ad4e;
  }
  .green {
    color: #5cb85c;
  }
  .blue {
    color: #5bc0de;
  }
  .oinfo p.cdate {
    border-top: 1px solid #e5e5e5;
    height: 3em;
    line-height: 3em;
  }
  .oinfo p.cdate label {
    color: #999;
  }
  .oinfo p.cdate .ovalue a {
    display: block;
    width: 60px;
    background: #fedc23;
    height: 2.6em;
    line-height: 2.6em;
    margin-top: .3em;
    text-align: center;
    color: #333;
    font-size: 80%;
  }
  .container.orderInfo {
    margin-top: 40px;
    background: none;
  }
  .orderInfo .mint-navbar.is-fixed {
    top: 40px;
    box-shadow: 0 0 2px #999;
    z-index: 3;
  }
  .orderInfo .mint-navbar .mint-tab-item {
    padding: 12px 0;
  }
  /*.orderInfo .mint-tab-container {
    margin-top: 40px;
  }*/
  .orderInfo .mint-navbar .mint-tab-item.is-selected {
    color: #fedc23;
    border-color: #fedc23;
  }
  .mytab.otab .mint-tab-container {
    height: 85vh;
  }
</style>
