<template>
  <div class="order page">


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
        console.log(this.qi )
      }
    },

  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
