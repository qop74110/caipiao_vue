<template>
  <div class="home page">
    home/index

    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import {Tabbar} from "com";
  export default {
    name: 'home',
    components: {Tabbar},
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
