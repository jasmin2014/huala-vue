<template>
  <div class="recruit">
    <!--<header-component :header-title="HeaderTitle" :fiexd="HeaderFixed"></header-component>-->
    <mt-navbar class="recruit-nav clear" :selected.sync="selected" :fixed="true">
      <mt-tab-item id="0">{{companyName}}<more-item-icon :icon-type="'down'" :active-icon="false"></more-item-icon>
        <span class="right-line"></span>
      </mt-tab-item>
      <mt-tab-item id="1">{{jobName}}<more-item-icon :icon-type="'down'" :active-icon="false"></more-item-icon></mt-tab-item>
    </mt-navbar>
    <mt-tab-container :active.sync="selected">
      <mt-tab-container-item id="0">
        <ul class="recruit-subnav">
          <li @click="changeCompanyToGetRecruitList('0','全部公司')">全部公司</li>
          <li v-for="c in CompanyList" @click="changeCompanyToGetRecruitList(c.id,c.companyName)">{{c.companyName}}</li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <ul class="recruit-subnav recruit-subnav-right">
          <li @click="changeJobsToGetRecruitList('0', '热门岗位')">全部岗位</li>
          <li v-for="j in JobList" @click="changeJobsToGetRecruitList(j.id, j.jobName)">{{j.jobName}}</li>
        </ul>
      </mt-tab-container-item>

    </mt-tab-container>

    <div class="rescruit-list">
      <mt-loadmore v-if="!isBlank" :bottom-method="getRecruitList" :bottom-all-loaded="allLoaded" :auto-fill='false'>
      <section class="recruit-item" v-for="rec in recruitList" @click="OpenRecruitDetail(rec.id)">
        <div class="clear">
          <p class="recruit-name">岗位名称：{{rec.jobName}}</p>
          <p class="recruit-pay ellipsis">薪资：<span class="recruit-red">{{rec.salary}}元/月</span></p>
        </div>
        <div class="clear">
          <p class="recruit-name ellipsis recruit-grey">{{rec.companyName}}</p>
          <p class="recruit-pay ellipsis recruit-grey recruit-date">发布日期：{{rec.createTime}}</p>
        </div>
        <span class="recruit-link"></span>
      </section>
      </mt-loadmore>
      <section v-if="isBlank" class="item_blank">
        <p class="blankico"><img src="../assets/blank_ico.png" /></p>
        <p>暂无招聘信息</p>
      </section>
    </div>
  </div>
</template>

<script>
  import MoreItemIcon from '../comp/MoreItemIcon.vue'
  import HeaderComponent from '../comp/HeaderComponent.vue'
  export default{
    components: {MoreItemIcon,HeaderComponent},
    data(){
      return {
        isActive: false,
        HeaderFixed: true,
        HeaderTitle: "招工信息",
        ShowNav: false,
        selected: 'null',
        recruitList: [],
        page: 1,
        allLoaded: false,
        CompanyList: [],
        companyId:'0',
        JobList: [],
        jobId:'0',
        companyName:'全部公司',
        jobName: '热门岗位',
        sellerId: this.$route.params.sellerId,
        isBlank: false
      }
    },
    ready(){
      this.getCompanines();
      this.getJobs();
      this.getRecruitList();
    },
    methods: {
      init(){
        this.recruitList = [];
        this.allLoaded = false;
        this.page = 1;
      },
      changeCompanyToGetRecruitList(cid,companyN){
        this.init();
        this.CompanyList = [];
        this.companyId = cid;
        if(companyN&&companyN!==undefined) this.companyName = companyN;
        this.getRecruitList();
        this.getCompanines();
        this.selected = 'null';
      },
      changeJobsToGetRecruitList(jid,jobN){
        this.init();
        this.jobId = jid;
        this.JobList = [];
        if(jobN&&jobN!==undefined) this.jobName = jobN;
        this.getRecruitList();
        this.getJobs();
        this.selected = 'null';
      },
      getRecruitList(id){
        var self = this;
        if (self.allLoaded)return;
        this.$http.get("/recruit/recruit-list?sellerId="+this.$route.params.sellerId+"&page="+self.page+"&size=10&companyId="+self.companyId+"&jobId="+self.jobId).then(function (data) { //this.$route.params.sellerId
          var rec = data.body;
          if(rec.success){
            self.page += 1 ;
            if (rec.body.length <= 0){
              self.allLoaded = true;
              if(self.recruitList.length==0){
                self.isBlank = true;
              }
            }else{
              self.isBlank = false;
              rec.body.forEach(function (r) {
                self.recruitList.push(r);
              });
            }
          }
          console.log(self.isBlank);
          this.$broadcast('onBottomLoaded', id);
        });
      },
      getCompanines(){
        var self = this;
        var params = 'type=hot';
        this.$http.get('/recruit/company-list?'+params).then(function (data) {
          var rec = data.body;
          if(rec.success){
            rec.body.forEach(function (r) {
              self.CompanyList.push(r);
            });
          }
        })
      },
      getJobs(){
        var self = this;
        var params = 'type=hot';
        this.$http.get('/recruit/job-list?'+params).then(function (data) {
          var rec = data.body;
          if(rec.success){
            rec.body.forEach(function (r) {
              self.JobList.push(r);
            });
          }
        })
      },
      OpenRecruitDetail(rId){
        this.$router.go({ path: '/recruit-detail/'+this.sellerId+'/'+rId});
      }
    }
  }
