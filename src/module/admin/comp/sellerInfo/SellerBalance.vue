<template>
  <div class="sellerBalanceModule">
    <p style="display:none;">{{s}}</p>
    <div class="balanceamount clear">
      <div class="total">9999.99<br/>收入金额</div>
      <div class="balance">88.88<br/>余额</div>
      <div class="shiftto">666.66<br/>转入中</div>
      <div class="withdraw">3333.33<br/>已提现</div>
    </div>
    <div class="balancelog">
      <h2>结算记录</h2>
      <div class="blogitems">
        <mt-loadmore :bottom-method="getBalanceList" :bottom-all-loaded="allLoaded" :auto-fill='false'>
        <section class="blogitem" v-for="b in balanceList">
          <p><span>结算时间：</span>{{b.addTime}}</p>
          <p><span>结算类型：</span>{{b.type | balanceType }} <span v-bind:class="{'green': b.payResponseStatus=='1','red': b.payResponseStatus=='0','else': b.payResponseStatus=='2'}">{{b.payResponseStatus | payStatus}}</span></p>
          <p><span>结算金额：</span>{{b.amount/100}}元</p>
          <p><span>发送时间：</span>{{b.financeBatchNoTime}}</p>
        </section>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
      components: {},
      props: ["sellerId"],
      data(){
          return {
            page: 1,
            balanceList:[],
            balanceAmount:[],
            allLoaded: false,
            keyword: '',
            sid:''
          }
      },
      computed:{
        s: function () {
          this.sid=this.sellerId;
          return this.sellerId;
        }
      },
      watch:{
        'sid':function () {
          this.getBalanceList();
          this.getBalanceAmount();
        }
      },
      filters: {
        balanceType: function (value) {
          switch(value)
          {
            case 'auto_income':
              return '自动结算';
              break;
            case 'hand_income':
              return '手工结算';
              break;
            case 'offset':
              return '冲账';
              break;
            case 'withdraw':
              return '提现';
              break;
            case 'punish':
              return '惩罚';
              break;
            default:
              return '其它';
              break;
          }
        },
        payStatus: function(value){
          switch (value){
            case '1':
              return '已发送';
              break;
            case '0':
              return '未发送';
              break;
            default:
              return '失败';
              break;
          }
        }
      },
      methods: {
        //获取店铺列表信息
        getBalanceList(){
          console.log("gaweohaghp;wha[og");
          let self = this;
          if (self.allLoaded)return;
          this.$http.get("/seller/seller-balance-list?key="+self.keyword+"&page="+self.page+"&size=10&sellerId="+self.sellerId)
            .then(function (i) {
              var j = i.body;
              console.log(j);
              if (j.success) {
                self.page += 1;
                if (j.rows.length <= 0)self.allLoaded = true;
                j.rows.forEach(function (res) {
                  self.balanceList.push(res);
                })
              } else {
                alert(j.message);
              }
            });
        },
        getBalanceAmount(){
          let self = this;
          this.$http.get("/seller/seller-balance-amount?sellerId="+self.sellerId)
            .then(function (i) {
              self.balanceAmount = i.body;
              //console.log(i.body);
            })
        }
      }
  }
</script>
<style>
  .sellerBalanceModule {
    padding-top: 40px;
    display: none;
  }
  .sellerBalanceModule .balanceamount {
    padding: .6em 2.5%;
  }
  .sellerBalanceModule .balanceamount >div {
    width: 22.5%;
    margin-right: 3%;
    font-size: 80%;
    height: 4.6em;
    float: left;
    text-align: center;
    line-height: 1.4em;
    padding: .9em 0;
    border-radius: 8px;
    color: #fff;
  }
  .sellerBalanceModule .balanceamount >div:last-child {
    margin-right: 0;
  }
  .sellerBalanceModule .balanceamount >div.total {
    background: #629b58!important;
    border-color: #629b58;
  }
  .sellerBalanceModule .balanceamount >div.balance {
    background: #6fb3e0!important;
    border-color: #6fb3e0;
  }
  .sellerBalanceModule .balanceamount >div.shiftto {
    background: #ffb752!important;
    border-color: #ffb752;
  }
  .sellerBalanceModule .balanceamount >div.withdraw {
    background: #d15b47!important;
    border-color: #d15b47;
  }
  .sellerBalanceModule .blogitems {
    height: 74vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .sellerBalanceModule .balancelog >h2 {
    font-size:85%;
    line-height:2em;
    padding-left: .8em;
    border-bottom: 1px solid #bbb;
  }
  .sellerBalanceModule .blogitem {
    font-size: 80%;
    line-height:2.2em;
    padding:0 .8em;
    border-bottom: 1px solid #e5e5e5;
  }
  .sellerBalanceModule .blogitem p span {
    color: #666;
  }
  .sellerBalanceModule .blogitem p span.green{
    color: #629b58;
  }
  .sellerBalanceModule .blogitem p span.red{
    color: #d15b47;
  }
  .sellerBalanceModule .blogitem p span.else{
    color: #999;
  }
</style>
