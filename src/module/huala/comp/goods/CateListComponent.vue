<template>
  <ul class="cateitems clear" v-bind:class="{'fouroneline':pageName==='sellerDetail'}">
    <li v-for="c in CateLists">
      <a href="#">
        <p class="catepic">
          <img v-if="c.catImg!=undefined&&c.catImg!=''" alt="{{c.cname}}"  v-bind:src="MimgUrl+c.catImg"/>
          <img v-else src="http://192.168.25.246:8080/huala_gly/assets/v3/images/defaultpic4.png" />
        </p>
        <p class="catename">{{c.cname}}</p>
      </a>
    </li>
  </ul>
</template>

<script>
    export default{
        components: {},
        props: ['pageName', 'CateLists','MimgUrl'],
        data(){
            return {
              sid:''
            }
        },
        methods: {

        }
    }
</script>
<style>
  .cateitems {
    padding: 0 .2em;
  }
  .cateitems.fouroneline {
    margin-top: 4px;
  }
  .cateitems li {
    width: 33%;
    float: left;
    margin-top: 6px;
  }
  .cateitems.fouroneline li {
    width: 25%;
    padding: 0 10px;
  }
  .cateitems li .catepic {
    width: 100%;
    margin: 0 auto;
    padding: 0 .2em;
  }
  .cateitems li .catepic img {
    width: 100%;
  }
  .cateitems li .catename {
    height: 2em;
    text-align: center;
    font-size: 86%;
    overflow: hidden;
  }
</style>
