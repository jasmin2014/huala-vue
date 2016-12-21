<template>
  <div class="movie">
    <header class="header">
      <img src="../assets/banner.jpg">
      <div class="toptext">
        <p>时间：{{moList.playTime}}</p>
        <p>地点：{{moList.address}}</p>
      </div>
    </header>
    <div class="list">
      <section v-if="!isBlank" v-for="m in moList.movies" class="item clear">
        <div class="left">
          <img v-lazy="imgUrl+m.url">
        </div>
        <div class="right">
          <header>
            <h3 class="name">
              <p class="title">{{m.name}}</p>
            </h3>
            <p class="peaple">已有{{m.ticketNum}}人投票</p>
          </header>
          <div class="abstract">
            <p>导演：{{m.director}}</p>
            <p>主演：{{m.actor}}</p>
            <p>类型：{{m.type}}</p>
          </div>
          <button class="castme" @click="openvote(m,moList.address)">投我</button>
        </div>
      </section>
      <section v-if="isBlank" class="item_blank">
        <p class="blankico"><img src="../assets/blank_ico.png" /></p>
        <p>此商家暂无电影信息</p>
      </section>
    </div>
  </div>
</template>

<script>
  import Toast from 'mint-ui/lib/Toast'
  export default{
    components: {},
    data(){
      return {
        moList: [],
        imgUrl: ImgUrl,
        isBlank: false
      }
    },
    ready(){
      this.$http.get("/movie/list?sellerId="+this.$route.params.sellerId).then(function (data) { //this.$route.params.sellerId
        if(data.body.success){
          this.isBlank = false;
          this.moList = data.body.body;
        }else{
          Toast(data.body.message);
          this.isBlank = true;
        }
      })
    },
    methods: {
      openvote(vid,address){
        this.$router.go({ path: '/vote/'+this.$route.params.sellerId + "/"+address, query: vid});
      }
    }
  }
</script>
<style>
  .movie {
    width: 100%;
    /*max-width: 640px;*/
    margin: 0 auto;
  }

  .header {
    position: relative;
  }

  .header, .header img, .left img {
    width: 100%;
  }

  .toptext {
    position: absolute;
    left: 50%;
    bottom: .6em;
    height: 2.6em;
    width: 40%;
    margin-left: -20%;
  }
  .toptext p {
    font-size: 85%;
    color: #fff;
    line-height:1.3em;
  }

  .list {
    width: 92%;
    margin: 0 auto 0 1.2em;
  }

  .item {
    padding: 0.6em 0 0.4em 0;
    border-bottom: 1px solid #ddd;
  }

  .left {
    width: 28%;
    float: left;
  }

  .right {
    width: 67%;
    float: left;
    margin: -5px 0 0 1em;
    position: relative;
  }

  .name {
    position: relative;
    width: 100%;
    height:2.2em;
    font-size: 95%;
    line-height: 2.2em;
    color: #333;
  }
  .name p.title {
    width:65%;
    height: 2.2em;
    line-height: 2.2em;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
  }

  .peaple {
    font-size: 82%;
    color: #ff5c01;
  }

  .abstract p {
    font-size: 85%;
    line-height: 1.4em;
    color: #666;
  }

  .abstract {
    margin-top: .7em;
    width: 98%;
  }

  .castme {
    position: absolute;
    right: 0;
    top: 50%;
    width: 5em;
    height: 2.2em;
    background: #fff;
    border: 1px solid #ff5c01;
    border-radius: 1.3em;
    margin-top: -1.1em;
    font-size: 100%;
    font-family: "Microsoft Yahei";
    color: #ff5c01;
    text-align: center;
    line-height: 2.2em;
  }

  .cbtext {
    color: #ff5c01;
    font-size: 100%;
    font-family: "Microsoft Yahei";
  }

  .item_blank{
    display: block;
    width: 60%;
    margin: 10em auto;
  }
  .blankico , .blankico img{
    margin: 0 auto;
  }
  .item_blank >p {
    text-align: center;
    margin-top: .8em;
  }
  @media (min-width: 320px) {
    .blankico {
      width: 8em;
    }
    .blankico img {
      width: 100%;
    }
  }
  @media (min-width: 640px) {
    .blankico {
      width: auto;
    }
    .blankico img {
      width: auto;
    }
  }
</style>
