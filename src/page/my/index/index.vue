<template>
  <div class="my page">
    <header class="header">
      <div class="service"></div>
      <img class="header_img fl" src="./img/header_img.png">
      <span class="user_tel" v-if="!token" @click="$router.push('login')">登录/注册</span>
      <span class="user_tel" v-else >{{token}}</span>
    </header>

    <ul class="money clearFix">
      <li class="fl">
        充值
        <span class="fr line"></span>
      </li>
      <li class="fl middle">
        <p class="num">0.00</p>
        <span class="balance">余额</span>
      </li>
      <li class="fl">
        <span class="flet line"></span>
        提现
      </li>
    </ul>

    <ul class="order clearFix">
      <li class="fl" @click="open('')">
        <img class="order_img" src="./img/order1.png" alt="">
        <p class="order_text">全部订单</p>
      </li>
      <li class="fl" @click="open('')">
        <img class="order_img" src="./img/order2.png" alt="">
        <p class="order_text">追号订单</p>
      </li>
      <li class="fl" @click="open('')">
        <img class="order_img" src="./img/order3.png" alt="">
        <p class="order_text">中奖订单</p>
      </li>
      <li class="fl" @click="open('')">
        <img class="order_img" src="./img/order4.png" alt="">
        <p class="order_text">待开奖订单</p>
      </li>
    </ul>

    <ul class="lists">
      <li class="li">
        <img class="lists_img" src="./img/l1.png">
        我的红包
      </li>
      <li class="li">
        <img class="lists_img" src="./img/l2.png">
        分享给朋友
      </li>
      <li class="li">
        <img class="lists_img" src="./img/l3.png">
        设置
      </li>
    </ul>


    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import {Tabbar} from "com";
  export default {
    name: 'my',
    components: {Tabbar},
    data () {
      return {
          token: this.global.cookie.get("token"),
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
