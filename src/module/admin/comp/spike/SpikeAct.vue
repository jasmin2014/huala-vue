<template>
  <div>
    <mt-navbar class="page-part" :selected.sync="selected">
    <mt-tab-item id="0">秒杀商品</mt-tab-item>
    <mt-tab-item id="1">秒杀设置</mt-tab-item>
    </mt-navbar>
    <mt-tab-container :active.sync="selected">
    <mt-tab-container-item id="0">
      <list></list>
    </mt-tab-container-item>
    <mt-tab-container-item id="1">
      <setting></setting>
    </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>
<script>
  import List from './SecList.vue';
  import Setting from './Setting.vue'
export default{
  components:{List, Setting},
  data (){
    return {
      selected: '0',
      sheetVisible: false,
    }
  },
}
</script>
<style>

</style>
