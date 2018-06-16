<template>
    <div class="order page">
        <XHead :show_mord="false" :show_title_option="false">双色球
            <LaunchBtn v-if="!hemai" :fun="submit"></LaunchBtn>
        </XHead>

        <ul class="btns clearFix">
            <li class="btn fl btn_active" @click="back_index(-1)">
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

        <label class="stop" v-if="qi > 1">
            <input type="checkbox" class="op fr" v-model="is_stop">
            <span class="box fl"></span>
            <span class="fl">中奖后停止追期</span>
        </label>
        <div class="foot">
            <div class="set clearFix">
                <div class="fl setItem">
                    <span class="setText">追</span>
                    <XNumber input_w="1.6" :_val="qi" name="qi" h=".6" @on-change="setVal"></XNumber>
                    <span class="setText">期</span>
                </div>

                <div class="fl setItem">
                    <span class="setText">投</span>
                    <XNumber input_w="1.6" :_val="bei" name="bei" h=".6" @on-change="setVal" :max_val="50"></XNumber>
                    <span class="setText">倍</span>
                </div>
            </div>
            <div class="abstract">
                {{`${zhushu}注${qi}期${bei}倍 共`}}<span class="redText">{{zhushu * qi * bei * 2}}</span>元
                <div  v-if="hemai" class="submit redBg btn_active" @click="submit(true)">发起合买</div>
                <div v-else class="submit redBg btn_active" @click="submit">付款</div>
            </div>
        </div>

    </div>
</template>

<script>
    import {XNumber, XHead, LaunchBtn} from "com";
    import random_sort from "../random_sort";

    export default {
        name: 'order',
        components: {XNumber, XHead, LaunchBtn},
        data () {
            return {
                qi: 1,
                bei: 1,
                balls: [],
                zhushu: 0,
                is_stop: false,

                hemai: false,
            }
        },
        created(){
            if(sessionStorage.getItem('hemai')) this.hemai = true;
            this.getOrder();
            this.setRandom_zhushu();
            localStorage.removeItem('ssq_index');
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
                const zhushu = sessionStorage.getItem('ssq_jx') || 0;
                sessionStorage.removeItem('ssq_jx');
                if (zhushu) {
                    for (let i = 0; i < zhushu; i++) {
                        this.random_sort();
                    }
                }
            },
            del(i){
                if (i > -1) {
                    this.balls.splice(i, 1);
                    this.zhushu--;
                }
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
                this.balls.unshift(d)
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
            submit(is_together = false){
                if (this.zhushu === 0) this.global.toast.call(this, "请投注");
                else {
                    this.setMoney();


                    const d = {
                        total: this.balls,
                        notes: this.zhushu,
                        money: this.zhushu * this.qi * this.bei * 2,
                        periods: this.qi,
                        multiple: this.bei,
                        phase: this.$route.query.phase || "",
                        is_stop: this.is_stop ? 1 : 2,
                        stop_money: 0,
                    };

                    if (is_together === true) {
                        if (d.money < 8) this.global.alert.call(this, "方案金额不能小于8元");
                        else if (this.qi > 1) this.global.alert.call(this, "合买不能追期");
                        else {
                            sessionStorage.setItem("together_order", JSON.stringify(d));

                            this.$router.push('/pay_hemai?title=双色球&lotid=' + this.global.product_type.shuangseqiu);
                        }
                    } else {
//                        this.$vux.loading.show();
//                        this.global.ajax.call(this, "ssq_order", d, this.order_callBack)
                        sessionStorage.setItem("pay_data", JSON.stringify(d));
                        this.$router.push(`/payment?lotid=${this.global.product_type.shuangseqiu}`);
                    }
                }
            },
            order_callBack(d){
                this.$vux.loading.hide();
                if (d.error_code === 1004) this.$router.push(`/recharge?money=${d.data.money}&orderid=${d.data.orderid}&type=${d.error_code}`);
                else if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.clearDrder();
                    localStorage.clear();
                    this.$router.push("/pay_success?id=" + d.data.order_id + "&type=" + d.data.type + "&lotid=" + d.data.lotid)
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
