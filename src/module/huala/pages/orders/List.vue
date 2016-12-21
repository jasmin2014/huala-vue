<template>
  <header-module :page-name="pageName" :fixed="Fixed"></header-module>
  <div class="nav order_nav clear">
    <ul>
      <li ng-class="{on:!isHistory}" ng-click="getList(false)" class="on">进行中<span class="right_line"></span></li>
      <li ng-class="{on:isHistory}" ng-click="getList(true)">历史订单</li>
    </ul>
  </div>
</template>

<script>
    import HeaderModule from '../common/HeaderModule.vue';
    export default{
        components: {HeaderModule},
        props: ['SellerId'],
        data(){
            return {
              sid:'',
              pageName:'CardListPage',
              Fixed: true
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
  .order_nav {
    display: block;
    height: 3em;
    background-color: #fff;
    margin-top: 2.8em;
  }
  .order_nav li {
    position: relative;
    height: 3em;
    line-height: 3em;
    text-align: center;
    width: 50%;
    float: left;
  }
  .order_nav li.on {
    border-bottom: 2px solid #ff3c00;
  }
  .order_page .right_line {
    position: absolute;
    right: 0;
    top: 0;
    height: 3em;
    width: 1px;
    background-color: #e0e0e0;
  }
</style>
