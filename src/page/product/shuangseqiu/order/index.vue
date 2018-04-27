<template>
  <div class="order page">
    <ul class="btns clearFix">
      <li class="btn fl btn_active" @click="back_index(balls.length)">
        <img src="./img/add.png" alt="" class="btn_img">
        自选号码
      </li>
      <li class="btn fl btn_active" @click="random_sort">
        <img src="./img/add.png" alt="" class="btn_img">
        机选一注
      </li>
      <li class="btn fl btn_active" @click="del">
        <img src="./img/clear.png" alt="" class="btn_img">
        清空列表
      </li>
    </ul>

    <ul class="list">
      <li class="border"></li>
      <li class="item clearFix" v-for="(item,index) in balls" :key="index" @click.stop="back_index(index)">
        <i class="fl del" @click.stop="del(index)"></i>
        <span class="fl balls hideText">
          <span v-if="item.type === 2" class="red">
             ( <span v-for="i in item.red_arr">{{i}} </span>)
             <span class="red" v-for="i in item.tuo_arr">{{i}} </span>
          </span>

          <span v-else class="red" v-for="i in item.red_arr">{{i}} </span>
          <br>
          <span class="blue" v-for="i in item.blue_arr">{{i}} </span>
          <br>
          <span class="zhushi">{{`${['','单复式',"胆拖"][item.type]} ${item.notes}注${item._money}元`}}</span>
        </span>
      </li>
    </ul>

    <div class="foot">
      <div class="set clearFix">
        <div class="fl setItem">
          <span class="setText">追</span>
          <XNumber input_w="1.6" :_val="qi" name="qi" h=".6" @on-change="setVal"></XNumber>
          <span class="setText">期</span>
        </div>

        <div class="fl setItem">
          <span class="setText">投</span>
          <XNumber input_w="1.6" :_val="bei" name="bei" h=".6" @on-change="setVal"></XNumber>
          <span class="setText">倍</span>
        </div>
      </div>
      <div class="abstract">
        {{`${zhushu}注${qi}期${bei}倍 共`}}<span class="redText">{{zhushu * qi * bei * 2}}</span>元
        <div class="submit redBg btn_active" @click="submit">付款</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {XNumber} from "com";
  import random_sort from "../random_sort";

  export default {
    name: 'order',
    components: {XNumber},
    data () {
      return {
        qi: 1,
        bei: 1,
        balls: [],
        zhushu: 0,
      }
    },
    created(){
      this.getOrder();
      this.setRandom_zhushu();
    },
    methods: {
      getOrder(){
        const jsonData = localStorage.getItem("order") || "[]";
        this.balls = JSON.parse(jsonData);
        let zhushu = 0;
        for (let i = 0; i < this.balls.length; i++) {
          zhushu += this.balls[i].notes
        }
        this.zhushu = zhushu;

      },
      setRandom_zhushu(){
        const zhushu = this.$route.query.zhushu;
        if (zhushu) {
          for (let i = 0; i < zhushu; i++) {
            this.random_sort();
          }
        }
      },
      del(i){
        if (i > -1) this.balls.splice(i, 1);
        else if (this.balls.length > 0) {
          const _this = this;
          this.$vux.confirm.show({
            content: "确认清空？",
            onConfirm(){
              _this.balls = [];
            }
          })
        }
        this.setLocaL();
      },
      back_index(i){
        localStorage.setItem('ssq_index', i);
        this.setLocaL();
        this.$router.back();
      },
      random_sort(){
        const d = random_sort();
        this.balls.push(d)
        this.zhushu++;

      },
      setLocaL(){
        localStorage.setItem('order', JSON.stringify(this.balls))
      },
      setVal(d){
        this[d.name] = d.val;
      },
      setMoney(){
        for (let i = 0; i < this.balls.length; i++) {
          this.balls[i].money = this.qi * this.bei * this.balls[i].notes * 2;
        }
      },
      submit(){
        if (this.zhushu === 0) this.global.toast.call(this, "请投注");
        else {
          this.setMoney();
          this.$vux.loading.show();
          this.global.ajax.call(this, "ssq_order", {
            total: this.balls,
            notes: this.zhushu,
            money: this.zhushu * this.qi * this.bei * 2,
            periods: this.qi,
            multiple: this.bei,
            phase: this.$route.query.phase || "",
            is_stop: 2,
            stop_money: 0,
          }, this.order_callBack)
        }
      },
      order_callBack(d){
        this.$vux.loading.hide();
        if (d.error_code === 1004) this.global.alert.call(this, "请充值");
        else if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
        else {
          this.global.alert.call(this, "购买成功");
          this.clearDrder();
        }
      },
      clearDrder(){
        this.balls = [];
        this.zhushu = 0;
        this.qi = 1;
        this.bei = 1;
        localStorage.clear();
      }
    },

  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
