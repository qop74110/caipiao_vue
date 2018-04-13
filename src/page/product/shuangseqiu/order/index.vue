<template>
  <div class="order page">
    <ul class="btns clearFix">
      <li class="btn fl btn_active">
        <img src="./img/add.png" alt="" class="btn_img">
        自选号码
      </li>
      <li class="btn fl btn_active">
        <img src="./img/add.png" alt="" class="btn_img">
        机选一注
      </li>
      <li class="btn fl btn_active">
        <img src="./img/clear.png" alt="" class="btn_img">
        清空列表
      </li>
    </ul>

    <div class="foot">
      <XNumber :val="qi" @on-change="change_qi"></XNumber>
    </div>
  </div>
</template>

<script>
  import {XNumber} from "com";
  export default {
    name: 'order',
    components: {XNumber},
    data () {
      return {
        qi: 1,
      }
    },
    created(){

    },
    methods: {
      change_qi(val){
        this.qi = val;
      }
    },

  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
