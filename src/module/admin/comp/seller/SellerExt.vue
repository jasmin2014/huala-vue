<template>
  <div style="display:none">{{s}}</div>
  <div class="tinfoitems">
    <div v-for="b in sellerBasicInfo">{{b.dataDesc}}：{{b.dataValue}}</div>
  </div>
</template>

<script>
  export default{
    components: {},
    props: ["sellerId"],
    data(){
        return {
          id:'',
          sellerBasicInfo:[]
        }
    },
    computed: {
      s: function () {
        this.id=this.sellerId;
        return this.sellerId
      }
    },
    watch:{
      'id':function () {
        //console.log(this.sellerId)
        this.getBasicInfo(this.sellerId)
      }
    },
    methods: {
      getBasicInfo(id){
        let self = this;
        this.$http.get("/seller/seller-basic-info?sellerId=" + this.sellerId).then(function (i) {
          //console.log(i);
          this.sellerBasicInfo = i.body.rows;
        });
      }
    }
  }
</script>
<style>
  .selleritem {
    background: #fff;
    margin-top: .8em;
  }

  .selleritem > h3 {
    font-size: 85%;
    height: 3em;
    line-height: 3em;
    padding-left: 1em;
    border-bottom: 1px solid #ddd;
  }

  .sellerpics {
    width: 96%;
    padding: .8em 0 .2em 4%;
  }

  .sellerpics li {
    width: 48%;
    margin-right: 4%;
    float: left;
  }
  .sellerpics li:nth-child(2n){
    margin-right: 0;
  }

  .spic, .spic img {
    width: 100%;;
  }

  .sellerpics li p, .uploadtime {
    font-size: 80%;
    height: 3em;
    line-height: 3em;
  }

  .uploadtime {
    padding: 0 0 .8em .8em;
  }

  .sellerpics li p {
    text-align: center;
  }

  .spic, .spic img {
    width: 100%;;
  }


</style>
