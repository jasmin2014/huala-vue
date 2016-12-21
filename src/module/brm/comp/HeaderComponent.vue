<template>
  <mt-header v-if="pageName=='Brm'" title="资金管理" v-bind:class="{'fixed':Fixed}">
    <div slot="left">
      <mt-button icon="back" @click="returnFn()">返回</mt-button>
    </div>
    <mt-button v-if="pageName=='Brm'" slot="right" @click="calendar.value=''">全部</mt-button>
    <mt-button v-if="pageName=='Brm'" slot="right" class="filtrate"  @click.stop="open($event,'picker1')">筛选</mt-button>
    <mt-button v-if="pageName=='BrmCash'" slot="right">账户明细</mt-button>
  </mt-header>
  <mt-header v-if="pageName=='BrmCash'" title="提现" v-bind:class="{'fixed':Fixed}">
    <div slot="left">
      <mt-button icon="back" @click="returnBackFn()">返回</mt-button>
    </div>
    <mt-button v-if="pageName=='Brm'" slot="right" @click="calendar.value=''">全部</mt-button>
    <mt-button v-if="pageName=='Brm'" slot="right" class="filtrate"  @click.stop="open($event,'picker1')">筛选</mt-button>
    <mt-button v-if="pageName=='BrmCash'" slot="right" @click="goToBrmDetail()">账户明细</mt-button>
  </mt-header>
  <mt-header v-if="pageName=='BrmDetail'" title="提现" v-bind:class="{'fixed':Fixed}">
    <div slot="left">
      <mt-button icon="back" @click="returnBackFn()">返回</mt-button>
    </div>
    <mt-button v-if="pageName=='Brm'" slot="right" @click="calendar.value=''">全部</mt-button>
    <mt-button v-if="pageName=='Brm'" slot="right" class="filtrate"  @click.stop="open($event,'picker1')">筛选</mt-button>
    <mt-button v-if="pageName=='BrmCash'" slot="right">账户明细</mt-button>
  </mt-header>
  <div class="date-mask" v-if="calendar.show"></div>
  <calendar
    :show.sync="calendar.show"
    :showcalendar.sync="calendar.showcalendar"
    :type="calendar.type"
    :value.sync="calendar.value"
    :x="calendar.x"
    :y="calendar.y"
    :z="calendar.z"
    :begin.sync="calendar.begin"
    :end.sync="calendar.end"
    :range.sync="calendar.range"
    :weeks="calendar.weeks"
    :months="calendar.months"
    :sep="calendar.sep">
  </calendar>
</template>

<script>

  import Calendar from './Calendar.vue';
    export default{
        props:['pageName', 'datetime', 'Fixed'],
        components: {Calendar},
        data(){
            return{
              // 数据绑定
              calendar: {
                show: false,
                showcalendar:false,
                x: '0',
                y: '0',
                z: "",
                picker: "",
                type: "date",
                begin: "",
                end: "",
                value: "",
                sep: "/",
                weeks: [],
                months: [],
                range: false,
                items: {
                  // 单选模式
                  picker1: {
                    type:"date",
                    value:"",
                    sep:"-",
                  }
                }
              }
            }
        },
        // 处理值的传递
        watch:{
          'calendar.value': function (value) {
            this.calendar.items[this.calendar.picker].value=value;
            this.datetime = value;
          }
        },
        methods:{
          returnBackFn(){
            window.history.back();
          },
          goToBrmDetail(){
            this.$router.go({ path: '/brmdetail'});
          },
          returnFn(){
            window.location.href = "NMApp::backToMainPage";
          },
          // 打开显示选择器
          open(e,type) {
            // 设置类型
            this.calendar.picker=type;
            this.calendar.type=this.calendar.items[type].type;
            this.calendar.range=this.calendar.items[type].range;
            this.calendar.begin=this.calendar.items[type].begin;
            this.calendar.end=this.calendar.items[type].end;
            this.calendar.value=this.calendar.items[type].value;
            // 可不用写
            this.calendar.sep=this.calendar.items[type].sep;
            this.calendar.weeks=this.calendar.items[type].weeks;
            this.calendar.months=this.calendar.items[type].months;
            this.calendar.show=true;
            this.calendar.showcalendar = true;
            this.calendar.x= '50%';
            this.calendar.y='50%';
            this.calendar.z = '-150px 0 0 -155px';
            //this.calendar.x=e.target.offsetLeft
            //this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8
          }
        }
    }
</script>
<style>
  .mint-header{
    background: -moz-linear-gradient(top, #ff4949 0%, #ff4c47 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ff4949), color-stop(100%,#ff4c47));
    background: -webkit-linear-gradient(top, #ff4949 0%,#ff4c47 100%);
    background: -o-linear-gradient(top, #ff4949 0%,#ff4c47 100%);
    background: -ms-linear-gradient(top, #ff4949 0%,#ff4c47 100%);
    background: linear-gradient(to bottom, #ff4949 0%,#ff4c47 100%);
    height: 50px;
    line-height: 50px;
  }
  .mint-header.fixed {
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height: 50px;
    z-index: 9;
  }
  .filtrate {
    margin-left: .8em;
  }
  .date-mask {
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    position: fixed;
    left:0;
    top:0;
    z-index: 6;
  }
</style>
