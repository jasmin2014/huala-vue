<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="detailpic">
    <img :src="imgUrl+movie.url">
  </div>
  <div class="users">
    <div class="clear">
      <mt-field label="姓名" type="text" placeholder="请输入姓名" :value.sync="name"></mt-field>
    </div>
    <div class="clear">
      <mt-field label="手机号码" type="tel" placeholder="请输入手机号" :value.sync="phone" pattern="^1[34578]\d{9}$"></mt-field>
    </div>
    <div class="clear messagecode">
      <mt-field label="短信验证码" type="text" placeholder="请输入验证码" :value.sync="code">
        <mt-button type="primary" size="small" v-if="timer" class="getmcode nosendercode">{{second}}s后重发</mt-button>
        <mt-button type="primary" size="small" v-if="!timer" class="getmcode" @click="getCode()">获取验证码</mt-button>
      </mt-field>
    </div>
    <div class="illustrate clear">
      <label>投票说明：</label>
      <div>
        <p>1、参与投票，即可在电影开播现场参加抽奖</p>
        <p>2、一人只能投一票；</p>
        <p>3、抽奖在电影开播前进行，记得早点到哦。</p>
      </div>
    </div>
    <mt-button type="primary" size="normal" @click="openalert()" class="gotovote">确认投票</mt-button>
  </div>
</template>
<script>
  import Toast from 'mint-ui/lib/Toast'
  export default{
    props: ['movie'],
    data(){
      return {
        imgUrl: ImgUrl,
        name: '',
        phone: '',
        code: '',
        showerror: false,
        errormsg: '',
        timer: undefined,
        second: 0,
      }
    },
    methods: {
      testphone(){
        let ptn = /^1[34578]\d{9}$/;
        if (this.phone.length > 0) {
          return ptn.test(this.phone);
        } else {
          return "blank";
        }
      },
      getCode(){//发送验证码
        console.log("phone:"+this.phone);
        if (this.testphone() === "blank") {
          this.showerror = true;
          this.errormsg = "*手机号不能为空，请输入"
        } else if (!this.testphone()) {
          this.showerror = true;
          this.errormsg = "*手机号输入错误，请重新输入"
        } else {
          this.showerror = false;
          this.$http.post("/send?type=1&phone=" + this.phone).then(function (data) {
            //console.log(data);
            let vm = this;
            vm.second = 60;
            vm.timer = setInterval(function (d) {
              vm.second--;
              if (vm.second <= 0) {
                clearInterval(vm.timer)
                vm.timer = undefined
              }
            }, 1000)
          })
        }
        if(this.showerror)
        {
          Toast(this.errormsg);
        }
      },
      openalert(){

      },
    },
  }
</script>
<style>
  .detailpic {
    width: 100%;
    margin: 0 auto;
    padding: .8em 0;
    border-bottom: 1px solid #ddd;
  }

  .detailpic img {
    display: block;
    width: auto;
    height: 30%;
    margin: 0 auto;
  }

  .getmcode {
    position: absolute;
    width: 7em;
    right: 0;
    height: 2.6em;
    font-size: 100%;
    border: 1px solid #ff5c01;
    background: #fff;
    font-family: "Microsoft Yahei";
    color: #ff5c01;
    border-radius: .2em;
  }

  .getmcode.nosendercode {
    background: #ccc;
    border: 1px solid #ccc;
    color: #999;
    font-size: 85%;
  }

  .gotovote {
    width: 84%;
    margin: .8em auto;
    display: block;
    height: 3em;
    line-height: 3em;
    background: #ff5c01;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 100%;
    font-family: "Microsoft Yahei";
    text-align: center;
  }

  .illustrate {
    font-size: 85%;
    padding-top: .8em;
    color: #686868;
  }

  .illustrate label {
    padding-left: 8%;
    display: inline-block;
    float: left;
    width: 24%;
  }

  .illustrate > div {
    width: 66%;
    float: left;
  }
</style>
