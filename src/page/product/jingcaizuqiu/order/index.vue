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

            <!--混合投注-->
            <div class="type2" v-else-if="play_type === 'FT005'">
                <div v-for="(item, index) in index_list">
                    <div class="item"
                         v-for="(_item, _index) in item.match"
                         v-if="checked[index][_index][0].length > 0 ||
                            checked[index][_index][1].length > 0 ||
                            checked[index][_index][2].length > 0 ||
                            checked[index][_index][3].length > 0 ||
                            checked[index][_index][4].length > 0"
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
                                    <template v-for="(_i,kj) in c[index][_index]">
                                        <span v-for="_k in _i" class="whiteText">{{
                                            kj === 0 ? ['负', '平', '', '胜'][_k] :
                                            kj === 1 ? ['让球负', '让球平', '', '让球胜'][_k] :
                                            _k
                                            }} </span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="foot">
            <div class="foot_top">
                <span class="foot_top_btn fl" v-if="bar_value === 0">
                    单关
                </span>
                <span v-else-if="chuan.length === 0" class="foot_top_btn fl" @click="show_footMiddle_fun">
                    投注方式
                    <span class="redText">(必选)</span>
                    <img src="./img/arrow_b.png" class="fr arrow" :style="show_footMiddle && 'transform: rotate(0);'">
                </span>

                <span v-else class="foot_top_btn fl hideText" @click="show_footMiddle_fun">
                    <img src="./img/arrow_b.png" class="fr arrow" :style="show_footMiddle && 'transform: rotate(0);'">
                    <template v-for="item in chuan">
                        {{item + '串1'}}
                    </template>
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
            <div class="foot_bottom">
                {{zhushu}}注 {{bei}}倍 <span class="redText">{{money}}</span>元
                <p class="c666">预测奖金(仅供参考): {{zhushu !== 1 ? min_m + "~" + max_m: min_m}}</p>
                <span class="submit redBg" @click="submit">确定</span>
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
    import {suanfa, danzhu} from "../suanfa";
    import {max_jj, min_jj} from "./jiangjin";


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
                bar_value: '1',
                zhushu: 0,
                changshu: 0,
                maxChuan: 0,
                popup_data: {},
                show_popup: false,
                popup_c: [],

                min_m: 0,
                max_m: 0,
                timeout: null,

            }
        },
        created(){
            this.getOrder();
            this.setMaxChuan();
            this.render_page = true;
            this.set_c();
            if (this.bar_value === 0) (this.chuan = [1]);
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
            setMaxChuan(){
                let maxChan = 8;
                if (this.play_type === "FT004" || this.play_type === "FT002") maxChan = 4;
                else if (this.play_type === "FT003") maxChan = 6;
                else if (this.play_type === "FT005") {
                    let chuan = 8;
                    for (let i = 0; chuan !== 4 && i < this.checked.length; i++) {
                        for (let k = 0; chuan !== 4 && k < this.checked[i].length; k++) {
                            for (let j = 2; j < this.checked[i][k].length && chuan !== 4; j++) {
                                if (this.checked[i][k][j].length !== 0) {
                                    if (j === 2 || j === 4) chuan = 4;
                                    else if (j === 3 && chuan > 6) chuan = 6;
                                }
                            }
                        }
                    }
                    maxChan = chuan;
                }
                this.maxChuan = maxChan;
            },
            set_c(){
                //        深复制
                let c = [];
                for (let i = 0; i < this.checked.length; i++) {
                    c.push([]);
                    for (let k = 0; k < this.checked[i].length; k++) {
                        c[i].push(this.checked[i][k]);
                        if (this.play_type === "FT005") {
                            for (let j = 0; j < this.checked[i][k].length; j++) {
                                c[i][k][j] = this.checked[i][k][j];
                            }
                        }
                    }
                }
                this.c = c;
            },
            set_changshu(){
                let changshu = 0;
                for (let i = 0; i < this.c.length; i++) {
                    for (let k = 0; k < this.c[i].length; k++) {
                        if (this.play_type !== "FT005") {
                            if (this.c[i][k].length === 0) continue;
                            else changshu++;
                        } else {
                            for (let j = 0; j < this.c[i][k].length; j++) {
                                if (this.c[i][k][j].length === 0) continue;
                                else {
                                    changshu++;
                                    break;
                                }
                            }
                        }
                    }
                }
                this.changshu = changshu;
            },
            set_zhushu(){
                if (this.chuan.length > 0) {
                    let zhuArr = [];
                    for (let i = 0; i < this.c.length; i++) {
                        for (let _i = 0; _i < this.c[i].length; _i++) {
                            if (this.c[i][_i].length === 0)continue;
                            zhuArr.push([]);
                            for (let _i_ = 0; _i_ < this.c[i][_i].length; _i_++) {
                                if (this.play_type !== "FT005") zhuArr[zhuArr.length - 1].push(this.c[i][_i][_i_]);
                                else {
                                    if (this.c[i][_i][_i_].length === 0) continue;
                                    for (let k = 0; k < this.c[i][_i][_i_].length; k++) {
                                        zhuArr[zhuArr.length - 1].push(this.c[i][_i][_i_][k])
                                    }
                                }
                            }

                            if (zhuArr[zhuArr.length - 1].length === 0) zhuArr.pop();
                        }
                    }

                    let zhushu = 0;

                    for (let i = 0; i < this.chuan.length; i++) {
                        if (this.chuan[i] === 1) zhushu += danzhu(zhuArr);
                        else zhushu += suanfa(zhuArr, this.chuan[i]);
                    }


                    this.zhushu = zhushu || 0;
                }
            },
            set_jjArr(){
                clearTimeout(this.timeout);
                this.timeout = null;
                this.timeout = setTimeout(() => {
                    if (this.chuan.length > 0) {
                        let max_jjArr = [];
                        let min_jjArr = [];
                        for (let i = 0; i < this.c.length; i++) {
                            for (let ii = 0; ii < this.c[i].length; ii++) {
                                if (this.c[i][ii].length > 0) {
                                    let odd = [];
                                    for (let iii = 0; iii < this.c[i][ii].length; iii++) {
                                        if (this.c[i][ii][iii].length === 0 && this.play_type === "FT005") continue;
                                        const v = this.c[i][ii][iii];
                                        if (/FT001|FT006/.test(this.play_type)) {
                                            odd.push(
                                                this.index_list[i].match[ii].odds[v === "3" ? 0 : v === "1" ? 1 : 2].odds
                                            )
                                        } else if (/FT004|FT003/.test(this.play_type)) {
                                            for (let k = 0; k < this.index_list[i].match[ii].odds.length; k++) {
                                                if (v === this.index_list[i].match[ii].odds[k].name) {
                                                    odd.push(this.index_list[i].match[ii].odds[k].odds);
                                                }
                                            }
                                        } else if (this.play_type === "FT002") {
                                            const val = v.split(":");
                                            let ik;
                                            if (val[0] > val[1] || val[0] === "胜其它") ik = 0;
                                            else if (val[0] === val[1] || val[0] === "平其它") ik = 1;
                                            else ik = 2;
                                            for (let k = 0; k < this.index_list[i].match[ii].odds[ik].length; k++) {
                                                if (v === this.index_list[i].match[ii].odds[ik][k].name) {
                                                    odd.push(this.index_list[i].match[ii].odds[ik][k].odds);
                                                }
                                            }
                                        } else if (this.play_type === "FT005") {
                                            if (this.c[i][ii][iii].length === 0) continue;
                                            for (let k = 0; k < v.length; k++) {
                                                if (iii < 2) {
                                                    odd.push(
                                                        this.index_list[i].match[ii].odds[iii][v[k] === "3" ? 0 : v[k] === "1" ? 1 : 2].odds
                                                    )
                                                } else {
                                                    for (let j = 0; j < this.index_list[i].match[ii].odds[iii].length; j++) {
                                                        if (v[k] === this.index_list[i].match[ii].odds[iii][j].name) {
                                                            odd.push(this.index_list[i].match[ii].odds[iii][j].odds);
                                                        }
                                                    }
                                                }
                                            }
                                        } else return;
                                    }

                                    if (odd.length !== 0) {
                                        if (odd.length === 1) {
                                            max_jjArr.push(odd[0]);
                                        } else {
                                            this.paixu(odd);
                                            max_jjArr.push(odd[odd.length - 1]);
                                        }
                                        min_jjArr.push(odd[0]);
                                    }

                                }
                            }
                        }

                        let min = 0;
                        let max = 0;

                        min = min_jj(min_jjArr, Math.min.apply(null, this.chuan));
                        for (let i = 0; i < this.chuan.length; i++) {
                            max += max_jj(max_jjArr, this.chuan[i]);
                        }

                        this.min_m = (min * 2 * this.bei).toFixed(2);
                        this.max_m = (max * 2 * this.bei).toFixed(2);
                    } else {
                        this.min_m = 0;
                        this.max_m = 0;
                    }
                }, 800)

            },
            paixu(arr){
                arr.sort((m, n) => m - n);
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

                for (let k = 0; i < this.c[i][_i].length; k++) {
                    this.c[i][_i].pop();
                }

                const data = {
                    index_list: this.index_list,
                    checked: this.checked,
                    play_type: this.play_type,
                    bar_value: this.bar_value,
                };
                localStorage.setItem("jczq_order", JSON.stringify(data));

            },
            del_order(){
                if (this.changshu > 0) {
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
                }
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
                if (this.changshu > 0) {
                    if (this.changshu < 2 && this.play_type !== "FT002") this.global.toast.call(this, "至少选两场");
                    else this.show_footMiddle = !this.show_footMiddle;
                }
            },
            show_popup_option(data, i, k){
                data.index = i;
                data._index = k;
                this.popup_data = data;
                this.popup_c = this.c[i][k].concat();
                this.show_popup = true;
            },
            popup_confirm(){
                let i = this.popup_data.index;
                let _i = this.popup_data._index;

                this.c[i][_i] = [];

                for (let k = 0; k < this.popup_c.length; k++) {
                    this.c[i][_i].push(this.popup_c[k]);
                }

                this.set_changshu();
                this.set_zhushu();
                this.set_jjArr();

            },
            submit(){
                if (this.chuan.length === 0 && this.bar_value) this.global.toast.call(this, "请选择投注方式");
                else if (this.money === 0) console.log("money = 0");
                else {
                    this.$vux.loading.show();

                    const d = {
                        title: [],
                        message: {
                            strand: this.bar_value > 0 ? this.chuan.join() : 0,
                            play_rules: this.play_type,
                            number: this.zhushu,
                            money: this.money,
                            multiple: this.bei * 1
                        }
                    };
                    if (this.play_type !== "FT005") {
                        for (let i = 0; i < this.c.length; i++) {
                            for (let k = 0; k < this.c[i].length; k++) {
                                if (this.c[i][k].length !== 0) {
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
                    } else {
                        for (let i = 0; i < this.c.length; i++) {
                            for (let k = 0; k < this.c[i].length; k++) {
                                const obj = {};
                                obj.team = `${this.index_list[i].match[k].homeTeam}:${this.index_list[i].match[k].awayTeam}`;
                                obj.match = this.index_list[i].match[k].match_id;
                                obj.type = [];

                                for (let j = 0; j < this.c[i][k].length; j++) {
                                    if (this.c[i][k][j].length === 0) continue;

                                    const type = {
                                        lotid: '',
                                        selected: '',
                                    };
                                    const selected = [];

                                    for (let h = 0; h < this.c[i][k][j].length; h++) {
                                        if (this.c[i][k][j][h].length === 0) continue;

                                        if (j === 0) type.lotid = "FT001";
                                        else if (j === 1) type.lotid = "FT006";
                                        else type.lotid = "FT00" + j;

                                        selected.push(this.c[i][k][j][h]);

                                    }
                                    if (selected.length !== 0) {
                                        type.selected = selected.join(",");
                                        obj.type.push(type);
                                    }
                                }
                                if (obj.type.length !== 0) d.title.push(obj);
                            }
                        }
                    }

                    this.global.ajax.call(this, this.play_type !== "FT005" ? "jczq_pay" : 'FT005_pay', d, this.submit_CB);
                }
            },
            submit_CB(d){
                this.$vux.loading.hide();
                if (d.error_code === 1004) this.$router.push(`/recharge?money=${d.data.money}&orderid=${d.data.orderid}&type=${d.error_code}`);
                else if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.global.alert.call(this, "下单成功！");
                    localStorage.clear();
                }
            },
        },
        watch: {
            c(){
                this.set_changshu();
                this.set_zhushu();
                this.set_jjArr();
            },
            chuan(){
                if (this.chuan.length > 0 && this.changshu > this.bar_value) {
                    this.set_zhushu();
                    this.set_jjArr();
                } else {
                    this.zhushu = 0;
                    this.min_m = 0;
                    this.max_m = 0;
                }
            },
            zhushu(){
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
                        this.set_zhushu();
                        this.set_jjArr();
                    }
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
