<template>
  <div class="prize page">
    <ul class="lists">
      <li class="li" v-for="i in list" v-if="global.product_type[i.lotid]" :class="global.product_type[i.lotid]">
        <div v-if="global.product_type.shuangseqiu === i.lotid">
          <span class="name">{{i.name}}</span>
          <span class="time">第{{i.phase}}期 {{i.end_time}}（{{i.week}}）</span>
          <div class="num style1 clearFix">
            <span class="ball redBall fl">{{i.bonuscode[0] + i.bonuscode[1]}}</span>
            <span class="ball redBall fl">{{i.bonuscode[3] + i.bonuscode[4]}}</span>
            <span class="ball redBall fl">{{i.bonuscode[6] + i.bonuscode[7]}}</span>
            <span class="ball redBall fl">{{i.bonuscode[9] + i.bonuscode[10]}}</span>
            <span class="ball redBall fl">{{i.bonuscode[12] + i.bonuscode[13]}}</span>
            <span class="ball redBall fl">{{i.bonuscode[15] + i.bonuscode[16]}}</span>
            <span class="ball blueBall fl" >77</span>
          </div>
        </div>
        <div v-else-if="global.product_type.jingcaizuqiu === i.lotid">
          <span class="name">{{i.name}}</span>
          <span class="time">比赛日 {{i.daytime}}</span>
          <div class="num style2 clearFix ">
            <div class="c clearFix green">
              <div class="fl football"></div>
              <div class="fl w30">{{i.after}}</div>
              <div class="fl w20">{{i.result[0] + ' : ' + i.result[2]}}</div>
              <div class="fl w30">{{i.front}}</div>
            </div>
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
      return {
        list: [],
      }
    },
    created(){
      this.$vux.loading.show();
      this.global.ajax.call(this, "kj_list", {}, this.getList)
    },
    methods: {
      getList(d){
        this.$vux.loading.hide();
        if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
        else if (d.data && d.data.length > 0) {
          this.list = d.data;
        }
      },
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
