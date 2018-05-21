<template>
    <div class="payment">
        <div class="row">
            <div class="fl k">订单金额</div>
            <div class="fr c6">32元</div>
        </div>

        <div class="border"></div>

        <!--<div class="row bb">-->
        <!--<div class="fl k">选择支付方式</div>-->
        <!--</div>-->

        <!--<div class="row bb label">-->
        <!--<div class="fl wx bg k">微信支付</div>-->
        <!--<input type="radio" value="">-->
        <!--<div class="fr radio"></div>-->
        <!--</div>-->

        <!--<div class="row label">-->
        <!--<div class="fl zfb bg k">支付宝支付</div>-->
        <!--<input type="radio" value="">-->
        <!--<div class="fr radio"></div>-->
        <!--</div>-->

        <!--<div class="border"></div>-->

        <div class="row" @click="seeHongbao">
            <div class="fl c6 k">红包抵用券</div>
            <div class="fr money c0" v-if="hongbao !== null">-¥ {{hongbao.amount}}.00</div>
            <div class="fr money c9" v-else >选择红包</div>
        </div>

        <div class="redBg submit" @click="submit">立即支付</div>


    </div>
</template>

<script>
    export default {
        name: 'payment',
        data () {
            return {
                order: null,
                lotid: null,
                hongbao: null,
            }
        },
        created(){
            this.lotid = this.$route.query.lotid || "";
            this.getOrder();
            this.getHongbao();
        },
        methods: {
            getOrder(){
            },
            getHongbao(){
                const red_packet = sessionStorage.getItem('red_packet') || "{}";
                if (red_packet !== "{}") {
                    this.hongbao = JSON.parse(red_packet);
                }
            },
            seeHongbao(){
                this.$router.push('/hongbao?lotid=' + this.lotid)
            },
            submit(){

            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
