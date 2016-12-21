<template>
  <div class="vote-title">
    <div class="col-4">投票人</div>
    <div class="col-4">手机号</div>
    <div class="col-4">投票时间</div>
  </div>
  <div class="detail-contain">
    <div v-for="voter in voteList">
      <div class="vote-item">
        <div class="col-4">{{voter.name}}</div>
        <div class="col-4">{{voter.mobile}}</div>
        <div class="col-4">{{voter.voteTime}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props: ['voteList'],
    data(){
      return {}
    },
    methods: {},
  }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  .vote-title {
    background-color: #9da0a4;
    height: 3em;
    padding-top: .8em;
  }

  .col-4 {
    float: left;
    width: 33.33%;
    text-align: center;
  }
  .vote-item {
    width: 100%;
    height: 3em;
    margin-top: 10px;
    background-color: #00AA00;
    border-bottom: 1px solid #9da0a4;

  }
</style>
