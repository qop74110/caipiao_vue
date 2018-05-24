<template>
    <div class="order_hemai" v-if="datas !== null">
        <header class="head">
            <div class="head_t redBg">
                合买详情
                <span class="share abs" @click="share"></span>
                <span class="back abs" @click="$router.go(-1)"></span>
            </div>
        </header>

        <!--彩种&截止时间-->
        <div class="top1 top">
            <div class="fl">
                <img :src="datas.logo" class="logo">
            </div>
            <div class="fl c_name">
                <!--<p class="c3" v-if="isFootball">竞彩足球</p>-->
                <!--<p class="c3" v-else>{{datas.name}}</p>-->
                <p class="c3">{{datas.name}}</p>
                <p class="phase c6" v-if="isFootball && lotid !== 'FT005'">{{datas.phase.split("*")[0]}}期</p>
                <p class="phase c6" v-else-if="lotid === 'FT005'">{{datas.matchs.split("*")[0]}}期</p>

                <p class="phase c6" v-else>{{datas.phase}}期</p>

            </div>
            <div class="fr time">
                <div class="redText money" v-if="datas.winning_money === -1 " style="line-height: .5rem; font-size: .3rem;">
                    <div>稍后会有工作</div>
                    <div>人员主动联系您</div>
                </div>
                <div class="redText money" v-else>
                    {{ datas.winning_money + '元'}}
                </div>
                <div class="text c6">我的奖金</div>
            </div>
        </div>

        <!--进度 & 我的认购（元）& 订单状态-->
        <ul class="top3">
            <li class="fl">
                <span class="redText">{{datas.progress}}%</span>
                <p class="text c6">进度</p>
            </li>
            <li class="fl">
                <span class="c3">{{datas.quota}}</span>
                <p class="text c6">我的认购(元)</p>
            </li>
            <li class="fl">
                <span class="c3">{{datas.s}}</span>
                <p class="text c6">订单状态</p>
            </li>
        </ul>


        <!--发起人信息-->
        <div class="user_data grayBox">
            <p class="row">
                <span class="k">发<b class="em"></b>起<b class="em"></b>人:</span>
                <span class="redText">{{datas.user}}</span>
            </p>
            <p class="row">
                <span class="k">订单保底:</span>
                <span class="c3">{{datas.baseline_money}}元</span>
            </p>
            <p class="row">
                <span class="k">发单提成:</span>
                <span class="c3">{{datas.cut}}%</span>
            </p>
            <p class="row" v-if="datas.bouns !== ''">
                <span class="k">开奖号码:</span>
                <span class="c3" v-if="lotid !== 'ssq' && lotid !== 'dlt'">
                    <span class="redText" v-for="(k, j) in datas.bouns.split(',')">{{k}} </span>
                </span>
                <span class="c3" v-else>
                    <span class="redText" v-for="(k, j) in datas.bouns.split('#')[0].split(',')">{{k}} </span>
                    <span class="blueText" v-for="(k, j) in datas.bouns.split('#')[1].split(',')">{{k}} </span>
                </span>
            </p>
        </div>

        <!--投注信息-->
        <div class="order_data">
            <div class="order_head tag">
                <span class="k">投注信息</span>
                <!--1=完全公开 2=参与可见 3=截止后可-->
                <span class="c9">{{datas.type === '1' ? '完全公开': datas.type === '2' ? '参与可见': '截止后可看'}}</span>

                <span class="arrow fr" @click="show_order_body = !show_order_body" :class="show_order_body && 'rotate'"
                      v-if="datas.data.length > 0"></span>
            </div>
            <div class="order_body" v-if="datas.data.length > 0 && show_order_body">

                <!--双色球-->
                <div class="style1" v-if="/ssq|dlt/.test(lotid)">
                    <div class="row style1" v-for="(i, ind) in datas.data">
                        <div class="fl l c6">
                            <!--101=单式 102=复式 103=胆拖-->
                            {{i.play_type === "101" ? '单式' :
                            i.play_type === "102" ? '复式' : '胆拖'
                            }}
                        </div>
                        <div class="fl balls">
                            <template v-if="i.danBall">
                                <span class="redText">(</span>
                                <template v-for="(_item, index) in i.danBall">
                                    <span class="redText ball">{{_item}}</span>
                                </template>
                                <span class="redText">)</span>
                            </template>
                            <template v-for="(_item, index) in i.redBall">
                                <span class="ball redText">{{_item}}</span>
                            </template>
                            <template v-for="(_item, index) in i.blueBall">
                                <span class="ball blueText">{{_item}}</span>
                            </template>
                        </div>
                        <div class="fr" :class="i.type === 2 && 'jiang'">
                            {{i.multiple}}倍
                        </div>
                    </div>
                </div>

                <!--3d-->
                <div class="style1" v-else-if="/3d|p5|p3/.test(lotid)">
                    <div class="row style1" v-for="(i, ind) in datas.data">
                        <div class="fl l c6" v-if="lotid === '3d'">
                            <!--201=直选单式 221=直选复式 202=组选单式  231=组三复式 233=组六复式-->
                            {{i.play_type === "201" ? "直选单式":
                            i.play_type === "221" ? '直选复式':
                            i.play_type === "231" ? '组三复式' :
                            i.play_type === "215" ? '直选位选' :
                            '组六复式'}}
                        </div>
                        <div class="fl l c6" v-else-if="lotid === 'p5'">
                            <!--101=单式 102=复式-->
                            {{i.play_type === "101" ? "直选单式": '直选复式'}}
                        </div>
                        <div class="fl l c6" v-else>
                            <!--201=组六 202=组选 203=组三 204=组六-->
                            {{i.play_type === "201" ? "直选":
                            i.play_type === "202" ? '组选':
                            i.play_type === "203" ? '组三' : '组六'}}
                        </div>
                        <div class="fl balls">
                            <span class="redText ball">{{i.bouns}}</span>
                        </div>
                        <div class="fr" :class="i.type === 2 && 'jiang'">
                            {{i.multiple}}倍
                        </div>

                    </div>
                </div>

                <!--竞彩足球-->
                <div class="style2" v-else-if="isFootball">
                    <div class="th row c6">
                        <div class="td">场次</div>
                        <div class="td">主队VS客队</div>
                        <div class="td">玩法</div>
                        <div class="td">投注(出票赔率)</div>
                        <div class="td">彩果</div>
                    </div>
                    <div class="tr row" v-for="(i, index) in datas.data">
                        <div class="td l2">
                            周{{i.week}}
                            <p>{{i.te}}</p>
                        </div>
                        <div class="td blue l3">
                            {{i.na.split(':')[0]}}
                            <p>VS</p>
                            {{i.na.split(':')[1].split("*")[0]}}
                        </div>
                        <div class="td l1">{{i.play}}</div>
                        <div class="td l1 selected">
                            <div v-for="(k, j) in i.selected.split(',')">
                                {{k}}
                            </div>
                        </div>
                        <div class="td l1">{{i.result}}</div>
                    </div>
                </div>

            </div>
        </div>

        <div class="order_margin"></div>

        <!--派单详情-->
        <div class="paidan">
            <div class="paidan_head tag">
                <span class="k">派单详情</span>

                <span class="arrow fr" @click="show_paidan_body = !show_paidan_body"
                      :class="show_paidan_body && 'rotate'"></span>
            </div>
            <div class="paidan_body c3" v-show="show_paidan_body">
                <div class="row">
                    <div class="fl"></div>
                    <div class="fl">金额/比例</div>
                    <div class="fl">奖金</div>
                </div>
                <div class="row">
                    <div class="fl">订单金额</div>
                    <div class="fl">{{datas.pay_money_total}}元</div>
                    <div class="fl">{{datas.winning_money_total}}元</div>
                </div>
                <div class="row">
                    <div class="fl">发起人提成</div>
                    <div class="fl">{{datas.cut}}%</div>
                    <div class="fl">{{datas.extract}}元</div>
                </div>
            </div>
        </div>
        <div class="order_margin"></div>

        <!--跟单详情-->
        <div class="with ">
            <div class="wieh_head tag">
                <span class="k">跟单详情:</span>
                {{datas.number}}人跟单

                <span class="arrow fr" @click="show_wieh_body = !show_wieh_body"
                      :class="show_wieh_body && 'rotate'"></span>
            </div>
            <div class="wieh_body" v-show="show_wieh_body">
                <div class="tHead tr">
                    <div class="td">用户</div>
                    <div class="td">认购分数</div>
                    <div class="td">认购时间</div>
                    <div class="td">奖金分配</div>
                </div>
                <div class="tBody">
                    <div class="tr" v-for="(i, ind) in datas.info">
                        <div class="td hideTest">{{i.user_name}}</div>
                        <div class="td">{{i.pay_money_total}}元</div>
                        <div class="td">{{i.created_at}}</div>
                        <div class="td">{{datas.openmatch === "3" ? i.winning_money : datas.s}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!--订单信息-->
        <div class=" grayBox">
            <p class="row">
                <span class="k">订单编号:</span>
                {{datas.together_id}}
            </p>
            <p class="row">
                <span class="k">合买宣言:</span>
                {{datas.declaration}}
                </span>
            </p>
            <p class="row">
                <span class="k">发起时间:</span>
                {{datas.created_at}}
            </p>
            <p class="row">
                <span class="k">截止时间:</span>
                {{datas.stopTime}}
            </p>
            <!--<p class="row"><span class="k">合买说明:</span>{{datas.cut}}</p>-->

            <!--删除订单-->
            <div class="delOrder redText" @click="del_order" v-if="datas.st !== 1">删除订单</div>
        </div>


        <!--剩余份数-->
        <div class="surplus" v-if="datas.st === 1">
            剩余份数: <span class="redText">{{datas.remaining_money}}份</span> (1元/份)
            <XNumber class="fr" input_w="1.4" :_val="yuan" name="yuan" h=".68" @on-change="setVal" :max_val="datas.remaining_money"></XNumber>
        </div>


        <footer class="footer">

            <div class="foot whiteBg" v-if="datas.st === 1">
                <span class="quanbao redText" @click="pay('all')">全包</span>
                共<span class="redText">{{datas.remaining_money}}</span>元
                <span class="pay btn_active redBg" @click="pay">支付</span>
            </div>

            <div class="foot redBg" v-else @click="$router.push('/hemai')">去合买</div>
            <!--<div class="foot redBg"  @click="$router.push('/hemai')">去合买</div>-->
        </footer>
    </div>
</template>

<script>
    import {dateFormat} from 'vux';
    import {XNumber} from "com";

    export default {
        name: 'order_hemai',
        components: {XNumber},
        data () {
            return {
                datas: null,
//                countDown: "",              //  倒计时
//                counDown_time: null,        //  倒计时计时器

                show_wieh_body: false,      //  显示跟单详情
                show_order_body: false,     //  显示投注信息
                show_paidan_body: false,    //  显示派单详情

                yuan: 1,

                lotid: null,
                isFootball: null,
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, 'order_hemai', {id: this.$route.query.id}, this.getData);
            const lotid = this.$route.query.type;
            this.lotid = lotid;
            this.isFootball = /FT/.test(lotid);
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.setOrderState(d.data);
                    if (/ssq|dlt/.test(this.lotid)) {              //  双色球
                        d.data.data.forEach((item, i) => {
                            if (item.bouns.indexOf('$') !== -1) {
                                const arr = item.bouns.split("$");
                                d.data.data[i].danBall = arr[0].split(",");
                                d.data.data[i].bouns = arr[1];
                            }
                            const arr = item.bouns.split("#");
                            d.data.data[i].blueBall = arr[1].split(",");
                            d.data.data[i].redBall = arr[0].split(",");
                        })

                    } else if (/3d|p5|p3/.test(this.lotid)) {           //  福彩3d 排3 排5
                        d.data.data.forEach((item, i) => {
                            if (this.lotid === "p5" || (this.lotid === "3d" && /201|221|215/.test(item.play_type)) || (this.lotid === "p3" && item.play_type === "201")) {
                                let str = '';
                                const num = item.bouns.split(',');
                                for (let k = 0; k < num.length; k++) {
                                    for (let j = 0; j < num[k].length; j++) {
                                        str += num[k][j];
                                        if ((j === num[k].length - 1) && k !== num.length - 1) str += "|";
                                        else if (j !== num[k].length - 1) str += ","
                                    }
                                }
                                d.data.data[i].bouns = str;
                            }
                        })
                    }

                    d.data.stopTime = dateFormat(d.data.date * 1000);
                    this.datas = d.data;
                }
            },
            setOrderState(d){

                let s = "", st = null;
                if (d.status === 4) {
                    if (d.openmatch === '0') {
                        s = "等待开奖";
                        st = 1;
                    } else if (d.openmatch === '2') {
                        st = 2;
                        s = "未中奖";
                    } else if (d.openmatch === '3') {
                        st = 3;
                        s = "中奖 ";
                    }
                } else if (d.status === 2) {
                    s = "委托中";
                    st = 1;
                } else {
                    st = 0;
                    s = "委托失败";
                }

                d.s = s;
                d.st = st;
            },
            setVal(d){
                this[d.name] = d.val;
            },
            pay(s = ""){
                this.$vux.loading.show();
                let money = s === "all" ? this.datas.remaining_money : this.yuan;
                this.global.ajax.call(this, 'hemai_pay', {
                    id: this.$route.query.id,
                    money
                }, this.pay_CB)
            },
            pay_CB(d){
                this.$vux.loading.hide();
                if (d.error_code === 1004) this.$router.push(`/recharge?money=${d.data.money}&orderid=${d.data.orderid}&type=${d.error_code}`);
                else if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.$router.push("/pay_success?id=" + d.data.order_id + "&type=" + d.data.type)
                }
            },
            share(){
                this.global.share.call(this)
            },

            del_order(){
                const _this = this;
                this.$vux.confirm.show({
                    content: "删除后本订单将无法还原",
                    onConfirm () {
                        _this.$vux.loading.show();
                        _this.global.ajax.call(_this, 'order_del', {
                            id: _this.$route.query.id,
                            type: 3
                        }, _this.del_order_CB);
                    }
                })
            },
            del_order_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.global.alert.call(this, "删除成功");
                    this.$router.back();
                }
            },
        },
        destroyed(){
            clearInterval(this.countDown_time);
            this.countDown_time = null;
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "index.less";
</style>
