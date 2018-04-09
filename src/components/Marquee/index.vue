<template>
  <div class="Marquee" :style="`height: ${height}rem; line-height: ${height}rem`">
    <ul class="ul" :style="li_style">
      <li class="li" v-for="(item, index) in list" :key="index">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Marquee',
    data () {
      return {
        li_style: '',
      }
    },
    props: {
      height: {
        type: Number,
        default: .813
      },
      list: {
        type: Array,
        default: () => [
          "恭喜！9410.00元竞彩足球奖金已被**02收入囊中",
          "恭喜！9410.00元竞彩足球奖金已被**02收入囊中",
          "恭喜！9410.00元竞彩足球奖金已被**02收入囊中",
        ]
      },
      tabTime: {
        type: Number,
        default: 2500,
      },
      scrollTime: {
        type: Number,
        default: 500
      }
    },
    created(){
      const len = this.list.length;
      if (len > 0) {
        let i = 1;
        const w = window.innerWidth / 10;
        const h = w * this.height;
        const _this = this;

        const transition = "transition:" + this.scrollTime + "ms;";
        this.li_style = transition;

        setInterval(() => {
          if (i < len) {
            const transform = "transform: translateY(" + -i * _this.height + "rem)";
            _this.li_style = transition + transform;
            i++;
//            if (i === len) setTimeout(() => {
//              _this.li_style = transition + "transform: translateY(0)";
//            }, _this.tabTime);
          } else {
            _this.li_style = '';
            i = 1;
          }
        }, this.tabTime)
      }


    },
    methods: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
