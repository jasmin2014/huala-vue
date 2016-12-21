<template>
    <div class="page-navbar">
        <mt-navbar class="page-part" :selected.sync="selected" :fixed="true">
            <mt-tab-item id="0">未审核</mt-tab-item>
            <mt-tab-item id="1">已审核</mt-tab-item>
        </mt-navbar>
        <mt-tab-container :active.sync="selected">
            <mt-tab-container-item id="0">
                <seller-list type='0'></seller-list>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
                <seller-list type='1'></seller-list>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
    <mt-actionsheet :actions="actions" :visible.sync="sheetVisible"></mt-actionsheet>
</template>

<script>
    import SellerList from './SellerList';
    export default {
        components: {SellerList},
        data () {
            return {
                popup: true,
                sheetVisible: false,
                selected: '0',
                actions: [{
                    name: '拍照',
                    method: function () {
                        console.log('taking photo');
                    }
                }, {
                    name: '从相册中选择',
                    method: this.openAlbum
                }]
            }
        },
        methods: {}
    }
</script>
<style>
    .mint-tab-container {
        top:45;
    }
</style>
