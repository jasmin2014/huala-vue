<template>
  <div  class="contain">
    <mt-header fixed title="电影下乡" class="mt-header">
      <mt-button icon="back" slot="left" @click="popupClose()"></mt-button>
    </mt-header>
    <div style="margin-top: 40px">
      <mt-loadmore :bottom-method="getShopList" :bottom-all-loaded="movieAllLoaded" ref="loadmore" :auto-fill='false'>
        <div class="shop-item" v-for="shop in shopList">
          <span id="shop-name">店铺：{{shop.sellerName}}</span><br>
          <span id="play-addr">播放地点：{{shop.address}}</span><br>
          <span id="play-time">播放时间：{{shop.time}}</span><br>
          <mt-button type="primary" size="small" @click="detail(shop)">详情</mt-button>
          <mt-button type="danger" size="small" @click="deleteItem(shop)">删除</mt-button>
        </div>
      </mt-loadmore>
    </div>
  </div>
  <mt-popup class="contain" :visible.sync="popupVisible" position="right">
    <detail :movie-list="movieList"></detail>
  </mt-popup>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui/lib/';
  import Detail from './Detail.vue'
  export default{
    components:{MessageBox, Detail, Toast},
    data(){
      return {
        page: '1',
        movieAllLoaded: false,
        key: '',
        shopList: [],
        popupVisible:false,
        movieList:[],
      }
    },
    ready(){
      this.getShopList();
    },
    methods: {
      popupClose(){
        window.history.back();
        this.shopList = [];
      },
      getShopList(id){
        this.$http.get("/preferential/movie-active-list?key=" + this.key + "&page=" + this.page + "&size=10")
          .then((res) => {
            var self = this;
            var r = res.body;
              if (r.success)
              {
                if (r.rows.length > 0)
                {
                  self.page++;
                  r.rows.forEach(function (item) {
                    self.shopList.push(item);
                  })
                }else {
                  Toast('已加载完成！');
                }

              }
          });
        this.$broadcast('onBottomLoaded', id);
      },
      detail(shop){
        this.movieList=shop.movies;
        this.popupVisible = true;
      },
      deleteItem(shop){
        MessageBox.confirm('确定执行此操作?').then(({value, action})=> {
          this.$http.post("/preferential/movie-active-delete",shop).then(function (res) {
            console.log(JSON.stringify(res));
            if (res.status == 200)
            {
              if (res.body.success)
              {
                this.shopList.$remove(shop);
              }
            }
          })
        });
      },
    },
    events:{
      'handle-detail':function (msg) {
        this.popupVisible = msg;
      },
    },
  }
</script>

<style>
  .contain{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
  }
  .mt-header {
    background-color: #fedc23;
    font-size: 1em;
    color: black;
  }

  .shop-item {
    width: 100%;
    height: auto;
    font-size: 1em;
    background-color: white;
    border-bottom: 1px solid #9da0a4;
    padding:10px;
  }
  #shop-name {
    font-size: 1em;
    color: black;
  }
  #play-addr{
    font-size: .8em;
    color: black;
  }
  #play-time{
    font-size: .8em;
    color: black;
  }

</style>
