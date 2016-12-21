<template>
  <header-component :page-name="pageName"></header-component>
  <section class="sellermess sellerpagemess">
    <p class="shoppic">
      <img v-if="sellerInfo.imgUrl!=undefined&&sellerInfo.imgUrl!=''" class="radiuspic" v-bind:src="MimgUrl+sellerInfo.imgUrl" />
      <img v-else class="radiuspic default" src="http://192.168.25.246:8080/huala_gly/assets/v3/images/defaultpic4.png" />
    </p>
    <div class="shop-mess">
      <h3>{{sellerInfo.name}}</h3>
      <p class="shop-time">营业时间：{{sellerInfo.openTime}}-{{sellerInfo.endTime}}</p>
    </div>
    <a href="#" title="花啦测试店">{{sellerInfo.name}}</a>
    <div class="collect collected">
      <em class="iconfont icon-collect"></em>收藏
    </div>
    <div class="collectmodule">
      <div class="l-mask"></div>
      <div class="m-module">
        <div class="attention">
          <p class="success">收藏成功！</p>
          <p class="success">恭喜你又发现一个正常买卖的微信平台</p>
          <div class="clear success_code">
            <div class="code_left">
              <p><img src="http://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEi7zoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3BFaXFhRkRtbnRqbml2bVQ1MmJ6AAIERl8YWAMEgFEBAA==" /></p>
              <p class="success">长按关注</p>
            </div>
            <div class="code_right">
              <p><span class="iconfont code_icon"></span>下单easy</p>
              <p><span class="iconfont code_icon"></span>发现好物</p>
              <p><span class="iconfont code_icon"></span>更多福利</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="swipeBanner" v-if="bannerList.length!=0">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="b in bannerList"><img  v-bind:src="MimgUrl+b.imgUrl" /></mt-swipe-item>
    </mt-swipe>
  </div>
  <div class="activemodels" v-for="am in actList">
    <h2 class="articleheader">{{am.name}} <span class="ahpic"><img alt="" src="http://192.168.25.246:8080/huala_gly/assets/v3/images/likes.png" /></span></h2>
    <article class="whitebg">
      <div class="activetitle">
        <a href="#">
          <img alt="{{am.name}}" v-bind:src="MimgUrl+am.picImg" />
        </a>
      </div>
      <goods-list-component :icon-type="IconType" :good-list="am.goodsList" :mimg-url="MimgUrl"></goods-list-component>
    </article>
  </div>
  <div class="whitebg catelist">
    <div class="bottombdr catetitle">
      商品分类
      <em class="iconfont icon-cate">全</em>
    </div>
    <cate-list-component :page-name="pageName" :cate-lists="catList" :mimg-url="MimgUrl"></cate-list-component>
    <a href="javascript:void(0);" class="lookMoreCate" @click="gotoGoodsList()">查看全部</a>
  </div>
</template>

<script>

  import HeaderComponent from '../../comp/common/HeaderComponent .vue';
  /*import SellerListComponent from '../../comp/seller/SellerListComponent.vue'*/
  import GoodsListComponent from '../../comp/goods/GoodsListComponent.vue'
  import CateListComponent from '../../comp/goods/CateListComponent.vue'
  export default{
    components: {HeaderComponent,GoodsListComponent,CateListComponent},
    props: [],
    data(){
      return {
        MimgUrl: 'http://192.168.200.151:8080/hlman-pic/',
        pageName: 'sellerDetail',
        IconType: 'xian',
        sellerId: this.$route.params.sellerId,
        sellerInfo: {},
        bannerList: [],
        actList: [],
        catList: []
      }
    },
    ready(){
      this.getSellerMess();
    },
    methods: {
      getSellerMess(){
        self = this;
        var gps = JSON.parse(sessionStorage.getItem("gps"));
        console.log(gps);
        console.log(self.sellerId);
        this.$http.get('/v3/seller?address=%E5%A4%A7%E5%85%B3%E8%A5%BF%E5%85%AD%E8%8B%91&lat=30.311175&lng=120.157751&sellerId=20').then(function (res) {
          console.log(res.body.body);
          if(res.body.success){
            self.bannerList = res.body.body.banner;
            self.actList = res.body.body.actList;
            self.catList = res.body.body.cat;
            self.sellerInfo = res.body.body.seller;
          }
        })
      },
      gotoGoodsList(){
        this.$router.go({path:'/goods/'+this.sellerId});
      }
    }
  }
</script>
<style>
  .swipeBanner {
    width: 100%;
    height:140px;
    overflow: hidden;
  }
  .swipeBanner .swipe-item img {
    width: 100%;
  }
  .articleheader {
    text-align: center;
    line-height: 2.6rem;
    background: #fff;
    font-weight: 400;
    margin-top: 10px;
    position: relative;
    font-size: 110%;
    padding-left: 3rem;
  }
  .articleheader .ahpic {
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    position: absolute;
    top: .3rem;
    left: 50%;
    margin-left: -2.2rem;
  }
  .articleheader .ahpic img, .activetitle a img {
    width: 100%;
  }
  .catelist{
    display: block;
    margin-top: 10px;
    padding-bottom: 1px;
    background: #fff;
  }
  .catetitle {
    position: relative;
    display: block;
    width: 100%;
    height: 3em;
    line-height: 3em;
    padding-left: 3em;
    border-bottom: 1px solid #e0e0e0;
  }
  .icon-cate {
    position: absolute;
    top: 50%;
    left: 3%;
    margin: -.8em 5px 0 0;
    border-radius: 50%;
    width: 1.8em;
    height: 1.8em;
    line-height: 1.8em;
    text-align: center;
    color: #fff;
    font-style: normal;
    background-color: #5ca82c;
    font-size: 85%;
  }
  .catelist .lookMoreCate {
    display: block;
    width: 94%;
    margin: 10px auto 9px;
    height: 3em;
    line-height: 3em;
    text-align: center;
    background-color: #ffdd24;
    color: #4a4a4a;
    border-radius: 3px;
  }
</style>
