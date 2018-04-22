<template>
  <div class="jczq_order page" v-if="render_page">
    <div class="header">
      <a class="head_btn add fl">添加/编辑赛事</a>
      <a class="head_btn clear fl">清空列表</a>
    </div>

    <div class="order_list">
      <div class="first"></div>
      <!--胜平负-->
      <div v-if="play_type === 'FT001'" :class="play_type">
        <div v-for="(item, index) in index_list">
          <div class="item"
               v-for="(_item, _index) in item.match"
               v-if="checked[index][_index].length > 0"
          >
            <div class="left fl" @click="del_c(index, _index)"></div>

            <div class="right fl">

              <input type="checkbox"
                     class="checkbox checkbox1"
                     value="3"
                     v-model="c[index][_index]"
              >
              <div class="fl bor_r">
                <p class="hideText">{{_item.homeTeam}}</p>
                <span class="text">主胜 {{_item.odds[0].odds}}</span>
              </div>

              <input type="checkbox"
                     class="checkbox checkbox2"
                     value="1"
                     v-model="c[index][_index]"
              >
              <div class="fl bor_r">
                <p>VS</p>
                <span class="text">平 {{_item.odds[1].odds}}</span>
              </div>
              <input type="checkbox"
                     class="checkbox checkbox3"
                     value="0"
                     v-model="c[index][_index]"
              >
              <div class="fl">
                <p class="hideText">{{_item.awayTeam}}</p>
                <span class="text">客胜 {{_item.odds[2].odds}}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    <!--让球 胜平负-->
    <!--<div v-else-if="play_type === 'FT006'"></div>-->
    <!--&lt;!&ndash;比分&ndash;&gt;-->
    <!--<div v-else-if="play_type === 'FT002'"></div>-->
    <!--&lt;!&ndash;半全场&ndash;&gt;-->
    <!--<div v-else-if="play_type === 'FT004'"></div>-->
    <!--&lt;!&ndash;总进球&ndash;&gt;-->
    <!--<div v-else-if="play_type === 'FT003'"></div>-->

    <div class="foot">
      <div class="foot_top">
        <span class="foot_top_btn fl" @click="show_footMiddle_fun">
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
        <div class="item fl" v-for="i in changshu" v-if="i !== 1">
          <input class="radio" type="checkbox" :value="i" v-model="chuan">
          <div class="text">{{i}}串1</div>
        </div>
      </div>
      <div class="foot_bottom" @click="submit">
        {{zhushu}}注<span class="redText">{{money}}</span>元
        <p class="c666">预测奖金（仅供参考）：191.62</p>
        <span class="submit redBg">确定</span>
      </div>
    </div>

    <div class="footMiddle_fog" v-show="show_footMiddle" @click="show_footMiddle = false"></div>
  </div>
</template>

<script>
  import suanfa from "../suanfa";
  export default {
    name: 'jczq_order',
    data () {
      return {
        bei: '10',
        chuan: [],
        show_footMiddle: false,
        index_list: [],
        play_type: "",
        checked: [],
        c: [],
        render_page: false,                //  true: 开始渲染页面
        money: 0,
        zhushu: 0,
        changshu: 0,
      }
    },
    created(){
      this.getOrder();
    },
    methods: {
      getOrder(){
        const order = JSON.parse(localStorage.getItem("jczq_order") || "{}");

        if (JSON.stringify(order) !== "{}") {
          this.index_list = order.index_list || [];
          this.play_type = order.play_type;
          this.bar_value = order.bar_value || 1;
          this.checked = order.checked;
        }
        this.render_page = true;

        this.set_c();
        this.set_changshu();
      },
      set_c(){
        //        深复制
        let c = [];
        for (let i = 0; i < this.checked.length; i++) {
          c.push([]);
          for (let k = 0; k < this.checked[i].length; k++) {
            c[i].push(this.checked[i][k])
          }
        }
        this.c = c;
        for (let i = 0; i < this.checked.length; i++) {
          c.push([]);
          for (let k = 0; k < this.checked[i].length; k++) {
            c[i].push(this.checked[i][k])
          }
        }
        this.c = c;
      },
      set_changshu(){
        let changshu = 0;
        for (let i = 0; i < this.c.length; i++) {
          for (let k = 0; k < this.c[i].length; k++) {
            if (this.c[i][k].length === 0) continue;
            else changshu++;
          }
        }
        this.changshu = changshu;
      },
      set_zhushu(){
        let zhuArr = [];
        for (let i = 0; i < this.c.length; i++) {
          for (let _i = 0; _i < this.c[i].length; _i++) {
            if (this.c[i][_i].length === 0)continue;
            else {
              zhuArr.push([]);
              for (let _i_ = 0; _i_ < this.c[i][_i].length; _i_++) {
                zhuArr[zhuArr.length - 1].push(this.c[i][_i][_i_])
              }
            }
          }
        }

        let zhushu = 0;
        for (let i = 0; i < this.chuan.length; i++) {
          zhushu += suanfa(zhuArr, this.chuan[i])
        }
        this.zhushu = zhushu;
      },
      set_money(){
        this.money = this.zhushu * 2 * this.bei;
      },
      del_c(i, _i){
        for (let k = 0; i < this.checked[i][_i].length; k++) {
          this.checked[i][_i].pop();
        }
        this.c[i][_i] = [];
      },
      submit(){
        if (this.chuan.length === 0) this.global.toast.call(this, "请选择投注方式");
        else {
          const d = {
            title: [],
            message: {
              strand: this.chuan.join('串1,') + "串1",
              play_rules: this.play_type,
              number: this.zhushu,
              money: this.money,
              multiple: this.bei * 1
            }
          };
          for (let i = 0; i < this.c.length; i++) {
            for (let k = 0; k < this.c[i].length; k++) {
              if (this.c[i][k].length !== 0) {
//                let odd = [];
//                for (let index = 0; index < this.c[i][k].length; index++) {
//                  let v = this.c[i][k][index];
//                  odd.push(this.index_list[i].match[k].odds[v === "3" ? 0 : v === "1" ? 1 : 2].odds)
//                }

                d.title.push({
                  team: `${this.index_list[i].match[k].homeTeam}:${this.index_list[i].match[k].awayTeam}`,
//                  odd: odd.join(","),
                  type: this.c[i][k].join(","),
                  match: this.index_list[i].match[k].match_id,
                });
              }
            }
          }
          this.global.ajax.call(this, "jczq_pay", d, this.submit_CB)
        }
      },
      show_footMiddle_fun(){
        if (this.changshu < 2) this.global.toast.call(this, "至少选两场");
        else this.show_footMiddle = !this.show_footMiddle;
      },
      submit_CB(d){
        console.log(d)
      }
    },
    watch: {
      c(val){
        this.set_changshu();
        this.set_zhushu()
      },
      chuan(val){
        if (this.chuan.length > 0 && this.changshu > 1) this.set_zhushu();
        else this.zhushu = 0;
      },
      zhushu(val){
        this.set_money();
      },
      bei(val){
        if (val !== "") {
          if (!/^[0-9]+$/.test(this.bei)) this.global.toast.call(this, "请输入正整数");
          else if (this.bei > 99) {
            this.global.toast.call(this, "最大99倍");
            this.bei = '99';
          } else if (val < 1) {
            this.global.toast.call(this, "最小1倍");
            this.bei = '1';
          } else this.set_money();
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
