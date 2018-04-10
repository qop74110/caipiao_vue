<template>
  <div class="home page">
    <div class="banner">
      <Banener></Banener>
    </div>

    <div class="marquee">
      <Marquee></Marquee>
    </div>

    <div class="product_list">
      <ul class="product_ul clearFix">
        <li class="product_li fl" v-for="i in 12">
          <img :src="product_list[0].img" class="product_img">
          <p class="product_name">{{product_list[0].name}}</p>
          <p class="product_text">{{product_list[0].text}}</p>
        </li>
      </ul>
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
      return {
        product_list: [
          {
            img: "/static/img/test.png",
            name: "双色球",
            text: "奖池超7亿"
          },
        ],
      }
    },
    created(){

    },
    methods: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
