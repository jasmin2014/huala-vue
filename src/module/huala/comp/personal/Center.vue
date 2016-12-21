<template>

</template>

<script>
    export default{
        components: {},
        props: ['SellerId'],
        data(){
            return {
              sid:''
            }
        },
        computed: {
          s:function () {
            this.sid = this.SellerId;
            console.log("sid:"+this.sid);
            return this.SellerId;
          }
        },
        watch: {
          "sid":function () {
          }
        },
        methods: {
          
        }
    }
</script>
<style>

</style>
