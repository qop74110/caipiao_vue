<template>
    <div class="payment">
        <div class="row">
            <div class="fl k">订单金额</div>
            <div class="fr c6">{{order.quota || order_money}}元</div>
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
            <div class="fr money c9" v-else>选择红包</div>
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
                const pay_data = sessionStorage.getItem('pay_data') || "{}";
                if (pay_data !== "{}") {
                    this.order = JSON.parse(pay_data);
                } else this.global.toast.call(this, "暂无订单");
            },
            getHongbao(){
                const red_packet = sessionStorage.getItem('red_packet') || "{}";
                if (red_packet !== "{}") {
                    this.hongbao = JSON.parse(red_packet);
                }
            },
            seeHongbao(){
                sessionStorage.removeItem('red_packet');
                this.$router.push('/hongbao?lotid=' + (this.lotid === "jczq" ? "ftb" : this.lotid) + "&money=" + this.order.quota || this.order_money);
            },
            submit(){
                this.$vux.loading.show();
                if (this.hongbao !== null) this.order.red_id = this.hongbao.id;
                this.global.ajax.call(this, this.$route.query.lotid + "_order", this.order, this.sub_CB)
            },
            sub_CB(d){
                this.$vux.loading.hide();
                if (d.error_code === 1004) this.$router.push(`/recharge?money=${d.data.money}&orderid=${d.data.orderid}&type=${d.error_code}`);
                else if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    localStorage.clear();
                    sessionStorage.clear();
                    this.$router.push("/pay_success?id=" + d.data.order_id + "&type=" + d.data.type + "&lotid=" + d.data.lotid)
                }
            }
        },
        destroyed(){
            sessionStorage.removeItem('red_packet');
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
