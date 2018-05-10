<template>
    <div class="fucai3d_index" v-if="loading === 0">
        <XHead @setMore="setMore" @setOption="setOption" :active_more="show_more" :active_title="show_title_option">
            {{xhead_title}}
        </XHead>
        <Actionsheet v-model="show_more" @click_item="more_item" :list="more_list"></Actionsheet>
        <Actionsheet v-model="show_title_option" @click_item="title_item" :list="title_option_list"></Actionsheet>

        <!--近十期中奖结果-->
        <div class="history">
            <div class="his_body" v-show="his_list !== null && show_his">
                <div class="tr">
                    <div class="td">期号</div>
                    <div class="td">开奖号码</div>
                    <div class="td">形态</div>
                    <div class="td">试机号</div>
                </div>
                <div class="tr" v-for="i in 10">
                    <div class="td">079期</div>
                    <div class="td redText">3 6 9</div>
                    <div class="td">组六</div>
                    <div class="td">5 2 1</div>
                </div>
            </div>
            <div class="his_foot">
                第2018080期
                <span class="redText">03-28 19:15 截止</span>
                <span class="btn fr" @click="show_his = !show_his">
                    {{show_his ? '收起':'显示'}}
                    <i class="his_arrow fr" :class="show_his && 'rotate'"></i>
                </span>
            </div>
        </div>

        <!--机选-->
        <div class="random">
            <span @click="random">机选</span>
            <span class="fr" v-show="play_type === 0">
                每位至少选1个号，按位猜对开奖号即中<span class="redText">1040</span>元
            </span>
            <span class="fr" v-show="play_type === 1">
                至少选2个号，猜对开奖号(顺序不限)即中<span class="redText">346</span>元
            </span>
            <span class="fr" v-show="play_type === 2">
                至少选3个号，猜对开奖号(顺序不限)即中<span class="redText">173</span>元
            </span>
        </div>

        <!--选号-->
        <template v-if="play_type === 0">
            <div class="number">
                <div class="l fl redBg">
                    百位
                    <i class="arrow fr"></i>
                </div>
                <div class="r fr">
                    <div class="boll fl redText" v-for="i in 10">
                        <input class="checkbox" type="checkbox" :value="i - 1" v-model="val1">

                        <div>{{i - 1}}</div>
                    </div>
                </div>
            </div>
            <div class="number">
                <div class="l fl redBg">
                    十位
                    <i class="arrow fr"></i>
                </div>
                <div class="r fr">
                    <div class="boll fl redText" v-for="i in 10">
                        <input class="checkbox" type="checkbox" :value="i - 1" v-model="val2">

                        <div>{{i - 1}}</div>
                    </div>
                </div>
            </div>
            <div class="number">
                <div class="l fl redBg">
                    个位
                    <i class="arrow fr"></i>
                </div>
                <div class="r fr">
                    <div class="boll fl redText" v-for="i in 10">
                        <input class="checkbox" type="checkbox" :value="i - 1" v-model="val3">

                        <div>{{i - 1}}</div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="number">
                <div class="l fl redBg">
                    选号
                    <i class="arrow fr"></i>
                </div>
                <div class="r fr">
                    <div class="boll fl redText" v-for="i in 10">
                        <input class="checkbox" type="checkbox" :value="i - 1" v-model="val4">

                        <div>{{i - 1}}</div>
                    </div>
                </div>
            </div>
        </template>

        <!--盈利-->
        <template v-if="zhushu > 0">
            <div v-show="play_type === 0" class="yingli">若中奖：奖金 1040，盈利{{1040 - money}}元</div>
            <div v-show="play_type === 1" class="yingli">若中奖：奖金 346元，盈利{{346 - money}}元</div>
            <div v-show="play_type === 2" class="yingli">若中奖：奖金 173，盈利{{173 - money}}元</div>
        </template>


        <XFoot :zhushu="zhushu" @clearChecked="clear_checked" @submit="submit"></XFoot>
    </div>
</template>

