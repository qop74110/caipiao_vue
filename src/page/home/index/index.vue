<template>
  <div class="home page">
    <div class="banner">
      <Banener></Banener>
    </div>


    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import {Tabbar, Banener} from "com";
  export default {
    name: 'home',
    components: {Tabbar, Banener},
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
