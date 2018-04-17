<template>
  <div class="nofund">
    <img src="./img/a.png" alt="" class="img">
    <img src="./img/text.jpeg" alt="" class="img">

    <div class="btns clearFix">
      <div class="btn fl" @click="$router.push('home')"></div>
      <div class="btn fl" @click="$router.back()"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'nofund',
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
