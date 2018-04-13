<template>
  <div class="random page">
    <div class="exposition">
      根据您指定的注数,每期系统将自动为您机选不同的号码 进行投注，快捷省心，追击大奖！
    </div>
    <div class="form">
      <div class="row">
        <span class="left fl">
          连<span class="em5"></span>续<span class="em5"></span>买:
        </span>
        <ul class="fl right">
          <li class="fl w16 bor_r" :class="qi === 5 && 's'" @click="qi = 5 ">5期</li>
          <li class="fl w16 bor_r" :class="qi === 10 && 's'" @click="qi = 10">10期</li>
          <li class="fl w16" :class="qi === 15 && 's'" @click="qi = 15">15期</li>
        </ul>
      </div>
      <div class="row">
        <span class="left fl">
          每期机选:
        </span>
        <XNumber class="right" name="zhushu" :_val="zhushu" h=".8" @on-change="setVal"></XNumber>
        <span class="right_text">注</span>
      </div>
      <div class="row">
        <span class="left fl">
          每<span class="em5"></span>期<span class="em5"></span>投:
        </span>
        <XNumber class="right" name="bei" :_val="bei" h=".8" @on-change="setVal"></XNumber>
        <span class="right_text">倍</span>
      </div>
      <div class="add_up">
        <span class="agree" :class="agree && 's'" @click="agree = !agree"></span>
        中奖累计
        <input v-if="agree" type="tel" class="money" v-model="money">
        <input v-else type="tel" class="money" v-model="money" disabled>
        元后停止
        <span class="help" @click="help"></span>
      </div>
    </div>
    <div class="foot">
      共10期 <span class="redText">20</span>元
      <span class="submit fr">确定</span>
    </div>
  </div>
</template>

<script>
  import {XNumber} from "com";
  export default {
    name: 'random',
    components: {
      XNumber
    },
    data () {
      return {
        zhushu: 1,              //  注数
        bei: 1,                 //  倍数
        money: 5000,            //  累计多少钱， 撤销订单
        agree: false,           //  true:同意累计玩法
        qi: 5,                  //  连买几期
      }
    },
    created(){

    },

    methods: {
      setVal(d){
        this[d.name] = d.val;
        console.log(this.bei)
      },
      help(){
        this.$vux.alert.show({
          content: '勾选后，当累计中奖金额大于您设定的金额后，后续的期次将被撤销，资金返还到您的账户中。如不勾选，系统一直帮您购买所有期次。',
          buttonext: "知道了"
        })
      },
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
