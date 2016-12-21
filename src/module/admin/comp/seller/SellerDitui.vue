<template>
  <input v-model="sellerId" @change="getDituiInfo(sellerId)" hidden>
  <div class="tinfoitems">
    <div>账号：{{dituiInfo.account}}</div>
    <div>姓名：{{dituiInfo.name}}</div>
    <div>电话：{{dituiInfo.mobile}}</div>
    <div>审核时间：{{dituiInfo.enterTime}}</div>
  </div>
  <div class="selleritem">
    <h3>物料照片（审核通过）</h3>
    <div class="swipepicture">
      <mt-swipe :auto="4000" :show-indicators="true">
        <mt-swipe-item v-for="p in sellerInfo.materialPic.urls">
          <div class="spic"><img v-lazy="imgUrl+p"/></div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--<p class="uploadtime">上传时间：{{sellerInfo.materialPic.checkDate}}</p>-->
  </div>
</template>

<script>
  export default{
    components: {},
    props: ['sellerId'],
    data(){
      return {
        dituiInfo: [],
        sid:''
      }
    },
    computed: {
      s: function () {
        this.sid=this.sellerId;
        return this.sellerId;
      }
    },
    watch:{
      'sid':function () {
        this.getDituiInfo();
      }
    },
    created(){
      this.getDituiInfo();
    },
    methods: {
      getDituiInfo(){
        this.$http.get("/ditui/getditui?sellerId=" + this.sellerId)
          .then(function (i) {
            this.dituiInfo = i.body.body;
            //console.log(i.body)
          })
      }
    }
  }
</script>
<style>
  .selleritem {
    background: #fff;
    margin-top: .8em;
  }

  .selleritem > h3 {
    font-size: 85%;
    height: 3em;
    line-height: 3em;
    padding-left: 1em;
    border-bottom: 1px solid #ddd;
  }

  .swipepicture {
    width: 94%;
    height: 220px;
    margin: 0 auto;
  }

  .swipepicture .swipe-indicator {
    background: #ccc;
    opacity: 1;
  }

  .swipepicture .swipe-indicator.active {
    background: #fedc23;
    opacity: 1;
  }

  .uploadtime {
    font-size: 80%;
    height: 3em;
    line-height: 3em;
  }

  .uploadtime {
    padding: 0 0 .8em .8em;
  }
</style>