</script>
<style>
  .recruit {
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    background: #f9f9f9;
  }
  .recruit-nav {
    display: block;
    height: 3em;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
  }
  .mint-navbar.is-fixed {
    top: 0;
  }
  .mint-tab-item{
    position: relative;
    height: 3em;
    line-height: 3em;
    overflow: hidden;
    text-align: center;
    width: 50%;
    float: left;
  }
  .mint-navbar .mint-tab-item {
    padding: 0;
  }
  .mint-navbar .mint-tab-item, .mint-tab-item .mint-tab-item-label {
    font-size: 100%;
  }
  .mint-tab-item .mint-tab-item-label {
    height: 3em;
    line-height: 3em;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    color: #fe5722;
    margin-bottom: 0;
  }
  .mint-navbar .mint-tab-item .more-icon {
    margin-left: .6em;
    position: absolute;
    top: 50%;
    margin-top: -.2em;
  }
  .mint-navbar .mint-tab-item.is-selected .more-icon em {
    background: #fe5722;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
  }

  .item_blank{
    display: block;
    width: 60%;
    margin: 10em auto;
  }
  .blankico , .blankico img{
    margin: 0 auto;
  }
  .item_blank >p {
    text-align: center;
    margin-top: .8em;
  }

  @media (min-width: 320px) {
    .mint-navbar .mint-tab-item.is-selected .more-icon em {
      top: 2px;
    }
    .blankico {
      width: 8em;
    }
    .blankico img {
      width: 100%;
    }
  }
  @media (min-width: 414px) {
    .mint-navbar .mint-tab-item.is-selected .more-icon em {
      top: 4px;
    }
  }
  @media (min-width: 640px) {
    .mint-navbar .mint-tab-item.is-selected .more-icon em {
      top: 5px;
    }
  }
  @media (min-width: 640px) {
    .blankico {
      width: auto;
    }
    .blankico img {
      width: auto;
    }
  }

  .mint-tab-item .right-line{
    position: absolute;
    right: 0;
    top: 0;
    height: 3em;
    width: 1px;
    background-color: #e0e0e0;
  }
  .rescruit-list {
    margin-top: 3em;
  }
  .recruit-item {
    background: #fff;
    padding: 1em 4em 1em 1em;
    font-size: 85%;
    position: relative;
    border-top: 1px solid #e0e0e0;
    margin-top: .5em;
  }
  .recruit-name, .recruit-pay {
    display: block;
  }
  .recruit-name {
    float: left;
    width: 60%;
    line-height: 2em;
  }
  .recruit-pay {
    float: right;
    width: 40%;
    text-align: right;;

  }
  .recruit-link {
    position: absolute;
    right: 6%;
    top: 50%;
    display: block;
    width: .7em;
    height: .7em;
    margin-top: -.5em;
    border-top: 3px solid #2f2f2f;
    border-right: 3px solid #2f2f2f;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }
  .recruit-subnav{
    position: fixed;
    left: 0;
    top: 3em;
    width: 100%;
    height: 42em;
    z-index: 2;
    background: #f2f2f2;
    border-top: 1px solid #e5e5e5;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-box-shadow: 0 3px 3px #999;
    -moz-box-shadow: 0 3px 3px #999;
    box-shadow:  0 3px 3px #999;
  }
  .recruit-subnav.show {
    display: block;
  }
  .recruit-subnav  li {
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
    padding: 0 1em;
    height: 3em;
    line-height: 3em;
  }

</style>
