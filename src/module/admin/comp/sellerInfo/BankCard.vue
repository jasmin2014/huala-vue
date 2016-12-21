<template>
  <div class="bankCardModule">
    <p style="display:none;">{{s}}</p>
    <div v-for="p in personInfos">
    <section class="personInfo">
      <h2 class="title">店长信息
        <button class="resetpassword">重置密码</button>
        <button class="changeaccount" @click="showEditAccount=showEditAccount?false:true">更换账号</button>
      </h2>
      <div class="info">
        <p><span>管理员：</span>{{p.personInfo.loginId}}</p>
        <p class="account">
          <span>登录账号：</span>{{p.personInfo.mobile}}
          <input type="text" name="account" class="change_a" v-model="p.personInfo.mobile" v-bind:class="{'show':showEditAccount}" />
        </p>
        <div class="changebtns" v-bind:class="{'show':showEditAccount}">
          <button class="save">保存</button>
          <button @click="showEditAccount=false;">取消</button>
        </div>
      </div>
    </section>
    <section class="billInfo">
      <h2 class="title">银行卡信息<button class="editbankinfo" @click="showEditBank=showEditBank?false:true">修改银行卡信息</button></h2>
      <div class="info" v-bind:class="{'show':showEditBank}">
        <p>
          <span>持卡人姓名：</span>{{p.billInfo.acctName}}
          <input type="text" name="acctName" v-model="p.billInfo.acctName" />
        </p>
        <p>
          <span>银行卡类型：</span>{{p.billInfo.cityCode}}
          <input type="text" name="cityCode" v-model="p.billInfo.cityCode" />
        </p>
        <p>
          <span>银行卡账号：</span>{{p.billInfo.acctNo}}
          <input type="text" name="acctNo" v-model="p.billInfo.acctNo"/>
        </p>
        <p>
          <span>开户行支行：</span>{{p.billInfo.brabankName}}
          <input type="text" name="brabankName" v-model="p.billInfo.brabankName" />
        </p>
        <p class="last">
          <span>持卡人手机号：</span>{{p.personInfo.mobile}}
          <input type="text" name="mobile" v-model="p.personInfo.mobile" />
        </p>
        <div class="changebtns" v-bind:class="{'show':showEditBank}">
          <button class="save">保存</button>
          <button @click="showEditBank=false">取消</button>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script>

  export default{
      components: {},
      props: ["sellerId"],
      data(){
          return {
            sid:'',
            personInfos: [],
            showEditAccount: false,
            showEditBank: false
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
          this.getbankInfo();
        }
      },
      methods: {
        getbankInfo(){
          let self = this;
          this.$http.get('/seller/xyl-user-list?id='+self.sellerId).then(function (res) {
            console.log("res:");
            console.log(res.body);
            var result = res.body;
            if(result.rows.length>0){
              result.rows.forEach(function (r) {
                self.personInfos.push(r);
              })
            };
            console.log("personInfo:");
            console.log(self.personInfos.length);
          })
        }
      }
  }
</script>
<style>
  .bankCardModule {
    padding-top: 40px;
    display: none;
  }
  .bankCardModule button {
    font-family: "Microsoft Yahei";
  }
  .bankCardModule .title, .bankCardModule .personEdit {
    padding: 0 .8em;
  }
  .bankCardModule .title{
    font-size: 90%;
    line-height: 2.6em;
    border-bottom: 1px solid #ccc;
    position: relative;
  }
  .bankCardModule .info {
    border-bottom: 1px solid #e5e5e5;
    padding: .3em .8em;
  }
  .bankCardModule .info >p {
    height: 2.6em;
    line-height:2em;
    font-size: 80%;
  }
  .bankCardModule .info span {
    color: #666;
  }
  .bankCardModule .title button {
    font-size: 80%;
    width: 80px;
    height:2.4em;
    line-height: 2.4em;
    text-align: center;
    border: none;
    margin-top: .3em;
    position: absolute;
    top:0;
    color: #fff;
  }
  .bankCardModule .title button.changeaccount,.bankCardModule .title button.editbankinfo {
    right:.8em;
    background: #d15b47;
  }
  .bankCardModule .title button.resetpassword {
    right: 95px;
    background: #629b58;
  }
  .bankCardModule .title button.editbankinfo {
    width: 100px;
  }
  .bankCardModule .account {
    position: relative;
  }
  .bankCardModule .change_a{
    position: absolute;
    left: 4.6em;
    top: 0;
    height: 2em;
    width: 80%;
    display: none;
  }

  .bankCardModule .changebtns {
    width: 100%;
    height: 3em;
    text-align: right;
    display: none;
  }
  .bankCardModule .changebtns button {
    width: 80px;
    height: 2.4em;
    line-height: 2.4em;
    text-align: center;
    border: 1px solid #ccc;
    background: #fff;
    margin-top: .5em;
  }
  .bankCardModule .changebtns button.save {
    background: #fedc23;
    border-color: #fedc23;
  }
  .bankCardModule .billInfo .info >p {
    position: relative;
  }
  .bankCardModule .billInfo .info input {
    position: absolute;
    left: 5.4em;
    top: 0;
    width: 77%;
    height: 2em;
    line-height: 2em;
    display: none;
  }
  .bankCardModule .billInfo .info >p.last input {
    width: 72%;
    left: 6.4em;
  }
  .bankCardModule .change_a.show,.bankCardModule .changebtns.show,.bankCardModule .billInfo .info.show input,.bankCardModule .change_a.show {
    display: block;
  }
</style>
