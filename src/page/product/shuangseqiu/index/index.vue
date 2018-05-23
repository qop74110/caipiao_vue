<template>
    <div class="shuangseqiu" v-if="loading === 0">
        <nav class="bar">
            <span class="fl back w10" @click="$router.go(-1)"></span>
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
                <li class="moreItem" @click="$router.push('/exposition?id=ssq')">
                    玩法说明
                </li>
            </ul>
        </div>

        <!--往期中奖号码-->
        <div class="history">
            <div class="his_list" :class="show_his && 'showHis'">
                <div class="item">
                    <div class="No fl">期号</div>
                    <div class="Nonumber fl">开奖号码</div>
                </div>
                <div class="item" v-for="(item, index) in historyNo" :key="index">
                    <div class="No fl">{{item.period}}期</div>
                    <div class="Nonumber fl">
                        <span v-for="k in item.winning">{{k}} </span>
                    </div>
                </div>

            </div>
            <div class="his_last">
                第{{phase.phase}}期 <span class="redText">{{phase.end_time}} 截止</span>

                <span class="his_btn fr" @click="show_his = !show_his">往期中奖号<i class="his_arrow"></i></span>
            </div>
        </div>

        <!--标准玩法&胆拖玩法-->
        <div class="content" :class="show_text && 'show_text'">
            <!--标准玩法-->
            <div class="standard">

                <!--机选-->
                <div class="random clearFix" v-show="play_type === 1">
                    <span class="random_btn fl redText" @click="showActionsheet=!showActionsheet">机选</span>
                    <span class="fr _text">至少选择6个红球，1个蓝球</span>
                </div>


                <!--红球-胆-->
                <div v-show="play_type === 2">
                    <div class="dantuo_text">胆码，选择1至5个号码</div>
                    <div class="redBallBox ballBox clearFix">
                        <div class="box fl" v-for="i in 33" :key="i">
                            <input type="checkbox" :value="i < 10 ? '0' + i: ''+ i" name="ball" class="checkbox"
                                   v-model="checked_red_dan">
                            <div class="ball">{{ i < 10 ? "0" + i : i }}</div>
                            <span class="text">{{miss.red[i - 1]}}</span>
                        </div>
                    </div>
                </div>


                <!--红球-->
                <div class="dantuo_text" v-show="play_type === 2">拖码，至少选择2个号码</div>
                <div class="redBallBox ballBox clearFix">
                    <div class="box fl" v-for="i in 33" :key="i">
                        <input type="checkbox" :value="i < 10 ? '0' + i: ''+ i" name="ball" class="checkbox"
                               v-model="checked_red">
                        <div class="ball">{{ i < 10 ? "0" + i : i }}</div>
                        <span class="text">{{miss.red[i - 1]}}</span>
                    </div>
                </div>

                <!--蓝球-->
                <div class="dantuo_text" v-show="play_type === 2">篮球，可选1至16个号码</div>
                <div class="blueBallBox ballBox clearFix">
                    <div class="box fl" v-for="i in 16" :key="i">
                        <input type="checkbox" :value="i < 10 ? '0' + i: ''+ i" name="ball" class="checkbox"
                               v-model="checked_blue">
                        <div class="ball">{{ i < 10 ? "0" + i : i }}</div>
                        <span class="text">{{miss.blue[i - 1]}}</span>
                    </div>
                </div>
            </div>

        </div>

        <div class="foot">
            <div class="fl clear w16" @click="clear_checked">清空</div>
            <div class="fl result">{{zhushu}} 注 共<span class="redText">{{zhushu * 2}}元</span></div>
            <div class="fl submit w16" @click="submit">下一步</div>
        </div>

        <Actionsheet v-model="showActionsheet" @click_item="click_item" :list="actionsheet_list"></Actionsheet>
    </div>
</template>

