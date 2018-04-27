<template>
    <div class="detail page" v-if="detail !== null">
        <div class="head">
            <div class="left fl">
                <div class="left_top">
                    <img class="logo fl" :src="detail.logo" alt="">
                    <span class="p_name fl">
                        {{detail.name}}
                    </span>
                    <span class="phase fl" v-if="detail.play_type !== global.product_type.jingcaizuqiu">
                        第{{detail.phase}}期
                    </span>
                </div>
                <div class="left_bttom">
                    <div class="order_money fl">
                        {{detail.pay_money}}元
                        <p>订单金额</p>
                    </div>
                    <div class="winning_money fl">
                        {{detail.winning_money || '0'}}元
                        <p>中奖金额</p>
                    </div>
                </div>
            </div>
            <div class="right fl" :class="'openmatch' + detail.openmatch"></div>
        </div>
        <div class="border"></div>

        <!--双色球-->
        <div class="info" v-if="detail.lotid === global.product_type.shuangseqiu">
            <div class="row">
                <span class="text">投注信息</span>
                <span class="hideText balls">
                 <template v-if="danBall.length > 0">
                    <span class="redText">(</span>
                    <template v-for="(item, index) in danBall">
                        <span class="redText">{{item}}</span>
                 </template>
                    <span class="redText">)</span>
                    </template>
                    <template v-for="(item, index) in redBall">
                        <span class="ball redText">{{item}}</span>
                    </template>
                    <template v-for="(item, index) in blueBall">
                        <span class="ball blueText">{{item}}</span>
                    </template>


                </span>
            </div>
            <div class="row">
                <span class="text">开奖号码</span>
                <template v-if="detail.bonuscode !== ''">
                    <template v-for="(item, index) in detail.bonuscode.split('#')[0].split(',')">
                        <span class="ball redText">{{item}}</span>
                    </template>
                    <span class="ball blueText">{{detail.bonuscode.split('#')[1]}}</span>
                </template>
                <span v-else>未开奖</span>
            </div>

            <div class="quiz" @click="$router.push('/exposition?id=' + global.product_type.shuangseqiu)">
                <span class="text">中奖怎么算？</span>
            </div>

        </div>
        <!--足彩-->
        <div class="info" v-else-if="detail.play_type === global.product_type.jingcaizuqiu">
            足彩
        </div>

        <div class="foot">
            <span class="text">下单时间</span> {{detail.created_at}} <br>
            <span class="text">订单编号</span> {{detail.tc_order_num}} <br>
            <span class="text">温馨提示</span> 奖金直接打入您的账户
        </div>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        data () {
            return {
                detail: null,
                redBall: [],
                blueBall: [],
                danBall: [],
            }
        },
        created(){
            let id = this.$route.query.id;
            if (id.length > 0) {
                this.$vux.loading.show();
                this.global.ajax.call(this, 'order_detail', {id}, this.getData)
            }
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                else if (d.data.length === 1) {
                    if (d.data[0].lotid === this.global.product_type.shuangseqiu) {
                        if (d.data[0].play_type === "103") {
                            this.danBall = d.data[0].data.split("$")[0].split(",");
                            d.data[0].data = d.data[0].data.split("$")[1];
                        }
                        this.blueBall = d.data[0].data.split("#")[1].split(",");
                        this.redBall = d.data[0].data.split("#")[0].split(",");

                        this.detail = d.data[0];
                    }
                }
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
