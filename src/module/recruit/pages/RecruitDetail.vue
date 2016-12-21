<template>
    <!--<header-component :header-title="HeaderTitle"></header-component>-->
    <div class="recruitDetail">
      <section class="recruit-detail-item">
        <div>
          <p class="recruit-station-name ellipsis"><span class="recruit-grey">岗位名称：</span>{{recruitMessage.jobName}}</p>
          <span class="recruit-red recruit-price">{{recruitMessage.salary}}/月</span>
        </div>
        <div><span class="recruit-grey">发布公司：</span>{{recruitMessage.companyName}}<span></span></div>
        <div><span class="recruit-grey">工作地点：</span>{{recruitMessage.jobAddress}}<span></span></div>
        <div class="recruit-issue-date recruit-grey">发布时间：{{recruitMessage.createTime}}<span class="recruit-view-count">浏览：{{recruitMessage.visitNum}}次</span></div>
      </section>
      <section class="recruit-detail-item">
        <p class="recruit-detail-title">职位描述</p>
        <p class="recruit-mt1">岗位职责：</p>
        <p>{{recruitMessage.jobDuty}}</p>
        <!--<p>1、负责所分配区域的卫生清洁工作；</p>
        <p>2、保证按质按量的完成所分配的工作；</p>
        <p>3、听从领导的分配和安排</p>-->
        <p class="recruit-mt1">岗位要求：</p>
        <p>{{recruitMessage.jobSkill}}</p>
        <!--<p>1、要求女性，身体健康，年龄35-55岁；</p>
        <p>2、有相关经验者优先；</p>-->
      </section>
      <section class="recruit-detail-form">
        <form>
          <div>姓名：<input type="text" v-model="name" placeholder="请输入您的姓名" /></div>
          <div>手机号码：<input type="text" placeholder="请输入您的手机号码" v-model="phone" pattern="^1[34578]\d{9}$" required/></div>
          <div class="recruit-code">短信验证码：<input type="text" :maxlength="6" v-model="messageCode" placeholder="请输入您收到的验证码" />
            <button v-if="timer" class="recruit-send-code" disabled="disabled">{{second}}s后重发</button>
            <button v-if="!timer" class="recruit-send-code" @click="getCode()">获取验证码</button>
            <!--<p class="recruit-send-code" @click="getCode()">获取验证码</p>-->
          </div>
        </form>
      </section>
      <div class="recruit-connect">
        <p v-if="!showerror"></p>
        <p v-if="showerror">{{errormsg}}</p>
        <!--<p>您的手机号码或者验证码错误！</p>-->
        <button v-if="showerror" disabled="disabled">联系该公司</button>
        <button v-if="!showerror" @click="openalert()">联系该公司</button>
      </div>
    </div>
</template>

