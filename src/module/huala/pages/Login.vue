<template>
  <div id="loginForm" class="ng-scope">
    <div class="loginmodule animated scaleIn">
      <div class="l-inner">
        <form name="logForm" method="post">
          <div class="div-phone">
            <input type="text" name="phone" placeholder="手机号码" v-model="phone" required="" />
          </div>
          <div class="code clear div-code">
            <div class="code_input">
              <input type="text" name="code" placeholder="验证码" required="" />
            </div>
            <div class="code_button">
              <button class="send0 sendercode" v-bind:class="{send1:sendClass!='发送验证码'}" @click="sendCode()">发送验证码</button>
            </div>
          </div>
          <p class="errortxt redclr"><span class="glyphicon glyphicon-exclamation-sign"></span></p>
          <div class="aggrement">
            <a class="terms" @click="addAggrement()">
              <span class="txt-clg iconfont terms-icon"></span>注册账号就视为已阅读并同意花啦生活用户协议</a>
            <!--<div class="termspop contextcls" ng-show="show">
              <span class="contextclose iconfont" ng-click="close()"></span>
              <div id="aggrement"></div>
            </div>-->
          </div>
          <div class="loginbtn">
            <input type="submit" value="登录" class="logbtn" @click="login()" disabled="disabled" />
          </div>
        </form>
        <div class="hualalogo">
          <img src="../assets/hlico.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default{
      components:{},
        data(){
            return{
              phone:''
            }
        },
      methods:{
        sendCode(){
          var self = this;
          this.$http.post("/send?phone="+self.phone).then(function (res) {
            if(res.success){
              console.log("验证码获取成功！");
            }
          })
        }
      }
    }
</script>
<style>
  /*loginmoudle.css  loginModule.html*/
  .l-mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 109;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .loginmodule {
    position: fixed;
    left: 5%;
    top: 50%;
    z-index: 110;
    width: 90%;
    margin-top: -11em;
    padding-bottom: 1.2em;
    background-color: #fff;
    border-radius: 15px;
    border: 1px solid #e5e5e5;
  }
  .loginmodule .l-inner {
    position: relative;
    padding-top: 5em;
  }
  .div-phone {
    height: 3.5em;
    width: 90%;
    margin: 0 auto;
    border: 1px solid #9b9b9b;
    background: #f5f5f5;
    position: relative;
  }
  .div-phone input {
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -.7em;
    background: #f5f5f5;
  }
  .div-phone input, .div-code input {
    border-radius: 3px;
    padding-left: .5em;
    font-family:"Microsoft Yahei";
  }

  .loginmodule .code {
    width: 90%;
    margin: 1.2em auto 0 auto;
  }

  .div-code input {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -.7em;
    background: #f5f5f5;
  }

  .div-code .sendercode {
    width: 100%;
    height: 3.2em;
    line-height: 3.2em;
    border-radius: 3px;
    text-align: center;
    border: none;
    float: right;
    font-size: 100%;
    font-family:'Microsoft Yahei'
  }

  .code_input {
    width: 64%;
    float: left;
    height: 3.5em;
    border: 1px solid #9b9b9b;
    background: #f5f5f5;
    position: relative;
  }

  .code_button {
    width: 32%;
    float: right;
    font-size: 110%;
    height: 3.2em;
  }

  .loginmodule .send0, .loginmodule .logbtn.greenbg {
    background: #7ed321;
    color: #fff;
  }

  .loginmodule .send1 {
    background: #9b9b9b;
    color: #fff;
  }

  .loginmodule .terms {
    position: relative;
    padding-left: 1.5em;
    margin-top: 12px;
    line-height: 20px;
    font-size: 86%;
  }


  .terms-icon {
    position: absolute;
    left: -.1em;
    top: 50%;
    font-size: 160%;
    color: #7ed321;
    margin-top: -.5em;
  }

  .loginmodule #tersmchecked {
    position: absolute;
    left: 0;
    top: 0;
  }

  .loginmodule #tersmchecked {
    background: none;
    border: none;
  }

  .loginmodule .logbtn {
    width: 100%;
    height: 2.8em;
    line-height: 2.8em;
    text-align: center;
    border-radius: 3em;
    border: none;
    background: #9b9b9b;
    color: #fff;
    margin-top:.8em;
  }

  .hualalogo {
    position: absolute;
    left: 50%;
    top: -4.2em;
    z-index: 101;
    width: 8.4em;
    height: 8.4em;
    margin-left: -4.2em;
    padding: 0.3em;
    background: #fff;
    box-shadow: 0 2px 4px #ccc;
    border-radius: 50%;
  }
  .hualalogo img {width:100%;}
  .aggrement {
    width: 96%;
    margin: .5em auto 0 5%;
    height: 2em;
    line-height: 20px;
  }
  .loginbtn,.errortxt {
    width: 90%;
    margin: 0 auto;
  }
  .errortxt {
    line-height: 2em;
  }
  .loginmodule input:-webkit-autofill, .loginmodule textarea:-webkit-autofill, .loginmodule select:-webkit-autofill {
    background-color:rgb(250,255,189);
  }
</style>
