<template>
  <div class="jczq_index page" v-if="loading === 0">

    <XHead @setMore="setMore" @setOption="setOption" :active_more="show_more" :active_title="show_title_option">
      {{title_option_list[play_type]}}
    </XHead>
    <span class="shaixuan" @click="show_screen = true"></span>
    <!--赛事列表-->
    <div class="content">
      <div class="bar_box">
        <Bar :list="bar_list" v-model="bar_value" class="bar"></Bar>
      </div>
      <div class="jixuan">
        机选
      </div>
      <div v-show="index_list.length !== 0">
        <div class="type1 list" v-show="play_type === 'FT001'">
          <div class="item" v-for="(item, index) in index_list">
            <div class="date">{{`${item.date} ${item.week} ${item.count}比赛可选`}}</div>
            <div class="details" v-for="(_item,index) in item.match">
              <div class="left fl">
                <p>{{_item.league}}</p>
                <p>{{`周${_item.weekid} ${_item.teamid}`}}</p>
                <p>{{_item.endtime}}截止</p>
              </div>
              <div class="right fr">
                <div class="victory fl border_r">
                  <p class="redText">{{_item.homeTeam}}</p>
                  <p>主胜 {{_item.odds[0].odds}}</p>
                </div>
                <div class="ping fl border_r">
                  VS
                  <p>平 {{_item.odds[1].odds}}</p>
                </div>
                <div class="fail fl">
                  <p class="redText">{{_item.awayTeam}}</p>
                  <p>客胜 {{_item.odds[2].odds}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="type2 list" v-show="play_type === 'FT006'">
          <div class="item" v-for="(item, index) in index_list">
            <div class="date">{{`${item.date} ${item.week} ${item.count}比赛可选`}}</div>
            <div class="details" v-for="(_item,index) in item.match">
              <div class="left fl">
                <p>{{_item.league}}</p>
                <p>{{`周${_item.weekid} ${_item.teamid}`}}</p>
                <p>{{_item.endtime}}截止</p>
              </div>
              <div class="right fr">
                <div class="victory fl border_r">
                  <p class="redText">{{_item.homeTeam}}</p>
                  <p>主胜 {{_item.odds[0].odds}}</p>
                </div>
                <div class="ping fl border_r">
                  VS
                  <p>平 {{_item.odds[1].odds}}</p>
                </div>
                <div class="fail fl">
                  <p class="redText">{{_item.awayTeam}}</p>
                  <p>客胜 {{_item.odds[2].odds}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="type3 list" v-show="play_type === 'FT002'">比分</div>
        <div class="type4 list" v-show="play_type === 'FT003'">总进球</div>
        <div class="type5 list" v-show="play_type === 'FT004'">半全场</div>
      </div>
      <div class="noLit" v-show="index_list.length === 0"></div>
    </div>

    <footer class="foot">
      <div class="fl clear"></div>
      <div class="fl text">
        <p class="changshu">已选<span class="redText">{{changshu}}</span>场</p>
        页面赔率仅供参考，请以出票赔率为准
      </div>
      <div class="fr submit redBg">确认</div>
    </footer>
    <!--筛选-->
    <div class="screen" @click="show_screen = false" v-show="show_screen">
      <div class="screen_con">
        <div class="option">
          <div class="title"><span class="text">选择联赛</span></div>
        </div>
        <div class="checked">已选择<span class="redText">{{50}}</span>场比赛</div>
        <div class="btns">
          <div class="btn cancel fl">取消</div>
          <div class="btn confirm fl">确定</div>
        </div>
      </div>
    </div>
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
        title_option_list: {},
        play_type: "",
        bar_list: [
          "单关（猜一场，奖金固定）",
          "过关（至少选两场）",

        ],
        bar_value: 1,
        show_screen: false,
        index_list: [],
        changshu: 0,
        loading: 1,
        checked: [],
      }
    },
    created(){
      this.$vux.loading.show();
      this.global.ajax.call(this, "jczq_play_type", {}, this.getPlay_type)


    },
    methods: {
      getPlay_type(d){
        this.hideLoading();
        if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
        else if (d.data) {
          const obj = {};
          for (let i = 0; i < d.data.length; i++) {
            obj[d.data[i].value] = d.data[i].name
          }
          this.title_option_list = obj;
          this.play_type = d.data[0].value;


        }
      },
      getIndexList(){
        this.$vux.loading.show();
        this.global.ajax.call(this, "jczq_index_list", {
          pass_rules: this.bar_value,
          play_rules: this.play_type
        }, this.getIndexList_CB);

      },
      getIndexList_CB(d){
        this.$vux.loading.hide();
        if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
        else if (d.data) {
          this.index_list = d.data;
        }
      },
      hideLoading(){
        --this.loading === 0 && this.$vux.loading.hide();
      },
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
        val !== "-1" && (this.play_type = val)
      }
    },
    watch: {
      bar_value(val){
        this.getIndexList()
      },
      play_type(val){
        this.getIndexList();
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