<script>
    import {XHead, Actionsheet, XFoot} from 'com';
    export default {
        name: 'fucai3d_index',
        components: {
            XHead,
            Actionsheet,
            XFoot
        },
        data () {
            return {
                show_more: false,
                show_title_option: false,
                xhead_title: null,

                more_list: [
                    "近期开奖",
                    "显示遗漏",
                    "玩法说明",
                ],
                title_option_list: [
                    "3D直选",
                    "组三复式",
                    "组六",
                ],

                show_his: false,
                his_list: [],

                play_type: 0,

                val1: [],
                val2: [],
                val3: [],
                val4: [],
                zhushu: 0,
                money: 0,

                loading: 3,

                phase: '',          //  将期
            }
        },
        created(){
            this.xhead_title = this.title_option_list[this.play_type];
            this.global.ajax.call(this, "fc3d_phase", {} , this.get_phase)
            this.global.ajax.call(this, "", {} , this.get)
            this.global.ajax.call(this, "", {} , this.get)
        },
        methods: {
            get_phase(d){

            },
            get_phase(d){

            },
            get_phase(d){

            },
            setMore(val){
                this.show_more = val;
            },
            setOption(val){
                this.show_title_option = val;
            },
            more_item(val){

            },
            title_item(val){
                if (val !== "-1") {
                    this.play_type = val;
                    this.xhead_title = this.title_option_list[val];
                }
            },
            setZhuShu(){
                let zhushu = 0;
                if (this.play_type === 0) {
                    zhushu = this.val1.length * this.val2.length * this.val3.length;
                } else if (this.play_type === 1) {
                    zhushu = this.val4.length * (this.val4.length - 1);
                } else if (this.play_type === 2) {
                    const n = this.val4.length;
                    zhushu = n * (n - 1) * (n - 2) / 6
                }
                this.zhushu = zhushu;

            },
            random(){
                const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                arr.sort(() => Math.random() > .5 ? -1 : 1);
                if (this.play_type === 0) {
                    this.val1 = [];
                    this.val2 = [];
                    this.val3 = [];
                    this.val1.push(arr[0]);
                    this.val2.push(arr[1]);
                    this.val3.push(arr[2]);

                } else if (this.play_type !== 0) {
                    this.val4 = [];
                    for (let i = 0; i < this.play_type + 1; i++) {
                        this.val4.push(arr[i])
                    }
                }
            },
            clear_checked(){
                this.val1 = [];
                this.val2 = [];
                this.val3 = [];
                this.val4 = [];
            },
            submit(){
                if (this.zhushu === 0) this.global.toast.call(this, "请投注");
                else {


                    let money = this.money, notes = this.zhushu, periods = 1, multiple = 1, type = this.play_type;
                    const zhi = [];
                    zhi.push(this.val1.join(''));
                    zhi.push(this.val2.join(''));
                    zhi.push(this.val3.join(''));
                    const d = {
                        "total": [
                            {
                                "zhi": zhi.join(","),
                                "three_dan": '',
                                "three_fu": type === 2 ? '' : this.val4.join(","),
                                "six": type === 1 ? '' : this.val4.join(","),
                                notes,
                                money,
                                periods,
                                multiple,
                                type
                            }
                        ],
                        notes,
                        money,
                        periods,
                        multiple,
                        phase: this.phase
                    };

                    sessionStorage.setItem("fc3d_order", JSON.stringify(d));
                    this.$router.push('/fucai3d/order');
                }
            }
        },
        watch: {
            play_type(val){
                if (val !== 0) this.val4 = [];
                else {
                    this.val1 = [];
                    this.val2 = [];
                    this.val3 = [];
                }
                this.zhushu = 0;
            },
            val1(){
                if (this.play_type === 0) this.setZhuShu();
            },
            val2(){
                if (this.play_type === 0) this.setZhuShu();
            },
            val3(){
                if (this.play_type === 0) this.setZhuShu();
            },
            val4(){
                if (this.play_type !== 0) this.setZhuShu();
            },
            zhushu(val){
                this.money = 2 * val;
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
