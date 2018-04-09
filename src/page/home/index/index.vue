<template>
  <div class="home page">
    <div class="banner">
      <Banener></Banener>
    </div>

    <div class="marquee">
      <Marquee></Marquee>
    </div>


    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import {Tabbar, Banener, Marquee} from "com";
  export default {
    name: 'home',
    components: {Tabbar, Banener, Marquee},
    data () {
      return {}
    },
    created(){

    },
    methods: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
