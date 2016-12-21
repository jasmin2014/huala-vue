<template>
  <header-component :page-name="pageName" :search-box="searchbox" :fixed="Fixed" :show-middle="showMiddle"></header-component>
  <div class="pt3em catenavs">
    <p class="i-mask" v-bind:class="{'show':showCateList}"></p>
    <div class="catenavitem">
      <p @click="showCateList=showCateList?false:true"><em class="iconfont"></em>分类</p>
      <div class="cateslist" v-bind:class="{'show':showCateList}">
        <div class="cates_01">
          <ul>
            <li @click="showCateList=false"><p class="iconfont"></p></li>
            <li><p>全部分类</p></li>
          </ul>
        </div>
        <div class="cates_02">
          <h2 class="cates_title"><p>香烟</p></h2>
          <cate-list-component :page-name="pageName"></cate-list-component>
          <div class="cate_all">
            查看全部
          </div>
        </div>
      </div>
    </div>
    <div class="catenavitem">
      <p>默认</p>
    </div>
    <div class="catenavitem">
      <p>销量</p>
    </div>
    <div class="catenavitem">
      <p>全部商品</p>
      <ul class="choosecates hidden">
        <li><p>世纪联华（大关店）</p></li>
      </ul>
    </div>
  </div>
  <div class="prolist_title">全部分类</div>
  <goods-list-component :icon-type="IconType" :good-list="goodsList" :mimg-url="MimgUrl"></goods-list-component>
</template>

<script>
  import HeaderComponent from '../../comp/common/HeaderComponent .vue';
  import CateListComponent from '../../comp/goods/CateListComponent.vue'
  import GoodsListComponent from '../../comp/goods/GoodsListComponent.vue'
  export default{
    components: {HeaderComponent, CateListComponent, GoodsListComponent},
    data(){
      return {
        sid:'',
        searchbox: true,
        showMiddle: true,
        Fixed: true,
        pageName: 'GoodList',
        IconType:'',
        showCateList: false,
        goodsList:[]
      }
    },
    computed: {
      s:function () {
        this.sid = this.SellerId;
        console.log("sid:"+this.sid);
        return this.SellerId;
      }
    },
    watch: {
      "sid":function () {
      }
    },
    methods: {

    }
  }
</script>
<style>
  .prolist_title{
    height: 2.4em;
    line-height: 2.4em;
    padding-left: 3%;
    font-size: 100%;
    border-top: 1px solid #e0e0e0;
    margin-top: 5.8em;
  }
  .catenavs {
    display: block;
    width: 100%;
    height: 5.7em;
    z-index: 3;
    background-color: #fff;
    padding-top: 2.8em;
    position: fixed;
    left: 0;
    top: 0;
    -webkit-box-shadow: 0 1px 1px #666;
    -moz-box-shadow: 0 1px 1px #666;
    box-shadow: 0 1px 1px #666;
  }
  .catenavitem {
    width: 25%;
    float: left;
    height: 3em;
    padding: 1em 0;
    position: relative;
    background-color: #fff;
  }
  .catenavitem >p{
    width: 100%;
    text-align: center;
    height: 1em;
    line-height: 1em;
    font-size: 86%;
    color: #9b9b9b;
    border-right: 1px solid #e0e0e0;
  }
  .catenavitem .cateslist {
    position: relative;
    width: 92vw;
    height: 85vh;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-top: 1em;
    background: #fff;
    display: none;
  }
  .catenavitem .cateslist.show {
    display: block;
  }
  .i-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    background: rgba(0,0,0,.5);
    display: none;
  }
  .i-mask.show {
    display: block;
  }
  .cates_01 {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    float: left;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    border-top: 1px solid #e0e0e0;
    padding-bottom: 12px;
    background-color: #e9e9e9;
  }
  .cates_01 li {
    width: 30%;
    height: 2.8em;
    line-height: 2.8em;
    overflow: hidden;
    text-align: center;
  }
  .cates_01 li:first-child {
    height: 4em;
    line-height: 4em;
  }
  .cates_01 li:first-child p{
    font-size: 140%;
    color: #666;
  }
  .cates_01 li p {
    border-bottom: 1px solid #ddd;
  }
  .cates_02 {
    position: absolute;
    top: 0;
    z-index: 9;
    width: 70%;
    float: left;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    border-top: 1px solid #e0e0e0;
    padding-bottom: 12px;
    left: 30%;
    background-color: #fff;
  }
  .cates_02 .cates_title{
    font-size: 100%;
    font-weight: 400;
    height: 4em;
    line-height: 4em;
    width: 90%;
    margin: 0 auto;
    text-align: left;
    padding: 1.2em 0 0 0;
  }
  .cates_02 .cates_title p{
    height: 1.6em;
    line-height: 1.6em;
    padding-left: 1em;
    border-left: 4px solid #ffdd24;
    color: #333;
  }
  .cates_02 .cate_all{
    width: 60%;
    margin: 2em auto 0;
    height: 2.4em;
    line-height: 2.4em;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #666;
  }
  .choosecates {
    position: absolute;
    left: -300%;
    top: 3em;
    z-index: 11;
    width: 100vw;
    border-top: 1px solid #e0e0e0;
    background-color: #fff;
    box-shadow: 0 0 3px #ccc;
  }
  .choosecates li {
    height: 2.5em;
    line-height: 2.5em;
    padding: 0 .4em;
    color: #9b9b9b;
    border-bottom: 1px solid #e0e0e0;
  }
  .choosecates li p{
    font-size: 86%;
    text-align: center;
  }
  .choosecates.hidden {
    display: none;
  }
</style>
