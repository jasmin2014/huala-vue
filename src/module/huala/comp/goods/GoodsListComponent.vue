<template>
  <ul class="goodslistModule clear">
    <li v-for="g in goodList">
      <a href="#">
        <p class="propic">
          <img v-if="g.picUrl!=undefined&&g.picUrl!=''" height="80" v-bind:src="MimgUrl+g.picUrl" />
          <img v-else src="http://192.168.25.246:8080/huala_gly/assets/v3/images/defaultpic4.png" />
        </p>
        <p class="proname">{{g.title}}</p>
      </a>
      <div class="proprice clear">
        <span class="p_price">￥{{g.salePrice/100 | toFixed}}</span>
        <div class="icon-cart">
          <em class="iconfont"></em>
        </div>
      </div>
      <p class="rightline"></p>
      <em class="icon-xian-status small" v-if="IconType==='xian'"></em>
    </li>
  </ul>
</template>

<script>
    export default{
        components: {},
        props: ['IconType','goodList','MimgUrl'],
        data(){
            return {

            }
        },
        methods: {

        }
    }
</script>
<style>
  /*.goodslistModule.topcatesfixed {
    margin-top: 5.8em;
  }*/
 .goodslistModule li{
   width: 33.3333333%;
   position: relative;
   float: left;
   padding-bottom: .4em;
   border-right: 1px solid #e0e0e0;
   border-top: 1px solid #e0e0e0;
   background-color: #fff;
  }
 .goodslistModule li:nth-child(3n){
   border-right:none;
 }
 .goodslistModule li .propic {
   padding: 1em;
   overflow: hidden;
 }
 .goodslistModule li .propic img {
   width: 100%;
 }
 .goodslistModule li .proname {
   font-size: 86%;
   height: 2em;
   line-height: 2em;
   text-align: center;
   overflow-x: hidden;
   overflow-y: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
  }
 .goodslistModule li .proprice {
   height: 2.6em;
   line-height: 2.6em;
  }
 .goodslistModule li .p_price {
   font-size: 110%;
   color: #ff3c3c;
   margin-left: 3%;
   float: left;
 }
 .goodslistModule li .icon-cart {
   float: right;
   margin: .3em 3% 0 0;
   width: 2.2em;
   height: 2.2em;
   line-height: 2.2em;
   border-radius: 50%;
   text-align: center;
 }
 .goodslistModule li .icon-cart em {
   font-size: 130%;
 }
 .goodslistModule li .icon-xian-status {
   position: absolute;
   left: 3%;
   top: 0;
   width: 2.4em;
   height: 3.6em;
   font-style: normal;
   background: url("http://192.168.25.246:8080/huala_gly/assets/v3/images/status_discont.png") center top no-repeat;
   background-size: 100%;
  }
 .goodslistModule li .icon-xian-status.small {
   width: 1.8em;
 }
</style>
