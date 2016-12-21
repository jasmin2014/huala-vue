<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="brm">
    <header-component :page-name="'Brm'" :datetime.sync="filtrateDate" :fixed="Fixed"></header-component>
    <div class="brm-top bg-linear" v-bind:class="{'fixedtop':Fixed}">
      <p>账户余额（元）</p>
      <div class="brm-cash-moneny" v-if="sellerBanace.balance">{{sellerBanace.balance/100 | toFixedPositive}}</div>
      <div class="brm-cash-moneny" v-else>0</div>
      <p>转入中收益（元）</p>
      <p v-if="sellerBanace.income">{{sellerBanace.income/100 | toFixedPositive}}</p>
      <p v-else>0</p>
      <button class="brm-cash-now" @click="goToCashbrm()">马上提现</button>
    </div>
    <div class="brm-list" v-if="!isBlank">
      <div v-if="!getListByDate">
        <mt-loadmore :top-method="refreshData" :top-status.sync="topStatus" :bottom-method="getInComeList" :bottom-all-loaded="allLoaded" :auto-fill='false'>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><img src="../assets/loading.gif" /></span>
            <span v-show="topStatus === 'loading'"><img src="../assets/loading.gif" /></span>
          </div>
          <section class="brm-item" v-for="b in inComeList">
            <div class="brm-title clear">
              <p class="brm-date">{{b.dateTime}}</p><!--{{b.dateTime}}-->
              <p class="brm-money">收入：{{b.totalAmount | toFixed}}</p>
            </div>
            <div class="brm-item-list brm-btm" v-for="m in b.rows"  v-bind:class="{'brm-pad':m.type!='auto_income'}">
              <p class="brm-alipay aliico" v-if="(m.type==='auto_income'||m.type==='hand_income')&&m.payType==='ali'">支付宝付款</p>
              <p class="brm-item-tit" v-if="(m.type==='auto_income'||m.type==='hand_income')&&m.payType==='ali'">支付宝付款<span v-if="m.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay wechatico" v-if="(m.type==='auto_income'||m.type==='hand_income')&&m.payType==='wx'">微信付款</p>
              <p class="brm-item-tit" v-if="(m.type==='auto_income'||m.type==='hand_income')&&m.payType==='wx'">微信付款<span v-if="m.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay hand_incomeico" v-if="m.type==='hand_income'">手动付款</p>
              <p class="brm-item-tit" v-if="m.type==='hand_income'">手动<span v-if="m.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay rewardico" v-if="m.type==='reward'">奖励</p>
              <p class="brm-item-tit" v-if="m.type==='reward'">奖励<span v-if="m.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay offsetico" v-if="m.type==='offset'">冲账</p>
              <p class="brm-item-tit" v-if="m.type==='offset'">冲账<span v-if="m.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay punishico" v-if="m.type==='punish'">惩罚</p>
              <p class="brm-item-tit" v-if="m.type==='punish'">惩罚<span v-if="m.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-item-small brm-grey" v-if="m.type==='auto_income'">{{m.orderSn}}</p>
              <time class="brm-item-small brm-grey">{{m.dateTime | toTime}}</time>
              <p class="brm-item-price">{{m.amount/100 | toFixed}}</p>
              <p class="brm-shiftto status-bg-linear" v-if="m.status!='1'">转入中</p>
            </div>
          </section>
        </mt-loadmore>
      </div>
      <div v-else>
        <mt-loadmore :top-method="refreshData" :top-status.sync="topStatus" :bottom-method="getInComeList" :bottom-all-loaded="allLoaded" :auto-fill='false'>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><img src="../assets/loading.gif" /></span>
            <span v-show="topStatus === 'loading'"><img src="../assets/loading.gif" /></span>
          </div>
          <section class="brm-item">
            <div class="brm-title clear">
              <p class="brm-date">{{filtrateDate}}</p>
              <p class="brm-money">收入：{{dtotalamount | toFixed}}</p>
            </div>
            <div class="brm-item-list brm-btm" v-for="b in inComeListBydate" v-bind:class="{'brm-pad':b.type!='auto_income'}">
              <p class="brm-alipay aliico" v-if="(b.type==='auto_income'||b.type==='hand_income')&&b.payType==='ali'">支付宝付款</p>
              <p class="brm-item-tit" v-if="(b.type==='auto_income'||b.type==='hand_income')&&b.payType==='ali'">支付宝付款<span v-if="b.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay wechatico" v-if="(b.type==='auto_income'||b.type==='hand_income')&&b.payType==='wx'">微信付款</p>
              <p class="brm-item-tit" v-if="(b.type==='auto_income'||b.type==='hand_income')&&b.payType==='wx'">微信付款<span v-if="b.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay hand_incomeico" v-if="b.type==='hand_income'">手动付款</p>
              <p class="brm-item-tit" v-if="b.type==='hand_income'">手动付款<span v-if="b.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay rewardico" v-if="b.type==='reward'">奖励</p>
              <p class="brm-item-tit" v-if="b.type==='reward'">奖励<span v-if="b.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay offsetico" v-if="b.type==='offset'">冲账</p>
              <p class="brm-item-tit" v-if="b.type==='offset'">冲账<span v-if="b.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-alipay punishico" v-if="b.type==='punish'">惩罚</p>
              <p class="brm-item-tit" v-if="b.type==='punish'">惩罚<span v-if="b.isFirst==='1'" class="brm-isFirst">首单</span></p>
              <p class="brm-item-small brm-grey" v-if="b.type==='auto_income'">{{b.orderSn}}</p>
              <time class="brm-item-small brm-grey">{{b.dateTime | toTime}}</time>
              <p class="brm-item-price">{{b.amount/100 | toFixed}}</p>
              <p class="brm-shiftto status-bg-linear" v-if="b.status!='1'">转入中</p>
            </div>
          </section>
        </mt-loadmore>
      </div>
    </div>
    <div class="brm-list" v-if="isBlank">
      <section class="item_blank">
        <p class="blankico"><img src="../assets/blank_ico.png" /></p>
        <p>暂无数据</p>
      </section>
    </div>
  </div>
