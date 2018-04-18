<template>
  <div class="jczq_index page">

    <XHead @setMore="setMore" @setOption="setOption" :active_more="show_more" :active_title="show_title_option">
      {{title_option_list[play_type]}}
    </XHead>

    <Bar :list="bar_list" v-model="bar_value"></Bar>
    <footer class="foot">
      <div class="fl clear"></div>
      <div class="fl text">
        <p class="changshu">已选<span class="redText">{{changshu}}</span>场</p>
        页面赔率仅供参考，请以出票赔率为准
      </div>
      <div class="fr submit redBg">确认</div>
    </footer>
    <Actionsheet v-model="show_more" @click_item="more_item" :list="more_list"></Actionsheet>
    <Actionsheet v-model="show_title_option" @click_item="title_item" :list="title_option_list"></Actionsheet>

  </div>
</template>

<script>
  import {XHead, Actionsheet, Bar} from "com";
  export default {
    name: 'jczq_index',
    components: {
      XHead,
      Actionsheet,
      Bar
    },
    data () {
      return {
        show_title_option: false,         //  true: 显示 xhead的标题选项
        show_more: false,                 //  true: 显示 xhead的更多
        more_list: {
          "1": "开奖信息",
          "2": "玩法说明"
        },
        title_option_list: {
          "1": "胜平负",
          "2": "让球胜平负",
          "3": "比分",
          "4": "总进球",
          "5": "半全场",
        },
        play_type: "1",
        bar_list: [
          "过关（至少选两场）",
          "单关（猜一场，奖金固定）"
        ],
        bar_value: 0,
        changshu: 0,
      }
    },
    created(){

    },
    methods: {
      setMore(val){
        this.show_more = val;
      },
      setOption(val){
        this.show_title_option = val;
      },
      more_item(val){
        if (val === "2") this.$router.push("/exposition?id=" + this.global.product_type['jingcaizuqiu']);
//        else if (val === "1") // todo 看看这里的开奖信息 是否与 中奖页面的一样在做
      },
      title_item(val){
        val > 0 && (this.play_type = val)
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
