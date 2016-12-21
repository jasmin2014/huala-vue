<template>
  <div class="addressModule">
    <header>
      <p class="c_regps"><span class="c_regps_ico iconfont"></span>点击获取定位地址</p>
    </header>
    <div class="a_list_tit"><em class="iconfont a_list-ico"></em>我的收货地址</div>
    <div class="a_lists">
      <section class="addressItem" v-for="a in AddressList" v-bind:class="{'active':a.isDefault=='1'}" @click="changeAddress(a)">
        <div class="a_inneraddress">
          <p><b class="consigneeName">{{a.consignee}}</b>{{a.mobile}}</p>
          <p class="greyclr a_addressmess">{{a.address}}</p>
        </div>
      </section>
    </div>
    <a class="choosedate_ok ng-scope" ng-href="#/address/edit/-1" href="#/address/edit/-1">创建新地址</a>
  </div>
</template>
<script>
  export default{
    data (){
      return {
        AddressList: [
          {
            address:"苑中路与大关苑西路交叉口",
            city:"330100",
            consignee:"燕燕",
            district:"330105",
            id:342,
            isDefault:"1",
            isDelete:"0",
            lat:'30.311175',
            lng:'120.157751',
            mobile:"15868135920",
            province:"330000",
            signBuilding:"大关西六苑",
            userId:169},
          {
            address:"江汉路1785号",
            city:"330100",
            consignee:"葛灵燕",
            district:"330108",
            id:311,
            isDefault:"0",
            isDelete:"0",
            lat:'30.212956',
            lng:'120.20785',
            mobile:"15868135920",
            province:"330000",
            signBuilding:"双城国际4号楼",
            userId:169
        },
          {
            address:"拱墅区",
            city:"330100",
            consignee:"葛",
            district:"330105",
            id:348,
            isDefault:"0",
            isDelete:"0",
            lat:'30.311262',
            lng:'120.157366',
            mobile:"15868135920",
            province:"330000",
            signBuilding:"大关西六苑15幢",
            userId:169
          }]
      }
    },
    ready(){
      //this.getAddressList();
    },
    methods: {
      getAddressList(){
        //let http = this.$http;
        this.$http.get("/address/list").then(function (i) {
          console.log(i);
        });
      },
      changeAddress(a){
        var _gps = {
          address: a.address,
          lat: a.lat,
          lng: a.lng
        }
        sessionStorage.getItem("gps",_gps);
        //console.log(_gps);
        this.$router.go({path:'/'});
      }
    }
  }
</script>
<style>
  .addressModule header{
    height: 3.2em;
    line-height: 3.2em;
    text-align: center;
    background-color: #ffdd24;
  }
  .addressModule header .c_regps {
    position: relative;
    width: 100%;
    font-style: normal;
  }
  .addressModule header .c_regps_ico {
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -4.4em;
    font-size: 130%;
  }
  .addressModule .a_list_tit{
    position: relative;
    line-height: 3em;
    padding-left: 3%;
    border-bottom: 1px solid #e0e0e0;
  }
  .addressModule .a_list_tit .a_list-ico {
    font-size: 150%;
    margin-right: 3px;
  }
  .addressModule .consigneeName {
    margin-right: 4px;
  }
  .addressModule .a_lists {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  @media (min-height: 627px) {
    .addressModule .a_lists {
      height: 76vh;
    }
  }
  @media (min-height: 480px){
    .addressModule .a_lists {
      height: 72vh;
    }
  }
  .addressModule .addressItem {
    position: relative;
    padding: .8em 3% 0;
    line-height: 1.6em;
  }
  .addressModule .addressItem.active{
    background: #540a79;
    color: #fff;
  }
  .addressModule .a_inneraddress {
    position: relative;
    border-bottom: 1px solid #e0e0e0;
    padding: 0 0 .8em .2em;
  }
  .addressModule .addressItem.active .a_inneraddress {
    border-bottom: none;
  }
  .addressModule .a_addressmess {
    line-height: 1.4em;
    width: 86%;
    overflow: hidden;
  }
  .addressModule .addressItem.active .a_addressmess {
    color: #fff;
  }
  .greyclr {
    color: #9b9b9b;
  }
  .addressModule .choosedate_ok {
    position: absolute;
    left: 3%;
    bottom: .5em;
    width: 94%;
    height: 3em;
    line-height: 3em;
    background-color: #ffdd24;
    text-align: center;
    border-radius: 3px;
  }
</style>
