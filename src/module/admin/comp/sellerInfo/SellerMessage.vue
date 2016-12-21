<template>
  <div class="sellerMessageModule">
    <h2>精品烟酒商行高技路店<span @click="showEdit=showEdit?false:true">编辑</span></h2>
    <div class="myedititem clear" v-bind:class="{'show':showEdit}">
      <div>开店</div>
      <div>关店</div>
      <div>上线</div>
      <div>下线</div>
    </div>
    <div class="tabchangeinfo">
      <mt-navbar class="page-part" :selected.sync="selected" :fixed="true">
        <mt-tab-item id="0">基本信息</mt-tab-item>
        <mt-tab-item id="1">附加信息</mt-tab-item>
        <mt-tab-item id="2">地推信息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container :active.sync="selected" v-bind:class={"showall":showEdit}>

        <mt-tab-container-item id="0">
          <seller-basic :seller-id="sellerId" :show-edit="showEdit"></seller-basic>
        </mt-tab-container-item>

        <mt-tab-container-item id="1">
          <seller-ext :seller-id="sellerId"></seller-ext>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <seller-ditui :seller-id="sellerId"></seller-ditui>
        </mt-tab-container-item>

      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import SellerBasic from '../seller/SellerBasic.vue';
  import SellerExt from '../seller/SellerExt.vue';
  import SellerDitui from '../seller/SellerDitui.vue';
  export default{
      components: {SellerBasic,SellerExt,SellerDitui},
      props: ["sellerId"],
      data(){
          return {
            selected: '0',
            showEdit: false
          }
      },
      create(){
        this.getMessage();
      },
      methods: {
        getMessage(){
          alert("getMessage")
        }
      }
  }
</script>
<style>
  /*.sellerMessageModule {
    display: none;
  }*/
  .sellerMessageModule h2 {
    font-size: 85%;
    font-weight: normal;
    line-height: 3em;
    padding: 0 1em;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
  }
  .sellerMessageModule h2 span {
    position: absolute;
    right:1em;
    top:0;
    text-decoration: underline;
  }
  .sellerMessageModule {
    min-height: 100vh;
    padding-top: 40px;
  }
  .sellerMessageModule .mint-tab-container {
    height: 78vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .sellerMessageModule .mint-tab-container.showall{
    height:68vh;
  }
  .sellerMessageModule .tabchangeinfo {
    padding-top: 0;
  }
  .sellerMessageModule .tabchangeinfo .mint-navbar.is-fixed {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    box-shadow: 0 1px 1px #ddd;
  }
</style>
