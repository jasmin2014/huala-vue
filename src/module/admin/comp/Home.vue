<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="backnavcontent">
      <h2>花啦生活后台</h2>
      <ol>
        <li>
          <p class="navtit" @click="activeId='ActiveList'">活动管理</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId==='ActiveList' }">
            <li>活动列表</li>
            <li>Banner管理</li>
            <li>卡券管理</li>
          </ul>
        </li>
        <li>
          <p class="navtit" @click="activeId='SellerAccount'">结算管理</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId=='SellerAccount' }">
            <li>店铺结算</li>
          </ul>
        </li>
        <li>
          <p class="navtit" @click="activeId='GoodEntry'">商品管理</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId=='GoodEntry' }">
            <li>商品录入</li>
          </ul>
        </li>
        <li>
          <p class="navtit" @click="activeId='OrderList'">订单管理</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId=='OrderList' }">
            <li @click="openOrderList()">订单列表</li>
          </ul>
        </li>
        <li>
          <p class="navtit" @click="activeId='Movie'">惠农购</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId=='Movie' }">
            <li @click="movieList()">电影下乡</li>
          </ul>
        </li>
        <li>
          <p class="navtit" @click="activeId='Statement'">统计报表</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId==='Statement' }">
            <li>每日平台数据</li>
            <li>财务统计</li>
            <li>店铺补贴查询</li>
            <li>基础统计</li>
            <li>商户信息统计</li>
          </ul>
        </li>
        <li>
          <p class="navtit" @click="activeId='SellerAuth'">店铺管理</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId==='SellerAuth' }">
            <li @click="openSellerList()">开店审核</li>
            <li @click="openSellerDetail()">店铺详情</li>
            <li>地推宝</li>
            <li @click="spikeList()">秒杀活动</li>
          </ul>
        </li>
        <li>
          <p class="navtit" @click="activeId='Supplier'">供应商管理</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId==='Supplier' }">
            <li>供应商列表</li>
          </ul>
        </li>
        <li>
          <p class="navtit" @click="activeId='System'">系统管理</p>
          <ul class="backsnav" v-bind:class="{ 'show': activeId==='System' }">
            <li>菜单管理</li>
            <li>用户角色</li>
          </ul>
        </li>
      </ol>
    </div>
</template>

<script>
    import SellerList from './SellerAuth';
    export default {
        components: {SellerList},
        data () {
            return {
              activeId:""
            }
        },
        methods: {
          openSellerDetail(){
            this.$router.go({path:'/seller-detail'})
          },
          openSellerList(){
            this.$router.go({ path: '/seller-auth/'});
          },
          openOrderList(){
            this.$router.go({ path: '/order'});
          },
          spikeList(){
            this.$router.go({path:'/spike-act'});
          },
          movieList(){
            this.$router.go({path:'/movie'});
          },
        }
    }
</script>
<style>
  .backnavcontent {
    min-height: 100vh;
    background: #fff;
  }
  .backnavcontent > h2 {
    height: 3em;
    line-height: 3em;
    text-align: center;
    font-size: 110%;
    font-weight: normal;
    background: #fedc23;
    color: #fff;
  }
  .backnavcontent > ol > li {
    line-height:3em;
  }
  .navtit {
    padding-left: 1em;
    border-bottom: 1px solid #eee;
  }
  .backsnav {
    display: none;
  }
  .backsnav li {
    background: #f8f8f8;
    line-height:3em;
    padding-left: 3em;
    font-size: 85%;
    border-bottom: 1px solid #e5e5e5;
  }
  .backsnav.show {
    display: block;
  }
</style>