</template>

<script>
  import HeaderComponent from '../comp/HeaderComponent.vue';
  export default{
    components: {HeaderComponent},
    data(){
      return {
        sellerId: sessionStorage.getItem("sellerId"),
        //sellerId: '562',
        topStatus:"drop",
        refresh: false,
        page: 1,
        allLoaded: false,
        inComeList:[],
        inComeListBydate: [],
        getListByDate: false,
        map:new Map(),
        isBlank:false,
        filtrateDate:'',
        currentDate: '',
        dtotalamount: 0,
        sellerBanace: [],
        Fixed:true,
        dateChange: false
      }
    },
    ready(){
      var self = this;
      self.getInComeList();
      self.getFoundManage();
    },
    watch:{
      'filtrateDate':function () {
        this.dateChange = true;
        this.page = 1;
        this.inComeListBydate = [];
        this.getInComeList();
      }
    },
    filters: {
      toTime: function(value) {
        let _date = new Date(value);
        let hour = _date.getHours()<10?("0"+_date.getHours()):_date.getHours();
        let minute = _date.getMinutes()<10?("0"+_date.getMinutes()):_date.getMinutes();
        let second = _date.getSeconds()<10?("0"+_date.getSeconds()):_date.getSeconds();
        return hour + ":" + minute + ":" + second;
      }
    },
    methods: {
      init(){
        this.page = 1;
        this.allLoaded = false;
        this.map.clear();
        this.inComeListBydate = [];
      },
      getFoundManage(){
        var self = this;
        this.$http.get("/shopkeeper/seller/found-manage?sellerId="+self.sellerId).then(function (res) {
          if(res.body.success){
            self.sellerBanace = res.body.body;
            if(self.sellerBanace.balance == 0){
              self.isBlank = true;
            }else{
              self.isBlank = false;
            }
          }

        })
      },
      goToCashbrm(){
        this.$router.go({ path: '/brmcash'});
      },
      toDate(strTime) {
        let date = new Date(strTime);
        let fullYear = date.getFullYear();
        let month = (date.getMonth()+1<10)?("0"+(date.getMonth()+1)):(date.getMonth()+1);
        let day = (date.getDate()<10)?("0"+date.getDate()):(date.getDate());
        return fullYear+"-"+month+"-"+day;
      },
      createNewList(list){
        var self = this;
        if(list.rows.length<=0)return;
        list.rows.forEach(function(res){
          let keyName=self.toDate(res.dateTime);
          let amountList=self.map.get(keyName)?self.map.get(keyName):new Array();
          amountList.push(res);
          self.map.set(keyName,amountList);
        });
        self.inComeList = [];
        self.map.forEach(function(res,r){
          self.inComeList.push({dateTime:r,rows:res});
        });
        /*计算每个日期那天的总收入*/
        let totalAmount = 0;
        self.inComeList.forEach(function(res){
          totalAmount = 0;
          res.rows.forEach(function(r){
            totalAmount += r.amount/100;
          });
          res.totalAmount = totalAmount;
        })
      },
      getInComeList(id){
        var self = this;
        if (self.allLoaded)return;
        if(self.refresh){
          if(self.dateChange) self.page = 1;
          else self.page = 2;
        }
        this.$http.get("/shopkeeper/seller/income?sellerId="+self.sellerId+"&type=detail&date="+self.filtrateDate+"&page="+self.page+"&size=15").then(function (data) {
          var res = data.body;
          if(res.success){
            self.page += 1 ;
            if (res.length <= 0){ //数据为空时
              self.allLoaded = true;
            }else{
              //数据不为空时
              if(self.filtrateDate===''){ //没有筛选日期时
                self.getListByDate = false;
                self.createNewList(res);
              }else{ //有筛选日期时
                if(self.inComeListBydate.length<=0) {
                  self.isBlank = true;
                  self.dtotalamount = 0;
                }
                self.isBlank = false;
                self.getListByDate = true;
                res.rows.forEach(function(r){
                  self.inComeListBydate.push(r);
                });
                //计算筛选日期这天的总收入
                let _totalamount = 0;
                self.inComeListBydate.forEach(function(r){
                  _totalamount += r.amount/100;
                });
                self.dtotalamount = _totalamount;

              }
            }
            self.refresh = false;
            self.dateChange = false;
          }
          this.$broadcast('onBottomLoaded', id);
        })
      },
      refreshData(id){
        var self = this;
        self.init();
        if (self.allLoaded)return;
        this.$http.get("/shopkeeper/seller/income?sellerId="+self.sellerId+"&type=detail&date="+self.filtrateDate+"&page="+self.page+"&size=15").then(function (data) {
          var res = data.body;
          if(res.success){
            if (res.length <= 0){ //数据为空时
              //self.isBlank = true;
              self.allLoaded = true;
            }else{
              //数据不为空时
              if(self.filtrateDate===''){ //没有筛选日期时
                self.getListByDate = false;
                self.createNewList(res);
              }else{ //有筛选日期时
                if(self.inComeListBydate.length<=0) {
                  self.isBlank = true;
                  self.dtotalamount = 0;
                }
                self.isBlank = false;
                self.getListByDate = true;
                res.rows.forEach(function(r){
                  self.inComeListBydate.push(r);
                });
                /*计算筛选日期这天的总收入*/
                let _totalamount = 0;
                self.inComeListBydate.forEach(function(r){
                  _totalamount += r.amount/100;
                });
                self.dtotalamount = _totalamount;

              }
            }
          }
          this.$broadcast('onTopLoaded', id);
        });
        self.refresh = true;
        self.getFoundManage();
      }
    }
  }
