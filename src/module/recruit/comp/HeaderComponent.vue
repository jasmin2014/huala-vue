<template>
    <header class="header-comp" v-bind:class="{'Fiexd':Fiexd}">
      <p class="header-title">{{HeaderTitle}}</p>
      <a href="javascript:void(0);" class="returnback" @click="returnBackFn()"><span></span></a>
      <!--<a href="javascript:void(0);" class="searchico"><span></span></a>-->
    </header>
</template>

<script>

    export default{
        props:['HeaderTitle','Fiexd'],
        data(){
            return{

            }
        },
        methods:{
          returnBackFn(){
            window.history.back();
          }
        }
    }
</script>
<style>
  .header-comp{
    background-color:#fe5722;
    height: 4em;
    line-height: 4em;
    font-size: 100%;
    position: relative;
  }
  .header-comp.Fiexd {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }
  .header-title {
    width: 80%;
    margin: 0 auto;
    color: #fff;
    text-align: center;
  }
  .returnback, .searchico {
    position: absolute;
    top: 0;
    display: block;
    width: 3em;
    height: 4em;
    text-align: center;
    line-height: 4em;
  }
  .returnback {
    left: 0;
  }
  .searchico {
    right: 0;
  }
  .returnback >span, .searchico >span {
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
  }
  .returnback >span {
    width: .6em;
    height: .6em;
    margin: -.3em 0 0 -.3em;
    border-top: 3px solid #fff;
    border-right: 3px solid #fff;
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
  .searchico >span {
    width: 1em;
    height: 1em;
    margin: -.5em 0 0 -.5em;
    background: url("../assets/searchico.png") no-repeat center center;
    background-size: cover;
  }
</style>
