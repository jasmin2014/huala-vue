<template>
  <div class="tinfopic"><img v-lazy="imgUrl+sellerInfo.sellerImg" width="280" height="280"/></div>
  <div class="tinfoitems">
    <div>店铺名称：{{sellerInfo.name}}</div>
    <div>联系方式：{{sellerInfo.phone}}</div>
    <div>店铺地址：{{sellerInfo.address}}</div>
    <div>营业时间：{{sellerInfo.openTime}}--{{sellerInfo.endTime}}</div>
    <div>审核时间：{{sellerInfo.enterTime}}</div>
    <div>经度纬度：{{sellerInfo.lng}},{{sellerInfo.lat}}</div>
    <div class="editsellerinfo" v-bind:class="{'show':showEdit}">修改店铺信息</div>
  </div>
  <div class="selleritem">
    <h3>店铺信息<span v-bind:class="{'show':showEdit}">上传图片</span></h3>
    <ul class="sellerpics clear">
      <li>
        <div class="spic"><img v-lazy="imgUrl+sellerInfo.imgUrl"/></div>
        <p>店铺图片</p>
      </li>
      <li>
        <div class="spic"><img v-lazy="imgUrl+sellerInfo.idCardImg"/></div>
        <p>身份证图片</p>
      </li>
    </ul>
  </div>
  <div class="selleritem">
    <h3>营业信息<span v-bind:class="{'show':showEdit}">上传图片</span></h3>
    <ul class="sellerpics clear">
      <li>
        <div class="spic"><img v-lazy="imgUrl+sellerInfo.businesslicenseimg"/></div>
        <p>营业执照</p>
      </li>
      <li>
        <div class="spic"><img v-lazy="imgUrl+sellerInfo.goodsShelfUrl"/></div>
        <p>货架图片</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    components: {},
    props: ["sellerId","showEdit"],
    data(){
      return {
        materialPic: [],
        sellerInfo: {},
        sid: ''
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
        this.getInfo();
      }
    },
    methods: {
      getInfo(){
        let self = this;
        this.$http.get("/seller/seller-info?sellerId=" + this.sellerId).then(function (i) {
          //alert("aa");
          this.sellerInfo = i.body;
          if(i.body.materialPic){
            this.materialPic = i.body.materialPic;
          }
        })
      },
    }
  }
</script>
<style>
  .tinfopic {
    width: 90%;
    margin: 0.8em auto 0 auto;
  }

  .tinfopic img {
    width: 100%;
  }

  .tinfoitems {
    background: #fff;
    margin-top: .8em;
    padding-bottom: .8em;
  }

  .tinfoitems > div {
    font-size: 80%;
    height: 3em;
    line-height: 3em;
    padding-left: 1em;
    border-bottom: 1px solid #ddd;
  }
  .tinfoitems > div.editsellerinfo {
    width: 90px;
    height:2.6em;
    text-align: center;
    line-height: 2.6em;
    background: #fedc23;
    padding-left: 0;
    border-bottom: none;
    margin: .8em 0 0 .8em;
    display: none;
  }
  .tinfoitems > div.editsellerinfo.show {
    display: block;
  }

  .tinfoitems > div:last-child {
    border-bottom: none;
  }
  .selleritem >h3 {
    position: relative;
  }
  .selleritem >h3 span {
    position: absolute;
    right: 1em;
    top: .4em;
    font-size: 80%;
    background: #fedc23;
    height: 2.4em;
    font-weight: normal;
    line-height: 2.4em;
    display: none;
    width: 60px;
    text-align: center;
  }
  .selleritem >h3 span.show {
    display: block;
  }
</style>
