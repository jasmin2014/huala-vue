<template>
  <div v-for="(index,goods) in goodsList" track-by="id">
    <div class="item">
      <img class="goods-pic" v-lazy="imgUrl+goods.picUrl">
      <div class="cont">
        <div id="goods-name">{{goods.title}}</div>
        <span id="rec">秒杀价：￥{{goods.recPrice/100}}</span>
        <span id="sale">￥{{goods.salePrice/100}}</span><br>
        <span>开始时间：{{goods.startTime}}</span><br>
        <span>结束时间：{{goods.endTime}}</span><br>
        <span>剩余库存：{{goods.totalCount}}</span>
        <span>库存：{{goods.defaultCount}}</span><br>
        <span>店铺名称：{{goods.sellerName}}</span><br>
        <mt-button type="primary" size="small" @click="modify(index)">修改</mt-button>
        <mt-button type="danger" size="small" @click="deleteItem(goods)">删除</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui/lib/';
  export default{
    data (){
      return {
        goodsList: {},
        imgUrl:ImgUrl,
      }
    },
    ready(){
      this.getList();
    },
    methods: {
      getList(){
        this.$http.get("/spike/activity-list")
          .then((res) =>{
            var self = this;
            var j = res.body;
            if (res.status == 200)
            {
              self.goodsList = j;
            }
          }, (err) =>{

          });
      },
      modify(index){
      },
      deleteItem(goods){
        MessageBox.confirm('确定执行此操作?').then(({value, action})=>{
          this.goodsList.$remove(goods);
        });
      }
    }
  }
</script>
<style>
  .item{
    width: 100%;
    height: 160px;
    background-color: #fff;
    border-bottom: 1px solid #9da0a4;
    padding: 10px;
  }
  .goods-pic{
    float: left;
    width: 40%;
    height: 100%;
  }
  .cont{
    float: right;
    width: 60%;
    height: 100%;
  }
  span{
    font-size: .3em;
  }
  #goods-name{
    font-size: 1em;
    color: black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #rec{
    color: red;
    font-size: .5em;
  }
  #sale{
    text-decoration: line-through;
  }
</style>
