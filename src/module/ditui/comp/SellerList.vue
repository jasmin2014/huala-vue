<template>
    <mt-loadmore :bottom-method="getSellerList" :bottom-all-loaded="allLoaded" :auto-fill='false'>
        <div class="card custom" v-for="i in sellerList">
            <div class="card-content">
                <img class="card-header custom" v-lazy='imgUrl+i.sellerUrl+"?s=220x220"' height="80" width="80">
                <p class="custom-date custom">入驻时间:{{i.enterTime}}</p>
                <p class="custom-date custom">申请时间:{{i.applyTime}}</p>
                <p class="custom-name custom">{{i.sellerName}}</p>
            </div>
            <div class="card-footer custom">
                <!--<span> 查看详情</span>-->
                <span @click="choosePis(i)"> 查看详情</span>
            </div>
        </div>
    </mt-loadmore>-
    <mt-popup :visible.sync="popue" position="right" class="mint-popup-3">
        <mt-header fixed title="固定在顶部">
            <mt-button icon="back" slot="left" @click="popue = false">返回</mt-button>
        </mt-header>
        <mt-swipe class="popup-swipe" :auto="0">
            <mt-swipe-item v-for="img in seller.materialUrls">
                <img v-lazy="imgUrl+img" width="100%" height="100%">
            </mt-swipe-item>
        </mt-swipe>
        <input id="file" type="file" @change="onFileChange" accept="image/*" style="display:none">
        <mt-button @click="sheetVisible=true" size="large" type="danger">上传</mt-button>
    </mt-popup>
    <mt-actionsheet :actions="actions" :visible.sync="sheetVisible"></mt-actionsheet>
</template>

<script>
    export default{
        components: {},
        props: {
            type: 0//请求参数类型，0没审核1已审核
        },
        data(){
            return {
                popue: false,
                sheetVisible: false,
                page: 1,
                imgUrl: ImgUrl,
                sellerList: [],
                allLoaded: false,
                seller: {},
                actions: [{
                    name: '拍照',
                    method: function () {
                        let f = document.getElementById("file");
                        f.setAttribute('accept', "image/*")
                        f.setAttribute('capture', 'camera');
                        f.click();
                    }
                }, {
                    name: '从相册中选择',
                    method: function () {
                        let f = document.getElementById("file");
                        f.removeAttribute('accept')
                        f.removeAttribute('capture')
                        f.click();
                    }
                }]
            }
        },
        ready(){
            this.getSellerList();
        },
        methods: {
            //获取店铺列表信息
            getSellerList(id){//id为loadmore元素的id，防止同一页面有多个loadmore组件引起的干扰
                let self = this;
                if (self.allLoaded)return;
                this.$http.post("/ditui/check-list?page=" + self.page + "&size=10&type=" + this.type)
                        .then(function (response) {
                            var a = typeof response.data;
                            var j = (a === 'object' ? response.data : JSON.parse(response.data.toString()));
                            if (j.success) {
                                self.page += 1;
                                if (j.rows.length <= 0)self.allLoaded = true;
                                j.rows.forEach(function (res) {
                                    if (!res.materialUrls) {
                                        res.materialUrls = []
                                    }
                                    self.sellerList.push(res);
                                })
                            } else {
                                alert(j.message);
                            }
                            this.$broadcast('onBottomLoaded', id);
                        })
            },
            choosePis(seller){
                this.seller = seller;
                this.popue = true;
            },
            onFileChange(e) {
                console.log(e);
                let vm = this;
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return;
                var file = files[0];
                var reader = new FileReader();
                let maxSize = 200 * 1024;//200KB
                reader.onload = function (e) {
                    var com_rate = 1;//压缩比率
                    if ((maxSize !== false) && (file.size > maxSize)) {
                        com_rate = maxSize / file.size;
                    }
                    console.log(file.result)
                    uploader.compress(e.target.result, com_rate, function (src_data) {
                        src_data.filename = src_data.name = file.name;
                        console.log(file)
                        console.log(src_data)
                        uploader.upload(ApiUrl + "/ditui/upload?sellerId=" + vm.seller.sellerId, src_data, function (data) {
                            vm.seller.materialUrls.push(data.body)
                        });
                    });
                }
                reader.readAsDataURL(file);
            }
        }
    }
</script>
<style>
    .mint-popup-3 {
        width: 100%;
        height: 100%;
        background-color: #f0f0f0;
    }

    .popup-swipe {
        height: 90%;
        color: #fff;
        font-size: 30px;
        text-align: center;
    }

    /* .custom { background:#f5f5f5; }
    .custom * {margin:0;padding:0;} */
    .card.custom {
        background: #fff;
        margin-top: 15px;
    }

    .card:first-child.custom {
        margin-top: 8px;
    }

    .card-header.custom {
        width: 100%;
        height: auto;
        max-height: 120px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .custom-date.custom, .custom-name.custom {
        font-size: 85%;
        padding: 0 8px;
        margin: 0;
    }

    .custom-date.custom {
        color: #999;
        line-height: 2em;
    }

    .custom-name.custom {
        line-height: 2.4em;
    }

    .card-footer.custom {
        font-size: 85%;
        border-top: 1px solid #f5f5f5;
        line-height: 3em;
        text-align: center;
        margin: 8px 0 0 0;
    }

</style>
