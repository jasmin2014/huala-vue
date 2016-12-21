<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="mdetail">
    <div class="detailpic"><img v-lazy="imgUrl+movie.url"></div>
    <div class="users">
      <div class="clear">
        <label>姓名</label>
        <input type="text" v-model="name" placeholder="请输入姓名" required>
      </div>
      <div class="clear">
        <label>手机号码</label>
        <input type="text" placeholder="请输入手机号" v-model="phone" pattern="^1[34578]\d{9}$" required>
      </div>
      <div class="clear messagecode">
        <label>短信验证码</label>
        <input type="text" v-model="code" placeholder="请输入短信验证码" required>
        <button v-if="timer" class="getmcode nosendercode">{{second}}s后重发</button>
        <button v-if="!timer" class="getmcode" @click="getCode()">获取验证码</button>
      </div>
      <div class="clear">
        <label>性别</label>
        <div class="choosesex">
          <p @click="hideSexlist=hideSexlist?false:true">{{sexName}}<span><i></i></span></p>
          <div class="sexlist" v-bind:class="{ 'hide': hideSexlist }">
            <div v-for="s in sexList" @click="chooseSex(s)">{{s.sexName}}</div>
          </div>
        </div>
      </div>
      <div class="clear">
        <label>年龄</label>
        <div class="chooseage">
          <p @click="hideAgelist=hideAgelist?false:true">{{age}}<span><i></i></span></p>
          <div class="agelist" v-bind:class="{ 'hide': hideAgelist }">
            <div v-for="a in ageList" @click="chooseAge(a)">{{a}}</div>
          </div>
        </div>
      </div>
      <div class="clear maddress">
        <label>家庭住址</label>
        <div class="inputaddress">
          <p class="mdefault_a">{{defaultAddress}}</p>
          <input type="text" placeholder="请输入家庭的详细住址" class="daddress" v-model="address">
        </div>
      </div>
      <div class="clear">
        <label>微信号</label>
        <input type="text" placeholder="请输入微信号" v-model="wechat">
      </div>
      <div class="clear">
        <label>QQ号</label>
        <input type="text" placeholder="请输入QQ号" v-model="QQ">
      </div>
      <div v-if="showerror" class="errormsg">{{errormsg}}</div>
    </div>
    <div class="illustrate clear">
      <label>投票说明：</label>
      <div>
        <p>1、参与投票，即可在电影开播现场参加抽奖</p>
        <p>2、一人只能投一票；</p>
        <p>3、抽奖在电影开播前进行，记得早点到哦。</p>
      </div>
    </div>
    <input type="button" @click="openalert()" value="确认投票" class="gotovote">
  </div>
