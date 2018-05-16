<template>
    <div class="hemai_detail" v-if="datas !== null">
        <header class="head">
            <div class="head_t redBg">
                合买详情
                <span class="share abs"></span>
                <span class="back abs" @click="$router.go(-1)"></span>
            </div>
        </header>

        <!--彩种&截止时间-->
        <div class="top1 top">
            <div class="fl">
                <img :src="datas.logo" class="logo">
            </div>
            <div class="fl c_name">
                <p class="c3">{{datas.name}}</p>
                <p class="phase c6">{{datas.phase}}</p>
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
                <span class="c3">{{datas.baseline_money}}</span>
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
                <span class="c9">{{datas.type === 1 ? '完全公开': datas.type === 2 ? '参与可见': '截止后可看'}}</span>
            </div>
            <div class="order_body" v-if="datas.type === 1">
                <!--todo 合买详情-投注信息-->
            </div>
        </div>

        <div class="order_margin"></div>

        <!--跟单详情-->
        <div class="with ">
            <div class="wieh_head tag">
                <span class="k">投注信息:</span>
                {{datas.number}}人跟单
            </div>
            <div class="wieh_body grayBox">
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
        </div>

        <!--剩余份数-->
        <div class="surplus">
            剩余份数: <span class="redText">{{datas.remaining_money}}份)</span>  (1元/份)
            <XNumber class="fr" input_w="1.4" :_val="yuan" name="yuan" h=".68" @on-change="setVal"></XNumber>
        </div>


        <footer class="footer">
            <!--<div class="foot redBg">方案已满员，下次出手要快点了！</div>-->
            <div class="foot whiteBg">
                <span class="quanbao redText">全包</span>
                共<span class="redText">300</span>元
                <span class="pay btn_active redBg">支付</span>
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

                yuan: 1,
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, 'hemai_idetails', {id: this.$route.query.id}, this.getData);
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.setTime(d.data.date * 1000);

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
