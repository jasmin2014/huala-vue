<template>
  <div>
    <div class="l-mask"></div>
    <div class="loginmodule animated scaleIn">
      <div class="l-inner">
        <form name="logForm" method="post">
          <div class="div-phone">
            <input type="text" name="phone" placeholder="手机号码" required="" ng-pattern="/^1[34578]\d{9}$/" />
          </div>
          <div class="code clear div-code">
            <div class="code_input">
              <input type="text" name="code" placeholder="验证码" required="" />
            </div>
            <div class="code_button">
              <button class="send0 sendercode">发送验证码</button>
            </div>
          </div>
          <p class="errortxt redclr">
            <span class="glyphicon glyphicon-exclamation-sign"></span>
          </p>
          <div class="aggrement">
            <a class="terms">
              <span class="txt-clg iconfont terms-icon"></span>
              <span class="showTerms">注册账号就视为已阅读并同意花啦生活用户协议</span>
            </a>
          </div>
          <div class="loginbtn">
            <input type="submit" value="登录" class="logbtn" disabled="disabled" />
          </div>
        </form>
        <div class="hualalogo">
          <img src="http://192.168.25.246:8080/huala_gly/assets/v3/images/hlico.png" />
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

      }
    }
  }
</script>
<style>
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
    top: 10em;
    z-index: 110;
    width: 90%;
    margin: 0;
    padding-bottom: 1.2em;
    background-color: #fff;
    border-radius: 15px;
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
    display: block;
    position: relative;
    padding-left: 1.5em;
    margin-top: 1em;
    height: 2em;
    line-height: 2em;
    font-size: 86%;
  }
  .loginmodule .terms .showTerms{
    position: relative;
    margin-top: 1em;
    line-height: 1em;
    font-size: 86%;
  }

  .terms-icon {
    position: absolute;
    left: -.1em;
    top: 50%;
    font-size: 160%;
    color: #7ed321;
    margin-top: -1em;
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
    line-height: 2em;
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
