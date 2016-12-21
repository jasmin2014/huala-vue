<template>
  <section class="oitem">
    <p style="display:none;">{{s}}</p>
    <h3>
      <span class="ordersn">订单日志</span>
    </h3>
    <div class="oinfo oinfo02 ogood" v-for="l in logList">
      <p class="clear">
        <label>操作时间：</label>
        <span class="ovalue">{{l.addTime}}</span>
      </p>
      <p class="clear">
        <label>操作人：</label>
        <span class="ovalue">{{l.optName}}</span>
      </p>
      <p class="clear">
        <label>操作状态：</label>
        <span class="ovalue">{{l.orderStatusStr}}</span>
      </p>
    </div>
  </section>
</template>

<script>
    export default{
        components: {},
        props: ['orderId'],
        data(){
            return {
              logList: [],
              oid:''
            }
        },
        computed: {
          s:function () {
            this.oid = this.orderId;
            console.log("oid:"+this.oid);
            return this.orderId;
          }
        },
        watch: {
          "oid":function () {
            console.log("orderid:"+this.orderId);
            this.getLogList();
          }
        },
        methods: {
          getLogList(){
            let self = this;
            this.$http.get("/order/order-log-list?orderId=" + this.orderId)
              .then(function (i) {
                console.log(i);
                if (i.body.length > 0) {
                  i.body.forEach(function (res) {
                    self.logList.push(res);
                  });
                }
              })
          }
        }
    }
</script>
<style>

</style>
