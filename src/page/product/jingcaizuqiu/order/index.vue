<template>
  <div class="jczq_order page">
    <div class="header">
      <a class="head_btn add fl">添加/编辑赛事</a>
      <a class="head_btn clear fl">清空列表</a>
    </div>

    <ul class="order_list">
      <li class="first"></li>
      <li class="item"></li>
    </ul>

    <div class="foot">
      <div class="foot_top">
        <span class="foot_top_btn fl" @click="show_footMiddle = !show_footMiddle">
          投注方式
          <span class="redText">(必选)</span>
          <img src="./img/arrow_b.png" class="fr arrow" :style="show_footMiddle && 'transform: rotate(0);'">
        </span>

        <label class="bei fr">
          投
          <input type="tel" v-model="bei" class="input" max>
          倍
        </label>
      </div>
      <div class="foot_middle" :class="show_footMiddle && 'h22'">
        <div class="item fl" v-for="i in 8">
          <input class="radio" type="radio" :value="i" v-model="chuan">
          <div class="text">{{i}}串1</div>
        </div>
      </div>
      <div class="foot_bottom">
        10注<span class="redText">20</span>元
        <p class="c666">预测奖金（仅供参考）：191.62</p>
        <span class="submit redBg">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'jczq_order',
    data () {
      return {
        bei: 1,
        chuan: "",
        show_footMiddle: false,
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