</script>
<style>
  .brm{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .brm-top {
    color: #fff;
    padding: .8em 1em 1.5em 1em;
    position: relative;
  }
  .brm-top.fixedtop {
    margin-top: 50px;;
  }
  .brm-top >p {
    line-height:2em;
  }
  .brm-cash-moneny {
    font-size: 300%;
  }
  .brm-cash-now {
    background: #fff;
    color: #ff4c47;
    border:none;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    border-radius:3px;
    padding: .2em .6em;
    font-size: 110%;
    position: absolute;
    right: 1em;
    bottom: 1.5em;
    -webkit-box-shadow: 2px 2px 6px #f02b2b;
    -moz-box-shadow: 2px 2px 6px #f02b2b;
    box-shadow: 2px 2px 6px #f02b2b;
  }
  .brm-title {
    height: 3em;
    line-height: 3em;
    padding: 0 1em;
  }
  .brm-date {
    float: left;
  }
  .brm-money {
    float: right;
  }
  .brm-item-list{
    background: #fff;
    padding: 1.2em 1em 1.2em 6em;
    position: relative;
  }
  .brm-item-list.brm-pad{
    padding: 2em 1em 2em 6em;
  }
  .brm-btm {
    border-bottom: 1px solid #e5e5e5;
  }
  .brm-alipay {
    position: absolute;
    left: 1em;
    top:50%;
    width: 4em;
    height: 4em;
    margin-top:-2em;
    text-indent: -9999em;
    overflow: hidden;
  }
  .brm-alipay.aliico {
    background: url("../assets/alipay.png") no-repeat center center;
    background-size: 100%;
  }
  .brm-alipay.wechatico {
    background: url("../assets/wechat.png") no-repeat center center;
    background-size: 100%;
  }
  .brm-alipay.hand_incomeico {
    background: url("../assets/elseico.png") no-repeat center center;
    background-size: 100%;
  }
  .brm-alipay.rewardico {
    background: url("../assets/awardico.png") no-repeat center center;
    background-size: 100%;
  }
  .brm-alipay.offsetico {
    background: url("../assets/offsetico.png") no-repeat center center;
    background-size: 100%;
  }
  .brm-alipay.punishico {
    background: url("../assets/punishmentico.png") no-repeat center center;
    background-size: 100%;
  }
  .brm-alipay img {
    width: 100%;
  }
  .brm-item-tit {
    font-size: 100%;
  }
  .brm-item-tit .brm-isFirst {
    background: #ff4949;
    color: #fff;
    width: 3.2em;
    height: 1.8em;
    line-height: 1.8em;
    text-align: center;
    font-size: 85%;
    border-radius: 5px;
    display: inline-block;
    margin-left: .5em;
  }
  .brm-item-price {
    position: absolute;
    right: 1em;
    top: 50%;
    margin-top: -1em;
    line-height: 2em;
    font-size: 120%;
    color: #ff4949;
    width: 20%;
    text-align: left;
  }
  .item_blank{
    display: block;
    width: 60%;
    margin: 7.5em auto;
  }
  .blankico , .blankico img{
    margin: 0 auto;
  }
  .blankico {
    width: 8em;
  }
  .blankico img {
    width: 100%;
  }
  .item_blank >p {
    text-align: center;
    margin-top: .8em;
  }
  .brm-shiftto {
    width: 30%;
    height: 2em;
    line-height: 2em;
    position: absolute;
    right: 0;
    bottom: .5em;
    font-size: 85%;
    text-align: center;
    color: #fff;
  }
</style>
