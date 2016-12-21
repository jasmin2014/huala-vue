<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="cartaddress" v-bind:class="{'changeaddress':ChangeAddress}">
    <img src="http://192.168.25.246:8080/huala_gly/assets/v3/images/addressbg.png" class="cpic" />
    <div class="cartmessage">
      <p class="clear">
        <span class="cart_mleft greyclr">收货人：</span>
        <span class="cart_mright ng-binding">燕燕<em class="phonenumber ng-binding">15868135920</em></span>
      </p>
      <p class="clear cm-address">
        <span class="cart_mleft greyclr">地址：</span>
        <span class="cart_mright ng-binding">大关西六苑苑中路与大关苑西路交叉口</span>
      </p>
    </div>
    <p class="headericon greyclr"><em class="iconfont"></em></p>
    <p class="changeaddressico" v-if="ChangeAddress"><em class="iconfont"></em></p>
    <a href="#" class="changeaddresslink" v-if="ChangeAddress"></a>
  </div>
</template>
<script>
  export default{
    props:['ChangeAddress'],
    components:{},
    data(){
      return{

      }
    },
    methods: {

    },
  }
</script>
<style>
  .cartaddress{
    position: relative;
    display: block;
    line-height: 1.6em;
    font-size: 86%;
    padding-top: .3em;
    background: #fff;
  }
  .cartaddress.changeaddress {
    margin-top: 3em;
  }
  .cartaddress .cpic {
    width: 100%;
  }
  .cartaddress .cartmessage {
    position: absolute;
    left: 0;
    top: 50%;
    width: 90%;
    margin-top: -1.8em;
    padding-left: 18vw;
  }
  .cartmessage .cart_mleft{
    width: 4.5em;
    float: left;
  }
  .cartmessage .cart_mright {
    width: 76%;
    float: left;
  }
  .cartaddress .headericon {
    position: absolute;
    left: 5%;
    top: 50%;
    width: 2em;
    height: 2em;
    text-align: center;
    line-height: 1.5em;
    font-size: 150%;
    margin-top: -1em;
    border: 1px solid #9b9b9b;
    border-radius: 50%;
  }
  .cartaddress .changeaddressico {
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 22px;
    border: 1px solid #ffdd24;
    border-radius: 50%;
    margin-top: -12px;
    position: absolute;
    top: 50%;
    right: 3%;
  }
  .cartaddress .changeaddresslink{
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