</template>
<style>
  .mdetail {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  }

  .detailpic {
    width: 100%;
    margin: 0 auto;
    padding: .8em 0;
    border-bottom: 1px solid #ddd;
  }

  .detailpic img {
    width: 80%;
    margin: 0 auto;
  }

  .users {
    padding-left: 4%;
    border-bottom: 1px solid #ddd;
  }

  .users > div {
    height: 3em;
    line-height: 3em;
    padding: .2em 0;
    border-bottom: 1px solid #ddd;
  }

  .users > div.maddress {
    height: 5em;
  }

  .users > div:last-child {
    border-bottom: none;
  }

  .users > div label {
    display: inline-block;
    float: left;
    width: 24%;
    padding-left: 4%;
    color: #666;
  }

  .users > div >input, .users > div.maddress .inputaddress {
    float: left;
    width: 68%;
    border: none;
    outline: none;
    font-size: 100%;
    font-family: Microsoft Yahei;
    color: #666;
  }
  .users > div .mdefault_a {
    line-height: 2.4em;
  }
  .users > div >input {
    height: 3em;
    line-height:3em;
  }
  .users > div.maddress .daddress {
    width: 100%;
    height: 2.6em;
    line-height: 2.6em;
    font-family: "Microsoft Yahei";
    border: none;
  }
  .users > div.messagecode {
    position: relative;
  }

  .getmcode {
    position: absolute;
    width: 6em;
    right: 4%;
    height: 2.6em;
    font-size: 100%;
    top: 50%;
    margin-top: -1.3em;
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
  .users > div.errormsg {
    border-bottom: none;
    border-top: 1px solid #ccc;
    height: 2em;
    line-height: 2em;
    padding: .2em 0 .2em 4%;
    font-size: 85%;
    color: #f60;
  }

  .users > div.errormsg .inputaddress {

  }

  .gotovote.false {
    background: #999;
    color: #666;
  }

  .choosesex, .chooseage {
    float: left;
    width: 68%;
    position: relative;
  }
  .choosesex >p, .chooseage >p {
    width:96%;
    height:2em;
    position: relative;
    border: 1px solid #ccc;
    line-height: 2em;
    padding-left: 6px;
    margin-top: .4em;
  }
  .choosesex >p >span, .chooseage >p >span {
    width: 12px;
    height: 6px;
    overflow: hidden;
    position: absolute;
    right: 6px;
    top: 50%;
    margin-top: -3px;
  }
  .choosesex >p >span i, .chooseage >p >span i {
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
  .sexlist, .agelist {
    position: absolute;
    width: 98%;
    border: 1px solid #ccc;
    border-top: none;
    background: #fff;
    z-index: 2;
  }
  .sexlist.hide ,.agelist.hide {
    display: none;
  }
  .sexlist >div, .agelist >div {
    height: 2em;
    line-height: 2em;
    border-bottom: 1px solid #e5e5e5;
    padding-left: 6px;
  }
</style>
<script>
  import MessageBox from 'mint-ui/lib/message-box'
  export default {
    data(){
      return {
        name: '',
        phone: '',
        code:'',
        errormsg: '',
        showerror: false,
        timer: undefined,
        second: 0,
        movie: this.$route.query,
        imgUrl: ImgUrl,
        hideSexlist: true,
        sexList:[{"sex":"man", "sexName":"男"},{"sex":"woman","sexName":"女"}],
        sex:'man',
        sexName:'男',
        hideAgelist: true,
        ageList: ["20岁以下","20-30岁","30-40岁","40-50岁","50-60岁","60岁以上"],
        age:'30-40岁',
        defaultAddress: this.$route.params.address,
        address: '',
        wechat: '',
        QQ:''
      }
    },
    ready(){
      //console.log(this.movie);
    },
    methods: {
      chooseSex(s){
        this.sex = s.sex;
        this.sexName = s.sexName;
        this.hideSexlist = true;
      },
      chooseAge(a){
        this.age = a;
        this.hideAgelist = true;
      },
      testphone(){
        let ptn = /^1[34578]\d{9}$/;
        if(this.phone.length>0){
          return ptn.test(this.phone);
        }else{
          return "blank";
        }
      },
      testblank(){
        if(this.name.length==0){
          this.showerror = true;
          this.errormsg = "*请输入姓名";
        }else if(!this.testphone()){
          this.showerror = true;
          this.errormsg = "*手机号输入错误，请重新输入";
        }else if(this.testphone()==="blank"){
          this.showerror = true;
          this.errormsg = "*请输入手机号";
        }else if(this.code.length==0){
          this.showerror = true;
          this.errormsg = "*请输入验证码";
        }else {
          return true;
        }
      },
      getCode(){//发送验证码
        //console.log(this.phone);
        if(this.testphone()==="blank"){
          this.showerror = true;
          this.errormsg = "*手机号不能为空，请输入"
        }else if(!this.testphone()){
          this.showerror = true;
          this.errormsg = "*手机号输入错误，请重新输入"
        }else{
          this.showerror = false;
          this.$http.post("/send?type=1&phone="+this.phone).then(function (data) {
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
      },
      openalert(){//投票
        if(this.testblank()){
          this.$http.post("/movie/vote",{
            "name": this.name,
            "mobile": this.phone,
            "code": this.code,
            "movieId": this.movie.id,
            "sex": this.sex,
            "address": this.defaultAddress+this.address,
            "age": this.age,
            "weixinNo": this.wechat,
            "qq": this.QQ
          }).then(function (response) {
            //console.log(response.body);
            if(response.body.success){
              MessageBox({
                title: '投票成功',
                message: this.movie.name,
                showCancelButton: false,
                confirmButtonText: '我知道了',
                confirmButtonClass: 'cbtext'
              }).then(action => {
                this.$router.go({ path: '/movieList/'+this.$route.params.sellerId});
              });
            }else{
              MessageBox({
                title: '投票失败',
                message: response.body.message,
                showCancelButton: false,
                confirmButtonText: '我知道了',
                confirmButtonClass: 'cbtext'
              });
            }
          })
        }

      }
    }
  }
</script>
