<template>
  <span class="more-icon"><em></em></span>
</template>
<script>
    export default{
        props: ['IconType','ActiveIcon'],
        data(){
            return{

            }
        }
    }
</script>
<style>
  .more-icon {
    display: inline-block;
    position: relative;
    overflow: hidden;
  }
  .more-icon em{
    display: block;
    background: #989898;
    position: absolute;
    left: 0;
  }
  .more-icon em {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
  }
  .more-icon.active  em{
    background: #fe5722;
  }

  @media (min-width: 320px) {
    .more-icon {
      width: 14px;
      height: 7px;
    }
    .more-icon em {
      width: 14px;
      height: 14px;
      top: -9px;
    }
  }
  @media (min-width: 414px) {
    .more-icon {
      width: 16px;
      height: 10px;
    }
    .more-icon em {
      width: 16px;
      height: 16px;
      top: -10px;
    }
  }
  @media (min-width: 640px) {
    .more-icon {
      width: 20px;
      height: 13px;
    }
    .more-icon em {
      width: 20px;
      height: 20px;
      top: -13px;
    }
  }
</style>
