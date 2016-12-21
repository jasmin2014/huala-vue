<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <header-component :page-name="pageName" :search-box="searchbox" :location-address="LocationAddress" :show-middle="showMiddle"></header-component>
  <div class="sellerPage">
    <mt-loadmore :bottom-method="getLocation" :bottom-all-loaded="allLoaded" :auto-fill='false'>
      <section class="sellermess" v-for="s in mySellerList">
        <p class="shoppic">
          <img class="radiusp ic" v-bind:src="MimgUrl+s.content.imgUrl" />
        </p>
        <div class="shop-mess">
          <h3>{{s.content.name}}</h3>
          <p>营业时间：{{s.content.openTime}}--{{s.content.endTime}}</p>
        </div>
        <p class="distance">{{s.distance.value*1000 | toFixed}}m</p>
        <a href="javascript:void(0);" title="{{s.content.name}}" @click="gotoDetail(s.content.id)">{{s.content.name}}</a>
      </section>
    </mt-loadmore>
  </div>

</template>

<script>
  import HeaderComponent from '../../comp/common/HeaderComponent .vue';
  export default {
    components: {HeaderComponent},
    data () {
      return {
        activeId:"",
        searchbox: false,
        pageName: 'SellerList',
        showMiddle: true,
        LocationAddress : '',
        page : 1,
        mySellerList: [],
        allLoaded: false,
        MimgUrl:'http://wxtest.huala.com:8081/hlman-pic'
      }
    },
    ready(){
      this.getLocation();
    },
    methods: {
      getLocation(){
        var self = this;
        let http=this.$http;
        var gps = JSON.parse(sessionStorage.getItem("gps"));
        console.log("gps:");
        console.log(gps.address);
        if(gps == undefined || gps.address == undefined){
          this.LocationAddress = "定位中...";
          new BMap.Geolocation().getCurrentPosition(function(r){
            var _status = this.getStatus();
            console.log(r.point);
            if(_status == BMAP_STATUS_SUCCESS){
              http.jsonp('//api.map.baidu.com/geocoder/v2/?ak=zHNmFc3z0ho52KdH0cH9mDF5LRiulbx6&callback=?&location='+r.point.lat+','+r.point.lng+'&output=json&pois=0&callback=JSON_CALLBACK').then(function(result) {
                var _gps={
                  lat:result.body.result.location.lat,
                  lng:result.body.result.location.lng,
                  address:result.body.result.sematic_description
                }
                console.log(_gps);
                this.LocationAddress = _gps.address;
                console.log("LocationAddress:"+this.LocationAddress);
                sessionStorage.setItem('gps',_gps);
                self.getSellerList(_gps);
              },function (error) {
                console.log(error);
              })
            }
            else {
              alert('failed' + _status);
            }
          },{enableHighAccuracy: true})
        }else {
          this.LocationAddress = gps.address;
          alert(gps.address);
          self.getSellerList(gps);
        }
      },
      getSellerList(gps){
        var self = this;
        let http = this.$http;
        if (self.allLoaded)return;
        http.get('/v3/seller/list?address='+gps.address+'&lat='+gps.lat+'&lng='+gps.lng+'&page='+self.page+'&size=10').then(function (res) {
          //alert(res);
          let _body = res.body;
          if(_body.success){
            self.page += 1;
            if (_body.body.length <= 0)self.allLoaded = true;
            _body.body.forEach(function (r) {
              self.mySellerList.push(r);
            });
          };
        })
      },
      gotoDetail(sid){
        this.$router.go({path:'/seller-detail/'+sid});
      }
    }
  }
</script>
<style>

</style>
