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
                </div>
                <div class="tr" v-for="(item,index) in historyNo">
                    <div class="td">{{item.period}}期</div>
                    <div class="td redText">
                        <span v-for="_i in item.winning.split(',')">{{_i}}</span>
                    </div>
                    <div class="td">{{item.memo}}</div>
                </div>
            </div>
            <div class="his_foot">
                第{{phase.phase}}期
                <span class="redText">{{phase.end_time}} 截止</span>
                <span class="btn fr" @click="show_his = !show_his">
                    {{show_his ? '收起':'显示'}}
                    <i class="his_arrow fr" :class="show_his && 'rotate'"></i>
                </span>
            </div>
        </div>

        <!--机选-->
        <div class="random">
            <span @click="random" class="redText">机选</span>
            <span class="fr" v-show="play_type === 1">
                每位至少选1个号，按位猜对开奖号即中<span class="redText">1040</span>元
            </span>
            <span class="fr" v-show="play_type === 3">
                至少选2个号，猜对开奖号(顺序不限)即中<span class="redText">346</span>元
            </span>
            <span class="fr" v-show="play_type === 4">
                至少选3个号，猜对开奖号(顺序不限)即中<span class="redText">173</span>元
            </span>
        </div>

        <!--选号-->
        <template v-if="play_type === 1 && miss.hundred">
            <div :class="showMiss && 'showMiss'" class="number">
                <div class="l fl">
                    <span class="fl span redBg">百位</span>
                    <i class="arrow fl"></i>
                </div>
                <div class="r fr">
                    <div class="fl" v-for="(item,i) in 10">
                        <div class="boll fl redText">
                            <input class="checkbox" type="checkbox" :value="i" v-model="val1">

                            <div>{{i}}</div>
                        </div>
                        <div class="miss">{{miss.hundred[i]}}</div>
                    </div>
                </div>
            </div>
            <div :class="showMiss && 'showMiss'" class="number">
                <div class="l fl">
                    <span class="fl span redBg">十位</span>
                    <i class="arrow fl"></i>
                </div>
                <div class="r fr">
                    <div class="fl" v-for="(item,i) in 10">
                        <div class="boll fl redText">
                            <input class="checkbox" type="checkbox" :value="i" v-model="val2">

                            <div>{{i}}</div>
                        </div>
                        <div class="miss">{{miss.ten[i]}}</div>
                    </div>

                </div>
            </div>
            <div :class="showMiss && 'showMiss'" class="number">
                <div class="l fl">
                    <span class="fl span redBg">个位</span>
                    <i class="arrow fl"></i>
                </div>
                <div class="r fr">
                    <div class="fl" v-for="(item,i) in 10">
                        <div class="boll fl redText">
                            <input class="checkbox" type="checkbox" :value="i" v-model="val3">

                            <div>{{i}}</div>
                        </div>
                        <div class="miss">{{miss.individual[i]}}</div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="miss.group">
            <div :class="showMiss && 'showMiss'" class="number">
                <div class="l fl">
                    <span class="fl span redBg">选号</span>
                    <i class="arrow fl"></i>
                </div>
                <div class="r fr">
                    <div class="fl" v-for="(item,i) in 10">
                        <div class="boll fl redText">
                            <input class="checkbox" type="checkbox" :value="i" v-model="val4">

                            <div>{{i}}</div>
                        </div>
                        <div class="miss">{{miss.group[i]}}</div>
                    </div>
                </div>
            </div>
        </template>

        <!--盈利-->
        <template v-if="zhushu > 0">
            <div v-show="play_type === 1" class="yingli">若中奖：奖金 1040，盈利{{1040 - money}}元</div>
            <div v-show="play_type === 3" class="yingli">若中奖：奖金 346元，盈利{{346 - money}}元</div>
            <div v-show="play_type === 4" class="yingli">若中奖：奖金 173，盈利{{173 - money}}元</div>
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
                    "显示遗漏",
                    "玩法说明",
                ],
                showMiss: false,
                title_option_list: [
                    "3D直选",
                    "组三复式",
                    "组六",
                ],

                show_his: false,
                his_list: [],

                play_type: null,

                val1: [],
                val2: [],
                val3: [],
                val4: [],
                zhushu: 0,
                money: 0,

                loading: 3,

                phase: '',          //  将期
                historyNo: null,
                miss: null,
            }
        },
        created(){
            this.$vux.loading.show();
            this.modify();
            this.global.ajax.call(this, "fc3d_phase", {}, this.get_phase);

            this.global.ajax.call(this, "fc3d_historyNo", {}, this.get_historyNo);

        },
        methods: {
            modify(){
                const modify = sessionStorage.getItem('fc3d_modify');
                let xhead_title = this.title_option_list[0];
                if (modify) {
                    const data = JSON.parse(sessionStorage.getItem('fc3d_order')).total[modify];
                    this.play_type = data.type;
                    if (data.type === 1) {
                        this.val1 = data.val1;
                        this.val2 = data.val2;
                        this.val3 = data.val3;
                    } else {
                        setTimeout(() => {
                            for (let i = 0; i < data[{"3": "three_fu", "4": 'six'}[data.type]].length; i++) {
                                this.val4.push(data[{"3": "three_fu", "4": 'six'}[data.type]][i])
                            }
                        }, 300);
                        xhead_title = this.title_option_list[data.type - 2];
                    }
                } else this.play_type = 1;
                this.xhead_title = xhead_title;

            },
            get_phase(d){
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data && d.data[0].phase) {
                    this.phase = d.data[0];
                }
                this.hideLoading();
            },
            get_miss(d){
                if (this.loading === 0) this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    this.miss = d.data;
                }
                this.hideLoading();
            },
            get_historyNo(d){
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data && d.data.length > 0) {
                    this.historyNo = d.data;
                }
                this.hideLoading();
            },
            hideLoading(){
                if (this.loading === 0) return;
                --this.loading === 0 && this.$vux.loading.hide();
            },
            setMore(val){
                this.show_more = val;
            },
            setOption(val){
                this.show_title_option = val;
            },
            more_item(val){
                if (val !== "-1") {
                    if (val === 0) {
                        this.showMiss = !this.showMiss;
                        this.more_list[0] = this.showMiss ? '隐藏遗漏' : '显示遗漏';
                    }
                    else {
                        this.$router.push("/exposition?id=fc3d");
                    }
                }
            },
            title_item(val){
                if (val !== "-1") {
                    this.play_type = val === 0 ? 1 : val + 2;
                    this.xhead_title = this.title_option_list[val];
                }
            },
            setZhuShu(){
                let zhushu = 0;
                if (this.play_type === 1) {
                    zhushu = this.val1.length * this.val2.length * this.val3.length;
                } else if (this.play_type === 3) {
                    zhushu = this.val4.length * (this.val4.length - 1);
                } else if (this.play_type === 4) {
                    const n = this.val4.length;
                    zhushu = n * (n - 1) * (n - 2) / 6
                }
                this.zhushu = zhushu;

            },
            random(){
                const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                arr.sort(() => Math.random() > .5 ? -1 : 1);
                if (this.play_type === 1) {
                    this.val1 = [];
                    this.val2 = [];
                    this.val3 = [];
                    this.val1.push(arr[0]);
                    this.val2.push(arr[1]);
                    this.val3.push(arr[2]);

                } else {
                    this.val4 = [];
                    for (let i = 0; i < this.play_type - 1; i++) {
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

                    const total = {
                        "zhi": type === 1 ? zhi : '',
                        val1: this.val1,
                        val2: this.val2,
                        val3: this.val3,
                        "three_dan": '',
                        "three_fu": type === 3 ? this.val4 : '',
                        "six": type === 4 ? this.val4 : '',
                        notes,
                        money,
                        periods,
                        multiple,
                        type
                    };
                    let data = null;

                    if (sessionStorage.getItem('fc3d_zixuan')) {                //  自选一注
                        data = JSON.parse(sessionStorage.getItem('fc3d_order'));
                        data.total.unshift(total);
                    } else if (sessionStorage.getItem("fc3d_modify")) {         //  修改某注
                        data = JSON.parse(sessionStorage.getItem('fc3d_order'));
                        const modify = sessionStorage.getItem('fc3d_modify');
                        data.total[modify] = total;
                    } else {
                        data = {
                            total: [
                                total
                            ],
                            periods,
                            multiple,
                        };
                    }

                    data.phase = this.phase.phase;

                    sessionStorage.setItem("fc3d_order", JSON.stringify(data));
                    this.$router.push('/fucai3d/order');
                }
            }
        },
        watch: {
            play_type(val){
                this.val4 = [];
                this.val1 = [];
                this.val2 = [];
                this.val3 = [];


                this.$vux.loading.show();
                this.global.ajax.call(this, "fc3d_miss", {type: val === 4 ? 3 : val}, this.get_miss);
                this.zhushu = 0;
            },
            val1(){
                if (this.play_type === 1) this.setZhuShu();
            },
            val2(){
                if (this.play_type === 1) this.setZhuShu();
            },
            val3(){
                if (this.play_type === 1) this.setZhuShu();
            },
            val4(){
                if (this.play_type !== 1) this.setZhuShu();
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
