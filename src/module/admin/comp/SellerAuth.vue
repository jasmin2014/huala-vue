<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="sellerlist container">
    <mt-header fixed title="店铺审核">
      <mt-button icon="back" slot="left" @click="popupClose()"></mt-button>
    </mt-header>
    <div class="aChecked" @click="hideCity=hideCity?false:true">{{selectCity}}<span><i></i></span></div>
    <ul class="addressmenu" v-bind:class="{ 'hide': hideCity }">
      <li v-for="c in cityList" ><span @click="chooseCity(c)">{{c.name}}</span></li>
    </ul>
    <list :page-name="pageName" :seller-status="sellerStatus"></list>
    <router-view></router-view>
  </div>
</template>
<script>
    import List from './seller/List.vue';
    import { MessageBox } from 'mint-ui/lib/';
    export default{
        components: {List,MessageBox},
        data(){
            return {
              hideCity: true,
              cityList: [{ city: "330100", name: '杭州' }, { city: "500100", name: '重庆' }, { city: "130100", name: '石家庄' }],
              selectCity: '杭州',
              pageName: 'sellerAuth',
              sellerStatus: ''
            }
        },
        ready(){
          let city = window.localStorage.getItem('city');
          console.log(this.selectCity);
          console.log(this.pageName);
          if (city) {
            this.cityList.forEach(i => {
              if(city==i.city){
                this.selectCity=i.name;
              }
            });
          }
        },
        methods: {
          popupClose(){
            window.history.back();
          },
          chooseCity(city){
            this.selectCity = city.name;
            window.localStorage.setItem('city',city.city);
            this.hideCity = true;
          }
        }
    }
</script>
<style>

  .sellerlist {
    min-height: 100vh;
    background: #fff;
  }
  .sellerlist .mint-header {
    background: #fedc23;
    color: #333;
    z-index: 999;
  }
  .sellerlist .mint-header {
    font-size: 100%;
  }
  .sellerlist .mint-header-title {
    font-weight:normal;
  }
  .addressmenu {
    position: fixed;
    right: 0;
    top: 40px;
    background: rgba(255,255,255,0.9);
    width: 100px;
    z-index: 9999;
    border: 1px solid #fedc23;
  }
  .addressmenu.hide{
    display: none;
  }
  .addressmenu li {
    line-height: 2.4em;
    height: 2.4em;
    padding-left: .8em;
    font-size: 80%;
    border-bottom: 1px solid #fedc23;
  }
  .aChecked {
    position: fixed;
    right: 0.8em;
    top: 0;
    z-index: 999;
    height: 40px;
    line-height: 40px;
    background: #fedc23;
    font-size: 80%;
    padding-right: 20px;
  }
  .aChecked span {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -2px;
    display: block;
    width: 12px;
    height: 5px;
    overflow: hidden;
  }
  .aChecked span i {
    display: block;
    width: 8px;
    height: 8px;
    background: #333;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    margin: -4px 0 0 2px;
  }
</style>
