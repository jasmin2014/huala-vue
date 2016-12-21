<template>
  <section class="oitem">
    <p style="display:none;">{{s}}</p>
    <h3>
      <span class="ordersn">订单编号：{{oInfo.orderSn}}</span>
      <span class="greenbg ocomplete">{{oInfo.orderStatusStr}}</span>
      <span class="redbg opaytype">{{oInfo.payType}}</span>
    </h3>
    <div class="oinfo oinfo02">
      <p class="clear">
        <label>店铺名称：</label>
        <span class="ovalue osname">{{oInfo.sellerName}}
          <span class="bluebg">{{oInfo.shippingTypeStr}}</span>
          <span class="yellowbg">{{oInfo.orderTypeStr}}</span>
        </span>
      </p>
      <p class="clear">
        <label>收货人：</label>
        <span class="ovalue">{{oInfo.consignee}}</span>
      </p>
      <p class="clear">
        <label>收货人手机号：</label>
        <span class="ovalue">{{oInfo.mobile}}</span>
      </p>
      <p class="clear">
        <label>收货人地址：</label>
        <span class="ovalue">{{oInfo.address}}</span>
      </p>
      <p class="clear">
        <label>商品金额：</label>
        <span class="ovalue">{{oInfo.goodAmount/100}}元</span>
      </p>
      <p class="clear">
        <label>配送费用：</label>
        <span class="ovalue">{{oInfo.shippingAmount/100}}元</span>
      </p>
      <p class="clear">
        <label>订单金额：</label>
        <span class="ovalue">{{oInfo.orderAmount/100}}元</span>
      </p>
      <p class="clear">
        <label>支付金额：</label>
        <span class="ovalue">{{oInfo.payAmount/100}}元</span>
      </p>
      <p class="clear">
        <label>下单时间：</label>
        <span class="ovalue">{{ new Date(oInfo.addTime).toLocaleString() }}</span>
      </p>
      <p class="clear">
        <label>预约时间：</label>
        <span class="ovalue">{{ oInfo.bestTime }}</span>
      </p>
      <p class="clear">
        <label>付款时间：</label>
        <span class="ovalue">{{ oInfo.payTime }}</span>
      </p>
      <p class="clear">
        <label>完成时间：</label>
        <span class="ovalue">{{ new Date(oInfo.shippingTime).toLocaleString() }}</span>
      </p>
    </div>
  </section>
  <section class="oitem">
    <h3>
      <span class="ordersn">结算信息 {{orderBonus.addTime}}</span>
    </h3>
    <div class="oinfo oinfo02">
      <p class="clear">
        <label>订单金额：</label>
        <span class="ovalue osname">{{orderBonus.orderAmount/100}}</span>
      </p>
      <p class="clear">
        <label>商品总金额：</label>
        <span class="ovalue">{{orderBonus.goodsAmount/100}}</span>
      </p>
      <p class="clear">
        <label>运费金额：</label>
        <span class="ovalue">{{orderBonus.shippingAmount/100}}</span>
      </p>
      <p class="clear">
        <label>付款金额：</label>
        <span class="ovalue">{{orderBonus.payAmount/100}}</span>
      </p>
      <p class="clear">
        <label>自营商品总金额：</label>
        <span class="ovalue">{{orderBonus.selfGoodsAmount/100}}元</span>
      </p>
      <p class="clear">
        <label>超市销售总金额：</label>
        <span class="ovalue">{{orderBonus.marketGoodsSaleAmount/100}}元</span>
      </p>
      <p class="clear">
        <label>超市进货总金额：</label>
        <span class="ovalue">{{orderBonus.marketGoodsRecAmount/100}}元</span>
      </p>
      <p class="clear">
        <label>自营商品商家提成例：</label>
        <span class="ovalue">{{orderBonus.selfGoodsBonus/100}}元</span>
      </p>
      <p class="clear">
        <label>超市利润分成比例：</label>
        <span class="ovalue">{{orderBonus.marketGoodsBonus/100}}元</span>
      </p>
      <p class="clear">
        <label>店铺运费优惠金额：</label>
        <span class="ovalue">{{ orderBonus.selfShippingCouponAmount/100 }}元</span>
      </p>
      <p class="clear">
        <label>平台运费优惠：</label>
        <span class="ovalue">{{ orderBonus.hualaShippingCouponAmount/100 }}元</span>
      </p>
      <p class="clear">
        <label>店铺优惠金额：</label>
        <span class="ovalue">{{ orderBonus.selfCouponAmount/100 }}元</span>
      </p>
      <p class="clear">
        <label>平台优惠金额：</label>
        <span class="ovalue">{{ orderBonus.hualaCouponAmount/100 }}元</span>
      </p>
      <p class="clear">
        <label>商户收入金额：</label>
        <span class="ovalue">{{ orderBonus.withdrawAmount/100 }}元</span>
      </p>
      <p class="clear">
        <label>平台收入金额：</label>
        <span class="ovalue">{{ orderBonus.hualaAmount/100 }}元</span>
      </p>
    </div>
  </section>
  <section class="oitem">
    <h3>
      <span class="ordersn">商品信息</span>
    </h3>
    <div class="oinfo oinfo02 ogood" v-for="g in orderGoods">
      <p class="clear">
        <label>商品名称：</label>
        <span class="ovalue osname">{{g.goodsName}}</span>
      </p>
      <p class="clear">
        <label>供应商名称：</label>
        <span class="ovalue">{{g.supplierName}}</span>
      </p>
      <p class="clear">
        <label>原价/销售价格：</label>
        <span class="ovalue">{{g.recPrice/100}}元/{{g.salePrice/100}}元</span>
      </p>
      <p class="clear">
        <label>状态：</label>
        <span class="ovalue">{{g.orderGoodsStatusStr}}元</span>
      </p>
    </div>
  </section>
  <section class="oitem">
    <h3>
      <span class="ordersn">优惠信息</span>
    </h3>
    <div class="oinfo oinfo02 ogood" v-for="oc in orderCoupon">
      <p class="clear">
        <label>优惠名称：</label>
        <span class="ovalue osname">{{oc.name}}</span>
      </p>
      <p class="clear">
        <label>优惠金额：</label>
        <span class="ovalue">{{oc.price/100}}元</span>
      </p>
      <p class="clear">
        <label>平台承担：</label>
        <span class="ovalue">{{oc.platformPrice/100}}元</span>
      </p>
      <p class="clear">
        <label>数量/类型：</label>
        <span class="ovalue">{{oc.num}}/{{ oc.type | discount}}</span>
      </p>
    </div>
  </section>
</template>

<script>
    export default{
        components: {},
        props: ['oInfo', 'orderId'],
        data(){
            return {
              orderBonus: {},
              orderGoods: [],
              orderCoupon: [],
              oid:''
            }
        },
        computed: {
          s:function(){
            this.oid = this.orderId;
            return this.orderId;
          }
        },
        watch:{
          "oid":function(){
            console.log(this.orderId);
            this.getOrderPay();
          }
        },
        filters: {
          discount: function (value) {
            if(value=='1'||value=='2')
              return '红包';
            else
              return '免运费'
          }
        },
        methods: {
          getOrderPay(){
            let self = this;
            this.$http.get("/order/order-goods-list?orderId="+this.orderId)
              .then(function (i) {
                var j=i.body;
                if(j.success){
                  self.orderBonus = j.body.orderBonus;
                  if(j.body.orderGoods.length>0){
                    j.body.orderGoods.forEach(function (res) {
                      self.orderGoods.push(res);
                    });
                  };
                  if(j.body.orderCoupon.length>0){
                    j.body.orderCoupon.forEach(function (res) {
                      self.orderCoupon.push(res);
                    });
                  };
                }else{
                  alert(j.message);
                };
              })
          }
        }
    }
</script>
<style>

</style>
