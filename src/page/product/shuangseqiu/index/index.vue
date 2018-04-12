<template>
  <div class="shuangseqiu">
    <nav class="bar">
      <span class="fl back w10"></span>
      <span class="fl name" @click="show_play_type = !show_play_type; show_more = false">
          双色球
          <i class="arrow"></i>
        </span>
      <span class="fl more w10" @click.stop="show_more = !show_more; show_play_type = false"></span>
    </nav>

    <!--选择玩法-->
    <div class="playType _fog" v-show="show_play_type" @click.stop="show_play_type = false">
      <ul class="playTypeList">
        <li class="type fl" :class="play_type === 1 && 's'" @click="play_type = 1">标准选号</li>
        <li class="type fr" :class="play_type === 2 && 's'" @click="play_type = 2">胆拖选号</li>
      </ul>
    </div>

    <!--更多-->
    <div class="moreBox _fog" v-show="show_more" @click.stop="show_more = false">
      <ul class="moreList">
        <li class="arrow"></li>
        <li class="moreItem" @click="$router.push('random')">多期机选</li>
        <li class="moreItem" @click="show_text = !show_text">{{show_text ? "隐藏": "显示"}}遗漏</li>
        <li class="moreItem" @click="$router.push('exposition')">玩法说明</li>
      </ul>
    </div>

    <!--往期中奖号码-->
    <div class="history">
      <div class="his_list">

      </div>
      <div class="his_last">
        第2018033期 <span class="redText">03-25 19:30 截止</span>

        <span class="his_btn fr">更多<i class="his_arrow"></i></span>
      </div>
    </div>

    <!--标准玩法&胆拖玩法-->
    <div class="content" :class="show_text && 'show_text'">
      <!--标准玩法-->
      <div class="standard" v-show="play_type === 1">


        <!--机选-->
        <div class="random clearFix">

          <span class="fr _text">至少选择6个红球，1个蓝球</span>
        </div>

        <!--红球-->
        <div class="redBallBox ballBox clearFix">
          <div class="box fl" v-for="i in 33" :key="i">
            <div class="ball">{{ i < 10 ? "0" + i : i }}</div>
            <span class="text">123</span>
          </div>
        </div>
        <!--蓝球-->
        <div class="blueBallBox ballBox clearFix">
          <div class="box fl" v-for="i in 16" :key="i">
            <div class="ball">{{ i < 10 ? "0" + i : i }}</div>
            <span class="text">123</span>
          </div>
        </div>
      </div>
      <!--胆拖-->
      <div class="dantuo" v-show="play_type === 2">
        <div class="text">胆码，选择1至5个号码</div>
        <!--红球-->
        <div class="redBallBox ballBox clearFix">
          <div class="box fl" v-for="i in 33" :key="i">
            <div class="ball">{{ i < 10 ? "0" + i : i }}</div>
            <span class="text">123</span>
          </div>
        </div>

        <div class="text">拖码，选择2个号码</div>
        <div class="redBallBox ballBox clearFix">
          <div class="box fl" v-for="i in 33" :key="i">
            <div class="ball">{{ i < 10 ? "0" + i : i }}</div>
            <span class="text">123</span>
          </div>
        </div>
        <div class="text">篮球，可选1至16个号码</div>
        <!--蓝球-->
        <div class="blueBallBox ballBox clearFix">
          <div class="box fl" v-for="i in 16" :key="i">
            <div class="ball">{{ i < 10 ? "0" + i : i }}</div>
            <span class="text">123</span>
          </div>
        </div>
      </div>
    </div>

    <div class="foot">
      <div class="fl clear w16">清空</div>
      <div class="fl result">0 注 共<span class="redText">0元</span></div>
      <div class="fl submit w16">下一步</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shuangseqiu',
    data () {
      return {
        play_type: 1,                 //  2：胆拖；  1：标准
        show_play_type: false,
        show_more: false,
        show_text: false,

      }
    },
    created(){

    },
    methods: {
      getnum (rn, bn){

        if (rn < 6 || bn === 0) return 0;
        else if (rn === 6)return bn;

        let tempNum = 1;

        for (let i = 7; i <= rn; i++) {
          tempNum = tempNum * i;
        }

        for (let i = 2; i <= rn - 6; i++) {
          tempNum = tempNum / i;
        }

        tempNum = tempNum * bn;

        return tempNum;

      }
    },
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "index.less";
</style>
