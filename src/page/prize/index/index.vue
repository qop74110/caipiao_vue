<template>
  <div class="prize page">
    <ul class="lists">
      <li class="li">
        <span class="name">双色球</span> <span class="time">第123456期 2018-3-21（周三）</span>
        <div class="num style1 clearFix">
          <span class="ball redBall fl">11</span>
          <span class="ball redBall fl">22</span>
          <span class="ball redBall fl">33</span>
          <span class="ball redBall fl">44</span>
          <span class="ball redBall fl">55</span>
          <span class="ball redBall fl">66</span>
          <span class="ball blueBall fl">77</span>
        </div>
      </li>
      <li class="li">
        <span class="name">竞猜足球</span> <span class="time">比赛日 2018-3-21</span>
        <div class="num style2 clearFix ">
          <div class="c clearFix green">
            <div class="fl football"></div>
            <div class="fl w30">科林蒂安</div>
            <div class="fl w20">2：0</div>
            <div class="fl w30">布拉干蒂</div>
          </div>
        </div>
      </li>
    </ul>


    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import {Tabbar} from "com";
  export default {
    name: 'prize',
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
