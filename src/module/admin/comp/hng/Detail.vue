<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <mt-header fixed title="电影列表" class="mt-header">
    <mt-button icon="back" slot="left" @click="closeDetail()"></mt-button>
  </mt-header>
  <div style="margin-top: 40px" class="pop" v-show="switchTag === 0">
      <div v-for="movie in movieList">
        <div class="movie-item">
          <img class="movie-pic" v-lazy="imgUrl + movie.url">
          <div class="movie-info">
            <div id="moive-name">电影名称：{{movie.name}}</div>
            <span class="">导演：{{movie.director}}</span><br>
            <span>演员：{{movie.actor}}</span><br>
            <span>类型：{{movie.type}}</span><br>
            <mt-button type="primary" size="small" @click="getVoteDetail(movie)">投票详情</mt-button>
            <mt-button type="primary" size="small" @click="vote(movie)">投票</mt-button>
          </div>
        </div>
      </div>
  </div>
  <div style="margin-top: 40px" class="pop" v-show="switchTag===1">
    <vote :movie="currentMovie"></vote>
  </div>
  <mt-loadmore :bottom-method="getVoteList" :bottom-all-loaded="voteAllLoaded" ref="loadmore" :auto-fill='false'>
  <div style="margin-top: 40px" class="pop" v-show="switchTag===2">
    <vote-detail :vote-list="voteList"></vote-detail>
  </div>
  </mt-loadmore>
</template>
<script>
  import {Toast} from 'mint-ui/lib/';
  import Vote from './Vote.vue'
  import VoteDetail from './VoteDetail.vue'
  export default{
    props: ['movieList'],
    components: {Vote, VoteDetail, Toast},
    data(){
      return {
        currentMovie: {},
        voteList: [],
        switchTag: 0,
        imgUrl: ImgUrl,
        page: '1',
        voteAllLoaded: false,
      }
    },
    methods: {
      vote(movie){
        this.currentMovie = movie;
        this.switchTag = 1;
      },
      getVoteDetail(movie){
        this.switchTag = 2;
        this.currentMovie = movie;
        this.getVoteList();
      },
      getVoteList(id){
        this.$http.get("/preferential/statistical?page=" + this.page + "&size=10&movieId=" + this.currentMovie.id)
          .then((res)=> {
            var self = this;
            var r = res.body;
            if (r.success) {
              if (r.rows.length > 0) {
                self.page++;
                r.rows.forEach(function (item) {
                  self.voteList.push(item);
                })
              }else {

              }
            }
          });
        this.$broadcast('onBottomLoaded', id);
      },
      closeDetail() {
        if (this.switchTag != 0) {
          this.switchTag = 0;
          this.page = 1;
        }
        else {
          this.$dispatch('handle-detail', false);
        }
        this.voteList = [];
      }
    },
  }
</script>
<style>
  .pop {
    width: 100%;
    height: 93vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .movie-item {
    width: 100%;
    height: 150px;
    background-color: #fff;
    border-bottom: 1px solid #9da0a4;
    padding: 5px;
  }

  .movie-pic {
    float: left;
    width: 40%;
    height: 100%;
  }

  .movie-info {
    float: left;
    width: auto;
    height: 100%;
    margin-left: 5px;
  }

  span {
    font-size: .8em;
  }
</style>
