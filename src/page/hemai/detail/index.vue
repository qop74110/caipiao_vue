<template>
    <div class="hemai_detail" v-if="datas !== null">
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
                <p class="c3" v-if="isFootball">竞彩足球</p>
                <p class="c3" v-else>{{datas.name}}</p>
                <p class="phase c6" v-if="isFootball && lotid !== 'FT005'">{{datas.phase.split("*")[0]}}</p>
                <p class="phase c6" v-else-if="lotid === 'FT005'">{{datas.matchs.split("*")[0]}}</p>

                <p class="phase c6" v-else>{{datas.phase}}</p>

            </div>
            <div class="fr time">
                <div class="redText money c3">{{countDown}}</div>
                <div class="text c6">距离截止</div>
            </div>
        </div>

        <!-- 进度 & 我的认购（元）& 订单状态
         <ul class="top2">
         <li class="fl">
         <span class="redText c3">{{datas.progress}}</span>
         <p class="text">进度</p>
         </li>
         <li class="fl">
         <span class="c3">{{}}</span>
         <p class="text">我的认购（元</p>
         </li>
         <li class="fl"></li>
         </ul>-->

        <!--金额状态： 总金额 & 已购金额 & 剩余金额 & 进度-->
        <ul class="top2 top">
            <li class="fl">
                <p class="c3">{{datas.pay_money_total}}</p>
                <p class="text c6">总金额(元)</p>
            </li>
            <li class="fl">
                <p class="c3">{{datas.percentage}}</p>
                <p class="text c6">已购金额(元)</p>
            </li>
            <li class="fl">
                <p class="c3">{{datas.remaining_money}}</p>
                <p class="text c6">剩余金额(元)</p>
            </li>
            <li class="fl">
                <p class=" redText">{{datas.progress}}%</p>
                <p class="text c6">进度</p>
            </li>
        </ul>

        <!--发起人信息-->
        <div class="user_data grayBox">
            <p class="row">
                <span class="k">发<b class="em"></b>起<b class="em"></b>人:</span>
                <span class="redText">{{datas.user}}</span>
            </p>
            <p class="row">
                <span class="k">中奖记录:</span>
                <span class="c3">{{`中奖${datas.winning_num}次，中奖 `}}</span>
                <span class="redText">{{datas.winning_money_total}}元</span>
            </p>
            <p class="row">
                <span class="k">订单保底:</span>
                <span class="c3">{{datas.baseline_money}}元</span>
            </p>
            <p class="row">
                <span class="k">发单提成:</span>
                <span class="c3">{{datas.cut}}%</span>
            </p>
        </div>

        <!--投注信息-->
        <div class="order_data">
            <div class="order_head tag">
                <span class="k">投注信息</span>
                <!--1=完全公开 2=参与可见 3=截止后可-->
                <span class="c9">{{datas.type === '1' ? '完全公开': datas.type === '2' ? '参与可见': '截止后可看'}}</span>

                <span class="arrow fr" @click="show_order_body = !show_order_body" :class="show_order_body && 'rotate'"
                      v-if="datas.type === '1'"></span>
            </div>
            <div class="order_body" v-if="datas.type === '1' && show_order_body">

                <!--双色球-->
                <!--<div class="style1" v-if="lotid === 'ssq'">-->
                <div class="style1" v-if="/ssq|dlt/.test(lotid)">
                    <div class="row style1" v-for="(i, ind) in datas.data">
                        <div class="fl l c6">
                            <!--101=单式 102=复式 103=胆拖-->
                            {{i.play_type === "101" ? '单式' :
                            i.play_type === "102" ? '复式' : '胆拖'
                            }}{{i.multiple}}倍
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
                    </div>
                </div>

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
                        <div class="fr">
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
                        <div class="td l1">{{i.selected}}</div>
                        <div class="td l1">{{i.result}}</div>
                    </div>
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
                        <div class="td">等待开奖</div>
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
        </div>

        <!--剩余份数-->
        <div class="surplus">
            剩余份数: <span class="redText">{{datas.remaining_money}}份</span> (1元/份)
            <XNumber class="fr" input_w="1.4" :_val="yuan" name="yuan" h=".68" @on-change="setVal"></XNumber>
        </div>


        <footer class="footer">
            <!--<div class="foot redBg">方案已满员，下次出手要快点了！</div>-->
            <div class="foot whiteBg">
                <span class="quanbao redText" @click="pay('all')">全包</span>
                共<span class="redText">300</span>元
                <span class="pay btn_active redBg" @click="pay">支付</span>
            </div>
        </footer>
    </div>
</template>

<script>
    import {dateFormat} from 'vux';
    import {XNumber} from "com";

    export default {
        name: 'hemai_detail',
        components: {XNumber},
        data () {
            return {
                datas: null,
                countDown: "",              //  倒计时
                counDown_time: null,        //  倒计时计时器

                show_wieh_body: false,      //  显示跟单详情
                show_order_body: false,     //  显示投注信息

                yuan: 1,

                lotid: null,
                isFootball: null,
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, 'hemai_idetails', {id: this.$route.query.id}, this.getData);
            const lotid = this.$route.query.lotid;
            this.lotid = lotid;
            this.isFootball = /FT/.test(lotid);
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.setTime(d.data.date * 1000);

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
                            if (this.lotid === "p5" || (this.lotid === "3d" && /201|221|215/.test(item.play_type)) || (this.lotid === "201" && item.play_type === "201")) {
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
            setTime(time){
                const timestamp = Date.parse(new Date());           //  当前时间戳
                let t = time - timestamp;
                const _this = this;
                this.countDown_time = setInterval(() => {
                    t -= 1000;
                    const _h = 3600000;
                    const _m = 60000;
                    const h = parseInt(t / _h);
                    const m = parseInt(( t - h * _h ) / _m);
                    const s = parseInt((t - h * _h - m * _m) / 1000);

                    _this.countDown = `${h}:${m > 10 ? m : "0" + m}:${s > 10 ? s : "0" + s}`;
                }, 1000)
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
                    this.$router.push("/pay_success?id=" + d.data.order_id + "&type=" + d.data.type + "&lotid=" + d.data.lotid)
                }
            },
            share(){
                this.global.share.call(this)
            }
        },
        destroyed(){
            clearInterval(this.countDown_time);
            this.countDown_time = null;
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