<script>
    import HeaderComponent from '../comp/HeaderComponent.vue'
    import MessageBox from 'mint-ui/lib/message-box'
    export default{
        components:{HeaderComponent,MessageBox},
        data(){
            return{
              HeaderTitle: "招工信息",
              sellerId: this.$route.params.sellerId,
              recruitId: this.$route.params.recruitId,
              recruitMessage: {},
              name: '',
              phone: '',
              messageCode:'',
              errormsg: '请填写手机号和验证码',
              showerror: true,
              timer: undefined,
              second: 0,
              recruitCompany:'',
              recruitName: '',
              deletedisable: false,
              contacts: '',
              contactphone: ''
            }
        },
        ready(){
          this.getRecruitDetail();
        },
        watch: {
          "messageCode":function () {
            console.log(this.messageCode);
            if(this.messageCode.length==6){
              if(this.name.length>0){
                this.showerror = false;
              }else{
                this.showerror = true;
                this.errormsg = "*请输入姓名";
              }
            }
          },
          "name":function () {
            console.log(this.messageCode);
            if(this.name.length>0){
              if(this.testphone()==true){
                if(this.messageCode.length==6){
                  this.showerror = false;
                }else{
                  this.showerror = true;
                  this.errormsg = "*请输入验证码";
                }
              }else{
                this.showerror = true;
                this.errormsg = "*请输入手机号";
              }

            }
          }
        },
        methods:{
          getRecruitDetail(){
            this.$http.get('/recruit/recruit-detail?recruitId='+this.recruitId).then(function (res) {
              console.log(res);
              this.recruitMessage = res.body.body;
              this.recruitCompany = res.body.body.companyName;
              this.recruitName = res.body.body.jobName;
              this.contacts = res.body.body.contacts;
              this.contactphone = res.body.body.contactsPhone;
            })
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
            }else if(this.messageCode.length==0){
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
              this.errormsg = "*请输入手机号"
            }else if(!this.testphone()){
              this.showerror = true;
              this.errormsg = "*手机号输入错误，请重新输入"
            }else{
              this.errormsg = "*请填写验证码"
              this.showerror = true;
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
          openalert(){
            var self = this;
            if(self.testblank()){
              this.$http.post("/recruit/apply-recruit",{
                "applyName": self.name,
                "applyPhone": self.phone,
                "messageCode": self.messageCode,
                "recruitId": self.recruitId,
                "sellerId": self.sellerId
              }).then(function (response) {
                //console.log(response.body);
                if(response.body.success){
                  MessageBox({
                    title: '申请成功',
                    message: this.recruitCompany+'　"'+this.recruitName+'"岗位联系方式　' + this.contacts + '　' + this.contactphone,
                    showCancelButton: false,
                    confirmButtonText: '完成',
                    confirmButtonClass: 'cbtext'
                  }).then(action => {
                    this.$router.go({ path: '/recruit/'+self.sellerId});
                  });
                }else{
                  MessageBox({
                    title: '申请失败',
                    message: response.body.message,
                    showCancelButton: false,
                    confirmButtonText: '关闭',
                    confirmButtonClass: 'cbtext'
                  });
                }
              })
            }

          }
        }

    }
</script>

<style>
  .recruitDetail {
    width: 100%;
    min-height: 100vh;
    background: #f9f9f9;
    padding-bottom: 10vh;
  }
  .recruit-detail-item,.recruit-detail-form {
    background: #fff;
    margin-top: .5em;
    font-size: 80%;
  }
  .recruit-detail-item {
    padding: 1em;
  }
  .recruit-detail-item >div {
    line-height: 1.8em;
  }
  .recruit-detail-item:first-child {
    margin-top: 0;
  }
  .recruit-detail-item:first-child >div, .recruit-issue-date, .recruit-code {
    position: relative;
  }
  .recruit-price,.recruit-view-count,.recruit-send-code {
    position: absolute;
    right: 0;
    top: 0;
  }
  .recruit-detail-item >div.recruit-issue-date {
    font-size: 90%;
    line-height: 2em;
  }
  .recruit-station-name {
    width: 70%;
  }
  .recruit-detail-item >p {
    line-height: 1.6em;
    font-size: 90%;
    color: #4c4c4c;
  }
  .recruit-detail-item >p.recruit-detail-title {
    line-height: 2.4em;
    border-bottom: 1px solid #e5e5e5;
    font-size: 100%;
  }
  .recruit-detail-form {
  }
  .recruit-detail-form  form >div {
    height: 3em;
    line-height: 3em;
    border-top: 1px solid #e5e5e5;
    padding: 0 1em;
  }
  .recruit-detail-form  form >div input {
    width: 75%;
    height: 3em;
    line-height: 3em;
    border: none;
    font-size: 90%;
  }
  .recruit-code .recruit-send-code {
    right: 1em;
    top: .5em;
    height: 2.5em;
    line-height: 2.5em;
    font-size: 80%;
    background: #ff5c01;
    color: #fff;
    border-radius: 8px;
    width: 100px;
    text-align: center;
    border: none;
  }
  .recruit-code .recruit-send-code:disabled {
    background: #999;
  }
  .recruit-connect >p {
    height: 3em;
    line-height: 3em;
    font-size: 80%;
    color: #ff5c01;
    text-align: center;
  }
  .recruit-connect > button {
    display: block;
    width: 90%;
    font-size: 80%;
    margin: 0 auto;
    height: 3em;
    line-height: 3em;
    background: #ff5c01;
    color: #fff;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    border: none;
  }
  .recruit-connect > button:disabled {
    background: #ccc;
  }
  .cbtext {
    color: #fe5722;
  }
  .msgbox, .msgbox-title,.msgbox-btns, .msgbox-btn {
    font-size: 90%;
  }
  .msgbox-message {
    font-size: 80%;
  }
</style>
