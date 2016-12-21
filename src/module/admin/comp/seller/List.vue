<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="sellercontent clear">
    <div class="selectleft">
      <div class="select">
        <p @click="hideSelect=hideSelect?false:true;">{{selectedName}}<span><i></i></span></p>
        <div class="option" v-bind:class="{'hide' : hideSelect}">
          <div v-for="s in options" @click="selectKeyType(s)">{{s.name}}</div>
        </div>
      </div>
    </div>
    <div class="searchright">
      <input type="search" placeholder="搜索" v-model="keyword" @keyup.13="SearchResultList()"/>
    </div>
  </div>
  <div class="selleritems">
    <div class="itemlabel clear">
      <span class="aligncenter">店铺ID</span>
      <span class="alignleft">店铺名称</span>
      <span></span>
    </div>
    <div class="sitemlist">
      <mt-loadmore :bottom-method="getSellerList" :bottom-all-loaded="allLoaded" :auto-fill='false'>
        <div class="itemlabel clear" v-for="i in sellerList">
          <span class="aligncenter">{{i.id}}</span>
          <span class="alignleft">{{i.name}}</span>
          <span v-if="pageName=='sellerAuth'"><mt-button icon="more" slot="right" @click="popupClick(i)"></mt-button></span>
          <span v-if="pageName=='sellerDetail'"><mt-button icon="more" slot="right" @click="popupClick(i)"></mt-button></span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  export default{
    components: {},
    props: ["pageName",'sellerStatus'],
    data(){
      return {
        page: 1,
        keyword: '',
        sellerList: [],
        allLoaded: false,
        hideSelect: true,
        options: [{"value": "0", "name": "所有"}, {"value": "1", "name": "所属人"}],
        selectedValue: '0',
        selectedName: '所有'
      }
    },
    ready(){
      this.getSellerList();
    },
    methods: {
      init(){
        this.page = 1;
        this.sellerList = [];
        this.allLoaded = false;
      },
      SearchResultList(){
        this.init();
        this.getSellerList();
      },
      selectKeyType(s){
        this.selectedValue = s.value;
        this.selectedName = s.name;
        this.hideSelect = true;
      },
      //获取店铺列表信息
      getSellerList(id){
        let self = this;
        if (self.allLoaded)return;
        this.$http.get("/seller/seller-list?key=" + this.keyword + "&page=" + self.page + "&size=10&sellerId=&status="+self.sellerStatus+"&keyType=" + this.selectedValue)
          .then(function (i) {
            var j = i.body;
            if (j.success) {
              self.page += 1;
              if (j.rows.length <= 0)self.allLoaded = true;
              j.rows.forEach(function (res) {
                self.sellerList.push(res);
              })
            } else {
              alert(j.message);
            }
          });
      },
      popupClick(s){
        if(this.pageName==="sellerAuth"){
          this.$router.go({path: '/seller-auth/shop-auth/' + s.id});
        }else if(this.pageName==="sellerDetail"){
          this.$router.go({path: '/seller-detail/seller-detail-info/' + s.id});
        }

      }
    }
  }
</script>
<style>
  .sellercontent {
    margin-top: 40px;
    height: 3em;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 3%;
  }

  .selectleft {
    width: 22%;
    float: left;
    height: 2.2em;
    padding: .4em 0 0 0;
    background: #fff;
  }

  .selectleft select {
    width: 100%;
    height: 100%;
  }

  .searchright {
    width: 73%;
    float: right;
    height: 2.5em;
    line-height: 2.5em;
    padding: .4em 0 0 0;
    overflow: hidden;
  }

  .searchright > input::-webkit-input-placeholder {
    text-align: center;
  }

  .searchright > input:-ms-input-placeholder {
    text-align: center;
  }

  .searchright > input {
    width: 100%;
    height: 100%;
    border: 1px solid #aaa;
    font-family: "Microsoft Yahei";
    padding-left: .8em;
  }

  .itemlabel {
    height: 3em;
    line-height: 3em;
    font-size: 90%;
    border-bottom: 1px solid #e5e5e5;
  }

  .sitemlist .itemlabel:nth-child(2n-1){
    background: #f5f5f5;
  }

  .itemlabel > span {
    float: left;
    display: inline-block;
  }

  .itemlabel span:first-child {
    width: 24%;
    text-align: center;
  }

  .itemlabel span:nth-child(2) {
    width: 55%;
    height: 3em;
    padding-left: 1em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-text-overflow: ellipsis;
  }

  .itemlabel span:nth-child(3) {
    width: 16%;
  }

  .sitemlist .mint-button--normal {
    width: 2.2em;
    line-height: 2.2em;
    padding: 0;
    background: none;
    box-shadow: none;
    display: block;
    margin: 0 auto;
  }

</style>
