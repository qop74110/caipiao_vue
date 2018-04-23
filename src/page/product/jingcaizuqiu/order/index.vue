<template>
  <div class="jczq_order page" v-if="render_page">
    <div class="header">
      <a class="head_btn add fl" @click="set_order">添加/编辑赛事</a>
      <a class="head_btn clear fl" @click="del_order">清空列表</a>
    </div>

    <div class="order_list">
      <div class="first"></div>
      <!--胜平负 && 让球胜平负-->
      <div v-if="play_type === 'FT001' || play_type === 'FT006'" class="type1">
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

      <!--比分 & 半全场 & 总进球-->
      <div v-else-if="play_type === 'FT002' || play_type === 'FT004' ||  play_type === 'FT003'" class="type2">
        <div v-for="(item, index) in index_list">
          <div class="item"
               v-for="(_item, _index) in item.match"
               v-if="checked[index][_index].length > 0"
          >
            <div class="left fl" @click="del_c(index, _index)"></div>

            <div class="right fl">
              <div class="right_top">
                <span class="fl hideText">{{_item.homeTeam}}</span>
                <span class="fl">VS</span>
                <span class="fl hideText">{{_item.awayTeam}}</span>
              </div>
              <div class="right_bottom" @click="show_popup_option(_item, index, _index)">
                <span v-if="c[index][_index].length === 0">点击选择</span>
                <div v-else class="redBg hideText">
                  <span v-for="_i in c[index][_index]" class="whiteText">{{_i}} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="foot">
      <div class="foot_top">
        <span class="foot_top_btn fl" @click="show_footMiddle_fun">
          投注方式
          <span class="redText">(必选)</span>
          <img src="./img/arrow_b.png" class="fr arrow" :style="show_footMiddle && 'transform: rotate(0);'">
        </span>

        <label class="bei fr">
          投
          <input type="tel" v-model="bei" class="input" @blur="set_bei">
          倍
        </label>
      </div>
      <div class="foot_middle" :class="show_footMiddle && 'h22'">
        <div class="item fl" v-for="i in maxChuan" v-if="i !== 1 && i <= changshu">
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

    <div class="popup" v-if="show_popup">
      <div class="popup_box" :class="play_type !== 'FT002' ? 'h55': 'h100'">
        <div class="popup_title">{{`${popup_data.homeTeam } VS ${popup_data.awayTeam}`}}</div>
        <!--比分-->
        <div class="popup_content FT002" v-if="play_type === 'FT002'">
          <div class="whiteBg">
            <div class="left fl redBg">胜</div>
            <div class="right fl">
              <div class="btn fl" v-for="(item,index) in popup_data.odds[0]">
                <input class="checkbox" type="checkbox" :value="item.name"
                       v-model="popup_c">
                <div>
                  {{item.name}}
                  <p class="c666">{{item.odds}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="whiteBg ping ">
            <div class="left fl blueBg">平</div>
            <div class="right fl">
              <div class="btn fl" v-for="(item,index) in popup_data.odds[1]">
                <input class="checkbox" type="checkbox" :value="item.name"
                       v-model="popup_c">
                <div>
                  {{item.name}}
                  <p class="c666">{{item.odds}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="whiteBg">
            <div class="left fl greenBg">负</div>
            <div class="right fl">
              <div class="btn fl" v-for="(item,index) in popup_data.odds[2]">
                <input class="checkbox" type="checkbox" :value="item.name"
                       v-model="popup_c">
                <div>
                  {{item.name}}
                  <p class="c666">{{item.odds}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--半全场-->
        <div class="popup_content FT004 whiteBg" v-else-if="play_type === 'FT004'">
          <div class="left fl">半全场</div>
          <div class="right fl">
            <div class="btn fl" v-for="(item,index) in popup_data.odds">
              <input class="checkbox" type="checkbox" :value="item.name"
                     v-model="popup_c">
              <div>
                {{item.name}}
                <p class="c666">{{item.odds}}</p>
              </div>
            </div>
          </div>
        </div>
        <!--总进球-->
        <div class="popup_content FT003 whiteBg" v-else-if="play_type === 'FT003'">
          <div class="left fl">总进球</div>
          <div class="right fl">
            <div class="btn fl" v-for="(item,index) in popup_data.odds">
              <input class="checkbox" type="checkbox" :value="item.name"
                     v-model="popup_c">
              <div>
                {{item.name}}
                <p class="c666">{{item.odds}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="popup_btns" @click="show_popup = false">
          <div class="popup_btn fl redBg whiteText" @click="popup_confirm">确认</div>
          <div class="popup_btn fl whiteBg">取消</div>
        </div>
      </div>
    </div>
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
        bar_value: 1,
        zhushu: 0,
        changshu: 0,
        maxChuan: 0,
        popup_data: {},
        show_popup: false,
        popup_c: []
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
          this.bar_value = order.bar_value;
          this.checked = order.checked;
        }
        let maxChan = 8;
        if (this.play_type === "FT004" || this.play_type === "FT002") maxChan = 4;
        else if (this.play_type === "FT003") maxChan = 6;
        this.maxChuan = maxChan;

        this.render_page = true;

        this.set_c();
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

      },
      set_changshu(){
        let changshu = 0;
        for (let i = 0; i < this.c.length; i++) {
          for (let k = 0; k < this.c[i].length; k++) {
            if (this.c[i][k].length === 0) continue;
            else {
              changshu++;
            }
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
        this.zhushu = zhushu || 0;
      },
      set_money(){
        this.money = this.zhushu * 2 * this.bei || 0;
      },
      set_bei(){
        if (this.bei === "") this.bei = "1";
      },
      del_c(i, _i){
        for (let k = 0; i < this.checked[i][_i].length; k++) {
          this.checked[i][_i].pop();
        }
        this.c[i][_i] = [];

        const data = {
          index_list: this.index_list,
          checked: this.checked,
          play_type: this.play_type,
          bar_value: this.bar_value,
        };
        localStorage.setItem("jczq_order", JSON.stringify(data));

      },
      del_order(){
        const _this = this;
        this.$vux.confirm.show({
          content: '确定清空投注内容',
          onConfirm () {
            for (let i = 0; i < _this.checked.length; i++) {
              for (let k = 0; k < _this.checked[i].length; k++) {
                if (_this.checked[i][k].length !== 0) _this.del_c(i, k)
              }
            }
            localStorage.clear();
          }
        })
      },
      set_order(){
        const d = {
          index_list: this.index_list,
          checked: this.c,
          play_type: this.play_type,
          bar_value: this.bar_value,
        };
        localStorage.setItem("jczq_order", JSON.stringify(d));
        localStorage.setItem("jczq_setOrder", "1");
        this.$router.back();
      },
      show_footMiddle_fun(){
        if (this.changshu < 2) this.global.toast.call(this, "至少选两场");
        else this.show_footMiddle = !this.show_footMiddle;
      },
      show_popup_option(data, i, k){
        data.index = i;
        data._index = k;
        this.popup_data = data;
        this.popup_c = this.c[i][k].concat();
        this.show_popup = true;
      },
      popup_confirm(){
        this.c[this.popup_data.index][this.popup_data._index] = this.popup_c.concat();
      },
      submit(){
        if (this.chuan.length === 0) this.global.toast.call(this, "请选择投注方式");
        else if (this.money === 0) console.log("money = 0");
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

                let type = this.c[i][k].join(",");
                let pt = this.play_type;
                if (pt === "FT002") {
                  type = type.replace(/:/g, '');
                  type = type.replace(/胜其它/g, '90');
                  type = type.replace(/平其它/g, '99');
                  type = type.replace(/负其它/g, '09');
                } else if (pt === "FT004") {
                  type = type.replace(/负/g, '0');
                  type = type.replace(/平/g, '1');
                  type = type.replace(/胜/g, '3');
                } else if (pt === "FT003") {
                  type = type.replace(/\+/g, '')
                }

                d.title.push({
                  team: `${this.index_list[i].match[k].homeTeam}:${this.index_list[i].match[k].awayTeam}`,
//                  odd: odd.join(","),
                  type,
                  match: this.index_list[i].match[k].match_id,
                });
              }
            }
          }
          this.$vux.loading.show();
          this.global.ajax.call(this, "jczq_pay", d, this.submit_CB)
        }
      },
      submit_CB(d){
        this.$vux.loading.hide();
        if (d.error_code === 1004) this.global.alert.call(this, "去充值");
        else if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
        else {
          this.global.alert.call(this, "下单成功！");
          localStorage.clear();
        }
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
          else {
            if (this.bei > 99) {
              this.global.toast.call(this, "最大99倍");
              this.bei = '99';
            } else if (val < 1) {
              this.global.toast.call(this, "最小1倍");
              this.bei = '1';
            }
            this.set_money();
            this.set_zhushu()
          }
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
