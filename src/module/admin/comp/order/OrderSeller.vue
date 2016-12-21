<template>
  <section class="oitem osellerinfo">
    <h3>
      <span class="ordersn">{{oInfo.sellerName}}</span>
    </h3>
    <div class="tabchangeinfo">
      <mt-navbar class="page-part" :selected.sync="selected" :fixed="true">
        <mt-tab-item id="0">基本信息</mt-tab-item>
        <mt-tab-item id="1">附加信息</mt-tab-item>
        <mt-tab-item id="2">地推信息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container :active.sync="selected">

        <mt-tab-container-item id="0">
          <seller-basic :seller-id="sellerId" :show-edit="false"></seller-basic>
        </mt-tab-container-item>

        <mt-tab-container-item id="1">
          <seller-ext :seller-id="sellerId"></seller-ext>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <seller-ditui :seller-id="sellerId"></seller-ditui>
        </mt-tab-container-item>

      </mt-tab-container>
    </div>
  </section>
</template>

<script>
  import SellerBasic from '../seller/SellerBasic.vue';
  import SellerExt from '../seller/SellerExt.vue';
  import SellerDitui from '../seller/SellerDitui.vue';
  export default{
    components: {SellerBasic,SellerExt,SellerDitui},
    props: ['oInfo','sellerId'],
    data(){
      return {
        selected:"0",
        sellerInfo:[],
        materialPic:[],
        sid:''
      }
    },
    computed: {
      s: function () {
        this.sid=this.sellerId;
        return this.sellerId
      }
    },
    watch:{
      'sid':function () {
        console.log(this.sellerId)
        this.getInfo();
      }
    },
    ready(){
      //this.getInfo();
    },
    methods: {
      getInfo(id){
        console.log(this.sellerId);
        let self = this;
        this.$http.get("/seller/seller-info?sellerId="+this.sellerId).then(function (i) {
          this.sellerInfo=i.body;
          this.materialPic = i.body.materialPic;
          console.log("sellerInfo:");
          console.log(this.sellerInfo);
          console.log(this.materialPic.urls);
          this.$broadcast('onBottomLoaded', id);
        })
      }
    }
  }
</script>
<style>
  .oitem.osellerinfo {
    margin-top: 0;
  }
  .osellerinfo .tabchangeinfo{
    padding:0;
  }
  .osellerinfo .mint-tab-container {
    margin-top:0;
  }
  .osellerinfo .mint-navbar.is-fixed {
    position: relative;
    /*margin-top: -41px;*/
    Z-INDEX: 1;
  }
  /*.osellerinfo .tinfopic, .osellerinfo .mint-tab-container-item {
    margin-top: 50px;
  }*/
</style>