<script>
    import {Actionsheet} from "com"

    export default {
        name: 'shuangseqiu',
        components: {Actionsheet},
        data () {
            return {
                index: localStorage.getItem('ssq_index'),
                play_type: 1,                 //  2：胆拖；  1：标准
                show_play_type: false,        //  显示 标准&胆拖
                show_more: false,             //  显示更多
                show_text: false,             //  显示 遗漏
                showActionsheet: false,       //  显示&隐藏 机选
                actionsheet_list: {
                    "1": "一注",
                    "5": "五注",
                    "10": "十注"
                },
                show_his: false,              //  false：隐藏往期
                phase: {},                    //  双色球顶部购买的奖期以及截止时间
                miss: {},                     //  遗漏数据
                historyNo: [],
                checked_red_dan: [],          //  胆拖
                checked_red: [],              //  选中的红球
                checked_blue: [],             //  选中的篮球
                zhushu: 0,
                loading: 3,                   //
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, "ssq_phase", {}, this.getPhase);
            this.global.ajax.call(this, "ssq_miss", {}, this.getMiss);
            this.global.ajax.call(this, "ssq_historyNo", {}, this.get_historyNo);
            this.index && this.getOrder();
        },
        methods: {
            getPhase(d){
                this.hideLoading();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data[0]) {
                    this.phase = d.data[0];
                }

            },
            getMiss(d){
                this.hideLoading();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.miss = d.data;
                }
            },
            get_historyNo(d){
                this.hideLoading();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data && d.data.length !== 0) {
                    for (let i = 0; i < d.data.length; i++) {
                        d.data[i].winning = d.data[i].winning.split(',');
                    }

                    this.historyNo = d.data;
                }
            },
            hideLoading(){
                --this.loading === 0 && this.$vux.loading.hide();
            },
            getOrder(){
                const json_order = localStorage.getItem("order") || "[]";
                const order = JSON.parse(json_order)[this.index];

                if (order) {
                    this.play_type = order.type;
                    this.checked_blue = order.blue_arr || [];
                    if (order.type === 1) {
                        this.checked_red = order.red_arr;
                        this.getnum()
                    } else {
                        this.checked_red = order.tuo_arr;
                        this.checked_red_dan = order.red_arr;
                        this.count_betting()
                    }
                }
            },
//      生成随机注数
            click_item(key){
                if (key > 0) this.$router.push(`order?zhushu=${key}&phase=${this.phase.phase}`)
            },
//      标准玩法 计算
            getnum (){
                const rn = this.checked_red.length;
                const bn = this.checked_blue.length;
                let zhushu;

                if (rn < 6 || bn === 0) zhushu = 0;
                else if (rn === 6) zhushu = bn;
                else {
                    let tempNum = 1;

                    for (let i = 0; i < 6; i++) {

                        tempNum = tempNum * (rn - i);
                    }

                    zhushu = tempNum / 720 * bn;
                }


                this.zhushu = zhushu;

            },
//      胆拖计算
            count_betting ()  {
                let hqdm_count = this.checked_red_dan.length;
                let hqtm_count = this.checked_red.length;
                let lqtm_count = this.checked_blue.length;

                let fazs = 0;
                let tzje = 0;
                if (hqdm_count > 5 || hqdm_count < 1 || hqtm_count < 1 || lqtm_count < 1 || (hqdm_count + hqtm_count) < 7) {
                    fazs = 0;
                } else {
                    let r = 6 - hqdm_count;
                    let n = hqtm_count;
                    fazs = (this.global.jiecheng(n) / (this.global.jiecheng(r) * this.global.jiecheng(n - r))) * lqtm_count;
                }

                this.zhushu = fazs;

            },
            clear_checked(){
                this.checked_blue = this.checked_red = this.checked_red_dan = [];
            },
            submit(){
                if (this.zhushu === 0) this.global.toast.call(this, "请投注");
                else {
                    const balls = JSON.parse(localStorage.getItem("order") || "[]");
                    const index = this.index || 0;
                    const data = {
                        tuo_arr: this.checked_red,
                        blue_arr: this.checked_blue,
                        tuo: this.checked_red.join(","),
                        blue: this.checked_blue.join(","),
                        notes: this.zhushu,
                        money: this.zhushu * 2,
                        _money: this.zhushu * 2,
                        multiple: 1,
                        type: this.play_type
                    };
//          配合后台调整数据结构
                    if (data.type === 1) {
                        data.red = this.checked_red.join(",");
                        data.red_arr = this.checked_red
                    } else {
                        data.red = this.checked_red_dan.join(",");
                        data.red_arr = this.checked_red_dan
                    }
                    balls[index] = data;
                    localStorage.setItem("order", JSON.stringify(balls));
                    localStorage.removeItem("ssq_index");
                    this.$router.push('order?index=' + this.index + "&phase=" + this.phase.phase);
                }
            }
        }
        ,
        watch: {
            checked_blue(){
                this.play_type === 1 ? this.getnum() : this.count_betting();
            },
            checked_red(val){
                if (val.length > 20) {
                    this.global.toast.call(this, "胆码最多选20个");
                    this.checked_red.pop();
                } else if (this.play_type === 1) this.getnum();
                else {

                    const i = this.checked_red_dan.indexOf(val[val.length - 1]);
                    i !== -1 && (this.checked_red_dan.splice(i, 1));
                    this.count_betting()
                }
            },
            checked_red_dan(val)    {
                if (this.checked_red_dan.length > 5) {
                    this.global.toast.call(this, "胆码最多选5个");
                    this.checked_red_dan.pop();
                } else {
                    const i = this.checked_red.indexOf(val[val.length - 1]);
                    i !== -1 && (this.checked_red.splice(i, 1));
                    this.count_betting();
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
