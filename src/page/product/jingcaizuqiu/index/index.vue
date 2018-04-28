<template>
    <div class="jczq_index page" v-if="loading === 0">

        <XHead @setMore="setMore" @setOption="setOption" :active_more="show_more" :active_title="show_title_option">
            {{title_option_list[play_type]}}
        </XHead>
        <span class="shaixuan" @click="show_screen = true"></span>
        <!--赛事列表-->
        <div class="content">
            <div class="bar_box" v-show="play_type !== 'FT002'">
                <Bar :list="bar_list" v-model="bar_value" class="bar"></Bar>
                <div class="jixuan" v-show="play_type !== 'FT003'" @click="random_touzhu">
                    机选
                </div>
            </div>

            <div v-show="index_list.length !== 0">
                <!--胜平负-->
                <div class="type1 list" v-if="play_type === 'FT001'">
                    <div class="item" v-for="(item, index) in index_list">
                        <div class="date">{{`${item.date} ${item.week} ${item.count}比赛可选`}}</div>
                        <div class="details" v-for="(_item,_index) in item.match">
                            <div class="left fl">
                                <p>{{_item.league}}</p>
                                <p>{{`周${_item.weekid} ${_item.teamid}`}}</p>
                                <p>{{_item.endtime}}截止</p>
                            </div>
                            <div class="right fr">
                                <input type="checkbox" class="checkbox checkbox1" value="3"
                                       v-model="checked[index][_index]">
                                <div class="victory fl border_r">
                                    <p class="redText hideText">{{_item.homeTeam}}</p>
                                    <p>主胜 {{_item.odds[0].odds}}</p>
                                </div>
                                <input type="checkbox" class="checkbox checkbox2" value="1"
                                       v-model="checked[index][_index]">
                                <div class="ping fl border_r">
                                    VS
                                    <p>平 {{_item.odds[1].odds}}</p>
                                </div>
                                <input type="checkbox" class="checkbox checkbox3" value="0"
                                       v-model="checked[index][_index]">
                                <div class="fail fl">
                                    <p class="redText hideText">{{_item.awayTeam}}</p>
                                    <p>客胜 {{_item.odds[2].odds}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--让球胜平负-->
                <div class="type2 list" v-else-if="play_type === 'FT006'">
                    <div class="item" v-for="(item, index) in index_list">
                        <div class="date">{{`${item.date} ${item.week} ${item.count}比赛可选`}}</div>
                        <div class="details" v-for="(_item,_index) in item.match">

                            <div class="left fl">
                                <p>{{_item.league}}</p>
                                <p>{{`周${_item.weekid} ${_item.teamid}`}}</p>
                                <p>{{_item.endtime}}截止</p>
                            </div>

                            <div class="middle fl" :class="_item.odds[3].odds > 0 ? 'redBg':'greenBg'">
                                让球
                                <span class="text">{{_item.odds[3].odds}}</span>
                            </div>

                            <div class="right fr">
                                <input type="checkbox" class="checkbox checkbox1" value="3"
                                       v-model="checked[index][_index]">

                                <div class="victory fl border_r">
                                    <p class="redText hideText">{{_item.homeTeam}}</p>
                                    <p>主胜 {{_item.odds[0].odds}}</p>
                                </div>
                                <input type="checkbox" class="checkbox checkbox2" value="1"
                                       v-model="checked[index][_index]">

                                <div class="ping fl border_r">
                                    VS
                                    <p>平 {{_item.odds[1].odds}}</p>
                                </div>
                                <input type="checkbox" class="checkbox checkbox3" value="0"
                                       v-model="checked[index][_index]">

                                <div class="fail fl">
                                    <p class="redText hideText">{{_item.awayTeam}}</p>
                                    <p>客胜 {{_item.odds[2].odds}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--比分-->
                <div class="type3 list" v-else-if="play_type === 'FT002'">
                    <div class="item" v-for="(item, index) in index_list">
                        <div class="date">{{`${item.date} ${item.week} ${item.count}比赛可选`}}</div>
                        <div class="details" v-for="(_item,_index) in item.match">
                            <div class="left fl">
                                <p>{{_item.league}}</p>
                                <p>{{`周${_item.weekid} ${_item.teamid}`}}</p>
                                <p>{{_item.endtime}}截止</p>
                            </div>

                            <div class="right fr">
                                <div class="right_top right_children">
                                    <div class="fl redText hideText">{{_item.homeTeam}}</div>
                                    <div class="fl">VS</div>
                                    <div class="fl redText hideText">{{_item.awayTeam}}</div>
                                </div>
                                <div class="right_bottom right_children"
                                     @click="show_bifenPopup_fun(_item, index, _index)">
                                    <span v-if="checked[index][_index].length === 0">点击选择比分</span>
                                    <div v-else class="redBg hideText">
                                        <span v-for="_i in checked[index][_index]" class="whiteText">{{_i}} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--半全场-->
                <div class="type4 list" v-else-if="play_type === 'FT004'">
                    <div class="item" v-for="(item, index) in index_list">
                        <div class="date">{{`${item.date} ${item.week} ${item.count}比赛可选`}}</div>
                        <div class="details" v-for="(_item,_index) in item.match">
                            <div class="left fl">
                                <p>{{_item.league}}</p>
                                <p>{{`周${_item.weekid} ${_item.teamid}`}}</p>
                                <p>{{_item.endtime}}截止</p>
                            </div>

                            <div class="right fr">
                                <div class="right_top right_children">
                                    <div class="fl redText hideText">{{_item.homeTeam}}</div>
                                    <div class="fl">VS</div>
                                    <div class="fl redText hideText">{{_item.awayTeam}}</div>
                                </div>
                                <div class="right_bottom right_children"
                                     @click="show_banquanchangPopup_fun(_item, index, _index)">
                                    <span v-if="checked[index][_index].length === 0">点击打开投注区</span>
                                    <div v-else class="redBg hideText">
                                        <span v-for="_i in checked[index][_index]" class="whiteText">{{_i}} </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!--总进球-->
                <div class="type5 list" v-else-if="play_type === 'FT003'">
                    <div class="item" v-for="(item, index) in index_list">
                        <div class="date">{{`${item.date} ${item.week} ${item.count}比赛可选`}}</div>
                        <div class="details" v-for="(_item,_index) in item.match">
                            <div class="left fl">
                                <p>{{_item.league}}</p>
                                <p>{{`周${_item.weekid} ${_item.teamid}`}}</p>
                                <p>{{_item.endtime}}截止</p>
                            </div>

                            <div class="right fr">
                                <div class="right_top">
                                    <span class="redText fl right_top_text hideText">{{_item.homeTeam}}</span>
                                    <span class="vs fl right_top_text">VS</span>
                                    <span class="redText fl right_top_text hideText">{{_item.awayTeam}}</span>
                                </div>
                                <div class="right_bottom">
                                    <div class="fl btn" v-for="(it, _in) in _item.odds">
                                        <input class="checkbox" type="checkbox" :value="it.name"
                                               v-model="checked[index][_index]">
                                        <div>
                                            {{it.name}} <span class="odds"> {{it.odds}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="noLit" v-show="index_list.length === 0"></div>
        </div>

        <footer class="foot">
            <div class="fl clear" @click="init_checked"></div>
            <div class="fl text">
                <p class="changshu">已选<span class="redText">{{changshu}}</span>场</p>
                页面赔率仅供参考，请以出票赔率为准
            </div>
            <div class="fr submit redBg" @click="submit">确认</div>
        </footer>
        <!--筛选-->
        <div class="screen" v-show="show_screen">
            <div class="screen_con">
                <div class="option">
                    <div class="title"><span class="text">选择联赛</span></div>

                    <div class="screen_top">
                        <div class="s_topBtn fl bor_r" @click="all_c">全选</div>
                        <div class="s_topBtn fl bor_r" @click="clear_c">反选</div>
                        <div class="s_topBtn fl" @click="league">五大联赛</div>
                    </div>

                    <div class="screen_list clearFix">
                        <div class="fl" v-for="(item , index) in screenList">
                            <input class="checkbox" type="checkbox" :value="index" v-model="screen_c">
                            <div>{{item.league}}</div>
                        </div>
                    </div>
                </div>

                <div class="checked">已选择<span class="redText">{{cNum}}</span>场比赛</div>
                <div class="btns" @click="show_screen = false">
                    <div class="btn cancel fl">取消</div>
                    <div class="btn confirm fl" @click="screenFun">确定</div>
                </div>
            </div>
        </div>
        <!--xhead -->
        <Actionsheet v-model="show_more" @click_item="more_item" :list="more_list"></Actionsheet>
        <Actionsheet v-model="show_title_option" @click_item="title_item" :list="title_option_list"></Actionsheet>

        <!--比分 || 半全场 弹窗-->
        <div class="bifen" v-if="show_bifenPopup || show_banquanchangPopup">
            <div class="popup" :class="show_banquanchangPopup && 'h74'">
                <div class="title">{{`${bifenPopup_data.homeTeam || banquanchang_data.homeTeam} VS
                    ${bifenPopup_data.awayTeam ||
                    banquanchang_data.awayTeam}`}}
                </div>

                <!--比分-->
                <div class="option" v-if="show_bifenPopup">
                    <p class="text">竞猜全场90分钟（含伤停补时）的比分</p>
                    <div class="victory whiteBg h2">
                        <div class="left fl redBg">胜</div>
                        <div class="right fl">
                            <div class="btn fl" v-for="(item,index) in bifenPopup_data.odds[0]">
                                <input class="checkbox" type="checkbox" :value="item.name"
                                       v-model="checked[bifenPopup_data.index][bifenPopup_data._index]">
                                <div>
                                    {{item.name}}
                                    <p class="c666">{{item.odds}}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="ping whiteBg">
                        <div class="left fl blueBg">平</div>
                        <div class="right fl ">
                            <div class="btn fl" v-for="(item,index) in bifenPopup_data.odds[1]">
                                <input class="checkbox" type="checkbox" :value="item.name"
                                       v-model="checked[bifenPopup_data.index][bifenPopup_data._index]">
                                <div>
                                    {{item.name}}
                                    <p class="c666">{{item.odds}}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="fail whiteBg h2">
                        <div class="left fl greenBg">负</div>
                        <div class="right fl">
                            <div class="btn fl" v-for="(item,index) in bifenPopup_data.odds[2]">
                                <input class="checkbox" type="checkbox" :value="item.name"
                                       v-model="checked[bifenPopup_data.index][bifenPopup_data._index]">
                                <div>
                                    {{item.name}}
                                    <p class="c666">{{item.odds}}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <!--半全场-->
                <div class="option" v-else>
                    <p class="text">竞猜主队在上半场和全场比赛（不含加时赛和点球大战）的胜平负结 果</p>
                    <div class="whiteBg h2">
                        <div class="left fl purpleBg" style="line-height: .7rem;">半全场</div>
                        <div class="right fl">
                            <div class="btn fl" v-for="(item,index) in banquanchang_data.odds">
                                <input class="checkbox" type="checkbox" :value="item.name"
                                       v-model="checked[banquanchang_data.index][banquanchang_data._index]">
                                <div>
                                    {{item.name}}
                                    <p class="c666">{{item.odds}}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom" @click="show_bifenPopup = false; show_banquanchangPopup = false">
                    <div class="bottom_btn confirm fl redBg">确定</div>
                    <div v-if="show_bifenPopup" class="bottom_btn cancel fl whiteBg"
                         @click="clear_checked(bifenPopup_data.index, bifenPopup_data._index);">取消
                    </div>
                    <div v-else class="bottom_btn cancel fl whiteBg"
                         @click="clear_checked(banquanchang_data.index, banquanchang_data._index);">取消
                    </div>
                </div>
            </div>
        </div>

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
                bar_value: 1,                     //  0: 单场
                show_screen: false,               //  trye: 显示 筛选
                screenList: [],                   //  筛选 列表
                screen_c: [],                     //  筛选 选择的数组
                cNum: 0,                          //  筛选 共选择多少场
                show_bifenPopup: false,           //  true: 显示 比分玩法弹窗
                bifenPopup_data: [],              //  true: 显示 比分玩法弹窗
                show_banquanchangPopup: false,    //  true: 显示 总进球法弹窗
                banquanchang_data: [],
                index_list: [],
                changshu: 0,
                loading: 1,
                checked: [],
                getData: false,
            }
        },
        created(){
            this.$vux.loading.show();
//      this.getData = localStorage.getItem("jczq_setOrder") ? true : false;
//      if (this.getData) this.getOrder();
            this.global.ajax.call(this, "jczq_play_type", {}, this.getPlay_type);
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
            },
            getPlay_type(d){
                this.hideLoading();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    const obj = {};
                    for (let i = 0; i < d.data.length; i++) {
                        obj[d.data[i].value] = d.data[i].name
                    }
                    this.title_option_list = obj;

                    if (this.getData) this.getData = false;
                    else this.play_type = d.data[0].value;
                }
            },
            getIndexList(){
                if (!this.getData) {
                    this.$vux.loading.show();
                    this.global.ajax.call(this, "jczq_index_list", {
                        pass_rules: this.bar_value,
                        play_rules: this.play_type
                    }, this.getIndexList_CB);
                }
            },
            getScreenList(){
                this.global.ajax.call(this, "jczq_screenList", {
                    pass_rules: this.bar_value,
                    play_rules: this.play_type
                }, this.getScreenList_CB);
            },
            getIndexList_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    this.index_list = d.data;
                    this.init_checked();
                }
            },
            getScreenList_CB(d){
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    this.screenList = d.data;
                }
            },
            hideLoading(){
                --this.loading === 0 && this.$vux.loading.hide();
            },
            init_checked(){
                const arr = [];
                for (let i = 0; i < this.index_list.length; i++) {
                    arr.push([]);
                    for (let k = 0; k < this.index_list[i].match.length; k++) {
                        arr[i].push([])
                    }
                }
                this.checked = arr;
            },
            set_changshu(){
                let changshu = 0;
                for (let i = 0; i < this.checked.length; i++) {
                    for (let k = 0; k < this.checked[i].length; k++) {
                        if (this.checked[i][k].length === 0) continue;
                        else changshu++;
                    }
                }
                this.changshu = changshu;
            },
            setMore(val){
                this.show_more = val;
            },
            setOption(val){
                this.show_title_option = val;
            },
            more_item(val){
                if (val === "2") this.$router.push("/exposition?id=" + this.global.product_type['jingcaizuqiu']);
                else if (val === "1") this.$router.push('/prize_jczq');
            },
            title_item(val){
                val !== "-1" && (this.play_type = val)
            },
            show_bifenPopup_fun(data, index, _index){
                this.show_bifenPopup = true;
                data.index = index;
                data._index = _index;
                this.bifenPopup_data = data;
            },
            show_banquanchangPopup_fun(data, index, _index){
                this.show_banquanchangPopup = true;
                data.index = index;
                data._index = _index;
                this.banquanchang_data = data;
            },
            clear_checked(i, _i){
                for (let k = 0; this.checked[i][_i].length !== 0; k++) {
                    this.checked[i][_i].pop();
                }
            },
            all_c(){
                let arr = []
                for (let i = 0; i < this.screenList.length; i++) {
                    arr.push(i);
                }
                this.screen_c = arr;
            },
            clear_c(){
                if (this.screen_c.length > 0) this.screen_c = [];
            },
            league(){
                for (let i = 0; i < this.screenList.length; i++) {
                    if (/法甲|意甲|西甲|德甲|英超/.test(this.screenList[i].league)) this.screen_c.push(i);
                }
            },
            screenFun(){
                if (this.screen_c.length === 0) this.global.toast.call(this, "筛选条件为空")
                else {
                    var arr = [];
                    for (let i = 0; i < this.screen_c.length; i++) {
                        arr.push(this.screenList[this.screen_c[i]].league)
                    }

                    this.$vux.loading.show();
                    this.global.ajax.call(this, 'jczq_screen', {
                        pass_rules: this.bar_value,
                        play_rules: this.play_type,
                        league: arr.join(",")
                    }, this.screenFun_CB)
                }

            },
            screenFun_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    this.index_list = d.data;
                    this.init_checked();
                }
            },
            random_touzhu(){
                for (let i = 0; i < this.bar_value + 1; i++) {
                    let ii = this.random(this.index_list[0].match.length - 1, 0);
                    let k = this.random(this.index_list[0].match[ii].odds.length - 1, 0);

                    let d;
                    if (/FT001|FT006/.test(this.play_type)) d = k === 0 ? "3" : k === 1 ? "1" : "0";
                    else d = this.index_list[0].match[i].odds[k].name;
                    this.checked[0][ii].push(d)
                }
                this.set_changshu();
                this.submit();

            },
            random(max, min){
                return Math.floor(Math.random() * (max - min + 1) + min);
            },
            submit(){
                if (this.changshu === 0) this.global.toast.call(this, "请下注");
                else if (this.changshu === 1 && (this.bar_value === 1 && this.play_type !== "FT002")) this.global.toast.call(this, "最少选择两场");
                else {
                    const data = {
                        index_list: this.index_list,
                        checked: this.checked,
                        play_type: this.play_type,
                        bar_value: this.play_type !== "FT002" ? this.bar_value : 0,
                    };
                    localStorage.clear();
                    localStorage.setItem("jczq_order", JSON.stringify(data));
                    this.$router.push('order');
                }
            },
        },
        watch: {
            bar_value(val){
                this.getIndexList();
                this.getScreenList();
            },
            play_type(val){
                this.getIndexList();
                this.getScreenList();
            },
            checked(val){
                this.set_changshu();
            },
            screen_c(){
                let cNum = 0;
                for (let i = 0; i < this.screen_c.length; i++) {
                    cNum += this.screenList[this.screen_c[i]].count
                }
                this.cNum = cNum;
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
