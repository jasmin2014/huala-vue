<template>
  <div class="brm brmCash">
    <header-component :page-name="'BrmCash'" :fixed="Fixed"></header-component>
    <section class="brmcash-card" v-bind:class="{'fixedtop':Fixed}">
      <div class="brmcash-card-inr bg-linear clear">
        <p class="brmcash-card-ico"><img src="../assets/BOCICO.png" /> </p>
        <div class="brmcash-card-name brm-left">
          <p v-if="bankInfo.bankName">{{bankInfo.bankName}}<br/>储蓄卡</p>
          <P v-if="bankInfo.bankNo" class="brmcash-card-number">{{bankInfo.bankNo}}</p>
        </div>
      </div>
    </section>
    <section class="brmcash-pay">
      <div class="brmcash-pay-balance brm-btm clear">
        <p class="brm-left">可用余额</p>
        <p class="brm-right" v-if="bankInfo.balance">￥{{bankInfo.balance/100 | toFixedPositive}}</p>
        <p class="brm-right" v-else>0.00</p>
      </div>
      <div class="brmcash-cash clear">
        <p class="brm-left brmcash-lbl">提现余额</p>
        <p class="brm-left brmcash-input" v-bind:class="{'errormsg':showError}">
          <input type="number" placeholder="请输入提现金额" v-model="cashAmount" pattern="\^([1-9][0-9]*|0)(\.[0-9]+)?$\">
          <span class="brmcash-close" v-if="!showError" @click="deleteInput()">删除</span>
        </p>

        <p class="brmcash-error" v-if="showError">{{errormsg}}</p>
      </div>
      <div class="brmcash-count">今日还可提现：{{bankInfo.drawNumber}}次</div>
    </section>
    <button class="brmcash-cashNow" v-if="showError" disabled="disabled" v-if="amount==''">提现</button>
    <button class="brmcash-cashNow" v-else @click="postCashData()">提现</button>
  </div>
</template>

<script>
  import HeaderComponent from '../comp/HeaderComponent.vue'
  import MessageBox from 'mint-ui/lib/message-box'
  export default{
    components: {HeaderComponent,MessageBox},
    data(){
      return {
        sellerId: sessionStorage.getItem("sellerId"),
        //sellerId: '562',
        bankInfo: {},
        cashAmount: '',
        balance: 0,
        showError: true,
        errormsg: '请输入提现金额',
        Fixed: true
      }
    },
    ready(){
      this.getCashData();
    },
    watch:{
      "cashAmount":function () {
        var self = this;
        if(self.cashAmount!=""){
          if(parseFloat(self.cashAmount)*100<0){
            self.showError = true;
            self.errormsg = '提现金额不能为负';
          }else if(parseFloat(self.cashAmount)*100==0){
            self.showError = true;
            self.errormsg = '提现金额不能为"0"';
          }else if((parseFloat(self.cashAmount)*100)>self.balance){
            self.showError = true;
            self.errormsg = '提现金额不可超过可用余额';
          }else{
            self.showError = false;
            self.errormsg = '';
          }
        }else{
          self.showError = true;
          self.errormsg = '请输入提现金额';
        }
      }
    },
    methods: {
      getCashData(){
        var self = this;
        this.$http.get("/shopkeeper/seller/draw-page?sellerId="+self.sellerId).then(function (data) {
          if(data.body.success){
            self.bankInfo = data.body.body;
            self.balance = data.body.body.balance;
          }else{
            MessageBox({
              title: '提示',
              message: data.body.message,
              showCancelButton: false
            })
          }
        })
      },
      postCashData(){
        var self = this;
        this.$http.post("/shopkeeper/seller/draw-money",{
          "amount": self.cashAmount*100,
          "sellerId": self.sellerId
        }).then(function (res) {
          if(res.body.success){
            MessageBox({
              title: '提示',
              message: "恭喜你，提现成功！",
              showCancelButton: false
            }).then(action => {
              self.getCashData();
            });
          }else{
            MessageBox({
              title: '提示',
              message: res.body.message,
              showCancelButton: false
            });
          }
        })
      },
      deleteInput(){
        this.cashAmount = '';
        this.showError = true;
        this.errormsg = "请输入提现金额";
      }
    }
  }
</script>
<style>
  .brmCash {
    font-size: 85%;
    background: #fff;
  }
  .brmcash-card {
    padding: 1em;
    background: #f0f0f0;
  }
  .brmcash-card.fixedtop {
    margin-top: 50px;
  }
  .brmcash-card-inr {
    min-height: 100px;
    padding:1.5em 1em .5em 1em;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
  }
  .brmcash-card-ico {
    width: 4em;
    height: 4em;
    float: left;
  }
  .brmcash-card-ico img {
    width: 100%;
  }
  .brmcash-card-name {
    color: #fff;
    margin-left: .6em;
    font-size: 120%;
    margin-top: .2em;
  }
  .brmcash-card-number {
    margin: .5em 0;
    font-size: 130%;
    color: #fff;
  }
  .brmcash-pay {
    background: #fff;
    height: 12em;
  }
  .brmcash-pay-balance {
    height: 3em;
    line-height: 3em;
    padding: 0 1em;
    font-size: 110%;
  }
  .brmcash-cash {
    position: relative;
    margin-top: .8em;
    height: 4.2em;
    padding: 0 1em;
    font-size: 110%;
  }
  .brmcash-error {
    position: absolute;
    right: 2.5em;
    bottom: -.5em;
    color: #ff4949;
    font-size: 85%;
  }
  .brmcash-lbl {
    line-height: 3em;
  }
  .brmcash-input {
    position: relative;
    width: 72%;
    height: 2em;
    margin-left: 4%;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    border: 1px solid #999;
    padding: .3em .5em;
  }
  .brmcash-input.errormsg {
    border: 1px solid #ff4949;
  }
  .brmcash-close {
    position: absolute;
    right: .5em;
    top: 50%;
    margin-top: -.8em;
    text-indent: -999em;
    overflow: hidden;
    width: 1.6em;
    height: 1.6em;
    background: url("../assets/closeico.png") no-repeat center center;
    background-size: 100%;
  }
  .brmcash-input input {
    width: 100%;
    height: 100%;
    border: none;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    font-size: 110%;
  }
  .brmcash-input input::-ms-input-placeholder{text-align: center;}
  .brmcash-input input::-webkit-input-placeholder{text-align: center;}
  .brmcash-count {
    line-height: 3em;
    padding: 0 1em;
  }
  .brmcash-cashNow {
    position: fixed;
    left: 10%;
    bottom: 2em;
    width: 80%;
    height: 3em;
    line-height: 3em;
    text-align: center;
    background: #ff4949;
    color: #fff;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    border: none;
  }
  .brmcash-cashNow:disabled {
    background: #999999;
  }
  .msgbox-confirm, .msgbox-confirm:active {
    color: #ff4949;
    font-size: 120%;
  }
</style>
