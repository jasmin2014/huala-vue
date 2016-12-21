<template>
  <div class="goodsDetailModule">
    <header-component :page-name="pageName" :search-box="searchbox" :fixed="Fixed"></header-component>
    <div class="goodDetailModule">
      <div class="Goodspictures">
        <mt-swipe :auto="4000">
          <mt-swipe-item><img src="http://wxtest.huala.com:8081/hlman-pic/goods/201511/1447134794172.jpg" /></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="proinfo">
        <p class="proname ng-binding">德芙丝滑牛奶颗粒巧克力72g</p>
        <p class="greyclr promess ng-binding ng-scope" ng-if="goods.goodsDesc!=''">瞧一瞧 看一看了</p>
        <p class="proprice"><span class="ng-binding">￥0.01</span></p>
        <p class="prosuperlier ng-binding"><a href="javascript:void(0)" class="ng-binding">世纪联华（大关店）</a> | 销量：133</p>
      </div>
      <div class="graphic-more ng-hide" ng-show="showGoodsDetail">
        <p class="graphic-txt" ng-click="getGraphic()">图文<br />详情</p>
      </div>
    </div>
    <div class="detailpage">
      <div class="topborder">
        <seller-list-component :seller-id="SellerId" :item-type="itemtype"></seller-list-component>
      </div>
      <div class="elselink clear mt15">
        <a href="#/goods/cat/20?cid=551001044">同类商品</a>
        <a href="#/goods/cat/20">全部商品</a>
      </div>
    </div>
    <footer class="detailfooter">
      <ul class="clear">
        <li><a href="#/seller/20"><p><em class="greyclr iconfont"></em></p><p class="small_txt">店铺</p></a></li>
        <li><a href="javascript:;" ng-click="gotop()"><p><em class="greyclr iconfont"></em></p><p class="small_txt">顶部</p></a></li>
      </ul>
      <div class="addtocart_deitail ng-isolate-scope" add-cart="" pagename="detail" goods="goods" seller-id="seller.id">
        加入购物车
      </div>
    </footer>
  </div>
</template>

<script>
  import HeaderComponent from '../../comp/common/HeaderComponent .vue';
  import SellerListComponent from '../../comp/seller/SellerListComponent.vue'
  export default{
    components: {HeaderComponent,SellerListComponent},
    props: ['SellerId','GoodsId'],
    data(){
      return {
        sid:'',
        searchbox: true,
        Fixed: true,
        pageName: 'GoodList',
        itemtype:'single-row'
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
  .goodsDetailModule {
    padding-bottom: 4.2em;
  }
  .goodDetailModule {
    margin-top: 2.8em;
    background: #fff;
    position: relative;
  }
  .goodDetailModule .Goodspictures {
    width: 90%;
    max-height: 280px;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
  }
  .goodDetailModule .swipe-items-wrap>div img{
    width: 100%;
  }
  .goodDetailModule .proinfo{
    text-align: center;
    margin-top: .8em;
    padding-bottom: 1em;
  }
  .goodDetailModule .proinfo .proname {
    width: 94%;
    margin: 0 auto;
    font-size: 120%;
  }
  .goodDetailModule .promess {
    width: 90%;
    line-height: 1.8em;
    margin: 0 auto;
    color: #9b9b9b;
  }
  .goodDetailModule .proprice{
    line-height: 2.4em;
    font-size: 120%;
  }
  .goodDetailModule .proprice span {
    color: #ff3c3c;
    font-size: 120%;
    font-weight: 700;
  }
  .goodDetailModule .prosuperlier {
    line-height: 1em;
    font-size: 14px;
    color: #9b9b9b;
    margin-top: 10px;
  }
  .goodDetailModule .graphic-more {
    position: absolute;
    right: 5%;
    bottom: 1rem;
    z-index:9;
    width: 4.6em;
    height: 4.6em;
    background: rgba(0,0,0,.5);
    border-radius: 50%;
  }
  .goodDetailModule .graphic-more .graphic-txt{
    height: 3.6em;
    text-align: center;
    color: #fff;
    line-height: 1.3em;
    margin-top: 15px;
  }
  .topborder {
    border-top: 1px solid #e5e5e5;
  }
  .detailpage {
    background: #fff;
    padding-bottom: .6em;
  }
  .detailpage .elselink {
    width: 84%;
    margin-left: auto;
    margin-right: auto;
  }
  .detailpage .elselink a{
    width: 42%;
    line-height: 2.8em;
    border: 1px solid #4a4a4a;
    border-radius: 2px;
    text-align: center;
  }
  .detailpage .elselink a:first-child {
    float: left;
  }
  .detailpage .elselink a:last-child {
    float: right;
  }
  .detailfooter {
    position: fixed;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 3.8em;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
  }
  .detailfooter ul{
    height: 3em;
    float: left;
    margin-top: .1em;
  }
  .detailfooter ul li{
    float: left;
    text-align: center;
    margin-left: 10px;
  }
  .detailfooter li:first-child {
    margin-right: 10px;
  }
  .detailfooter li em{
    font-size: 160%;
    color: #f60;
  }
  .detailfooter .addtocart_deitail {
    position: absolute;
    right: 3%;
    top: 50%;
    width: 8em;
    height: 3em;
    line-height: 3em;
    margin-top: -1.5em;
    border: 1px solid #ff3c00;
    color: #ff3c00;
    text-align: center;
  }
</style>
