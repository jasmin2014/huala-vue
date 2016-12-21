<template>
  <section class="sellermess sellerpagemess" v-if="ItemType==='single-row'">
    <p class="shoppic">
      <img class="radiuspic" src="http://wxtest.huala.com:8081/hlman-pic/supplierInfo/201603/1458544587348.jpg?s=220x220" />
    </p>
    <div class="shop-mess">
      <h3>周星驰</h3>
      <p class="shop-time">营业时间：Thu Jan 01 09:00:00 CST 1970-Thu Jan 01 22:00:00 CST 1970</p>
    </div>
    <a href="#/seller-detail/639" title="花啦测试店">周星驰</a>
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

</template>

<script>
    export default{
        components: {},
        props: ['SellerId','ItemType', 'SellerList'],
        data(){
            return {
              sid: '',
              allLoaded: false
            }
        },
        ready(){
          console.log(this.SellerList.length);
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
            //this.getSellerList();
          }
        },
        methods: {

        }
    }
</script>
<style>

.sellermess {
  position: relative;
  padding: .8em 3% 1em 20%;
  background-color: white;
  margin-top: 8px;
}
.sellermess:first-child , .sellermess.sellerpagemess{
  margin-top: 0;
}
.sellermess .shoppic {
  position: absolute;
  left: 3%;
  top: 50%;
  margin-top: -22px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0;
  border: 1px solid #e5e5e5;
}
.sellermess .shoppic img {
  width:120%;
}
.sellermess .shoppic img.default {
  width:100%;
}
.sellermess .shop-mess h3{
  line-height: 1.8em;
  font-weight: normal;
  width: 70%;
  height: 1.8em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 90%;
}
.sellermess .shop-mess p{
  color: #9b9b9b;
  font-size: 80%;
}
.sellermess .shop-time {
  width: 80%;
  height: 1.4em;
  line-height: 1.4em;
  overflow: hidden;
}
 .sellermess p.distance {
  border-radius: 4px;
  background-color: #ffdd24;
  padding: 0 .4em;
  position: absolute;
  right: 3%;
  top: 50%;
  margin-top: -1em;
  display: inline-block;
  font-size: 80%;
}
 .sellermess a{
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  text-indent: -1000em;
  overflow-x: hidden;
  overflow-y: hidden;
}
.sellermess .collect {
  border-radius: 14px;
  border: 1px solid #4a4a4a;
  line-height: 2em;
  padding: 0 .8em 0 26px;
  text-align: center;
  font-size: 86%;
  position: absolute;
  right: 3%;
  top: 50%;
  margin-top: -1em;
  display: inline-block;
}
.collectmodule {
  display: none;
}
.sellermess .collect em.icon-collect {
  position: absolute;
  left: .5em;
  top: .1em;
  margin-right: 5px;
}
.sellermess .l-mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.6);
}
.sellermess .m-module{
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  width: 80%;
  margin: -8em 0 0 -40%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #fff;
}
.sellermess .m-module .attention {
  position: relative;
  padding: 10px;
}
.sellermess .attention .success{
  text-align: center;
  line-height: 2.2em;
}
.sellermess .attention .success_code{
  margin-top: 8px;
}
.sellermess .attention .code_left {
  float: left;
  width: 40%;
  margin-left: 2px;
}
.sellermess .attention .code_right{
  float: right;
  width: 34%;
}
.sellermess .code_right>p {
  line-height: 2.4em;
}
.sellermess .code_left p img{
  width: 100%;
}
.sellermess .attention .code_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 86%;
  margin-right: 5px;
  text-align: center;
  line-height: 16px;
  border: 1px solid #ff6000;
  color: #ff6000;
}
</style>
