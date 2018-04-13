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

    <ul class="list">
      <li class="border"></li>
      <li class="item clearFix" v-for="i in 10">
        <i class="fl del"></i>
        <span class="fl balls hideText">
          <span class="red" v-for="i in balls[0].red">{{i}} </span>
          <br>
          <span class="blue" v-for="i in balls[0].blue">{{i}} </span>
          <br>
          <span class="zhushi">{{`${balls[0].type} ${balls[0].zhu}注${balls[0].money}元`}}</span>
        </span>
      </li>
    </ul>

    <div class="foot">
      <div class="set clearFix">
        <div class="fl setItem">
          <span class="setText">追</span>
          <XNumber input_w="1.6" :val="qi" name="qi" h=".6" @on-change="setVal"></XNumber>
          <span class="setText">期</span>
        </div>

        <div class="fl setItem">
          <span class="setText">投</span>
          <XNumber input_w="1.6" :val="bei" name="bei" h=".6" @on-change="setVal"></XNumber>
          <span class="setText">倍</span>
        </div>
      </div>
      <div class="abstract">
        2注1期1倍 共<span class="redText">4</span>元
        <div class="submit redBg btn_active">付款</div>
      </div>
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
        bei: 1,
        balls: [
          {
            red: ["34", "34", "34", '34', '34', '34', '34'],
            blue: ["34", "34", "34", '34'],
            money: 2,
            type: "单式",
            zhu:1,
          }
        ]
      }
    },
    created(){

    },
    methods: {
      setVal(d){
        this[d.name] = d.val;
      }
    },

  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
