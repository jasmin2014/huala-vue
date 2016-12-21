<template>
  <div class="brm brmdetail">
    <header-component :page-name="'BrmDetail'" :fixed="Fixed"></header-component>
    <div class="brmdetail-items" v-bind:class="{'fixedtop':Fixed}">
      <mt-loadmore v-if="!isBlank" :top-method="refreshData" :top-status.sync="topStatus" :bottom-method="getAccountList" :bottom-all-loaded="allLoaded" :auto-fill='allLoaded'>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><img src="../assets/loading.gif" /></span>
          <span v-show="topStatus === 'loading'"><img src="../assets/loading.gif" /></span>
        </div>
        <section class="brmdetail-item clear" v-for="a in accountList">
          <div class="brmdetail-item-date">{{a.dateTime}}</div>
          <div class="brmdetail-line" v-for="r in a.rows">
            <div class="brmdetail-con brm-btm clear">
              <p class="brmdetail-money brm-left">{{r.amount/100 | toFixed}}</p>
              <p class="brmdetail-status brm-right brm-grey">{{r.type_name}}</p>
            </div>
          </div>
        </section>
      </mt-loadmore>
      <div class="brm-list" v-if="isBlank">
        <section class="item_blank">
          <p class="blankico"><img src="../assets/blank_ico.png" /></p>
          <p>此商家暂无电影信息</p>
        </section>
      </div>

    </div>
  </div>
</template>

<script>
  import HeaderComponent from '../comp/HeaderComponent.vue'
  export default{
    components: {HeaderComponent},
    data(){
      return {
        sellerId: sessionStorage.getItem("sellerId"),
        map:new Map(),
        accountList:[],
        allLoaded: false,
        topStatus:"drop",
        page: 1,
        isBlank: false,
        Fixed: true,
        refresh: false
      }
    },
    ready(){
      this.getAccountList();
    },
    methods: {
      init(){
        this.page = 1;
        this.allLoaded = false;
        this.map.clear();
      },
      toDate(strTime) {
        return strTime.substring(0,4) + "-" + strTime.substring(4,6) + "-" + strTime.substring(6,8);
      },
      createNewList(list){
        var self = this;
        if(list.rows.length<=0)return;
        list.rows.forEach(function (res){
          let keyName=self.toDate(res.date);
          let amountList=self.map.get(keyName)?self.map.get(keyName):new Array();
          amountList.push(res);
          self.map.set(keyName,amountList);
        });
        self.accountList = [];
        self.map.forEach(function(res,r){
          self.accountList.push({dateTime:r,rows:res});
        });
      },
      getAccountList(id){
        var self = this;
        if (self.allLoaded)return;
        if(self.refresh){self.page = 2};
        this.$http.get("/shopkeeper/seller/account-list?sellerId="+self.sellerId+"&page="+self.page+"&date=").then(function (res) {
          var re = res.body;
          if(re.success){
            self.page += 1 ;
            if (re.rows.length <= 0){ //数据为空时
              self.isBlank = true;
              self.allLoaded = true;
            }else{ //数据不为空时
              self.isBlank = false;
              self.createNewList(re);
            }
            self.refresh = false;
          }
          this.$broadcast('onBottomLoaded', id);
        })
      },
      refreshData(id){
        var self = this;
        self.init();
        if (self.allLoaded)return;
        this.$http.get("/shopkeeper/seller/account-list?sellerId="+self.sellerId+"&page=1&date=").then(function (res) {
          var re = res.body;
          if(re.success){
            if (re.rows.length <= 0){ //数据为空时
              if(self.accountList.length<=0) {
                self.isBlank = true;
              }
              self.allLoaded = true;
            }else{ //数据不为空时

              self.isBlank = false;
              self.createNewList(re);
            }
          }
          this.$broadcast('onTopLoaded', id);
        });
        self.refresh = true;
      }
    }
  }
</script>
<style>
  .brmdetail-item {
    width: 100%;
    line-height: 3em;
  }
  .brmdetail-items.fixedtop {
    margin-top: 50px;
  }
  .brmdetail-line {
    background: #fff;
    padding: 0 0 0 1em;
  }
  .brmdetail-item-date {
    padding: 0 1em;
    background: #e5e5e5;
  }
  .brmdetail-con {
    padding-right: 1em;
  }


</style>
