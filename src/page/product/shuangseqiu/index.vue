<template>
  <div class="shuangseqiu">
    <nav class="bar">
      <span class="fl back w10"></span>
      <span class="fl name">
          双色球
          <i class="arrow"></i>
        </span>
      <span class="fl more w10"></span>
    </nav>

    <div class="playType _fog hide">
      <ul class="playTypeList">
        <li class="type fl s">标准选号</li>
        <li class="type fr">胆拖选号</li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'shuangseqiu',
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
