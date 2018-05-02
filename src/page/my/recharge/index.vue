<template>
    <div class="recharge page">
        <div class="header whiteBg">
            <p>账户： {{user_name}}</p>
            <p>余额： {{amount}}元</p>
        </div>
        <div class="money whiteBg font">
            <p>选择充值金额:</p>
            <div class="option fl">
                <input class="radio" type="radio" value="5000" v-model="money">
                <div class="num">50</div>
            </div>
            <div class="option fl middle">
                <input class="radio" type="radio" value="10000" v-model="money">
                <div class="num">100</div>
            </div>
            <div class="option fl">
                <input class="radio" type="radio" value="20000" v-model="money">
                <div class="num">200</div>
            </div>
            <div class="option fl">
                <input class="radio" type="radio" value="30000" v-model="money">
                <div class="num">300</div>
            </div>
            <div class="option fl middle">
                <input class="radio" type="radio" value="50000" v-model="money">
                <div class="num">500</div>
            </div>
            <div class="option fl">
                <input class="custom" type="tel" :class="custom_money.length > 0 && 'redBorder' " v-model="custom_money"
                       placeholder="自定义金额" @focus="setChecked">
            </div>
        </div>

        <div class="pay_type whiteBg font">
            <div class="item">选择支付方式:</div>
            <div class="item wx">
                微信支付
                <input class="radio" type="radio" v-model="pay_type" value="3">
                <i class="radio_box fr"></i>
            </div>
            <div class="item zfb">
                支付宝支付
                <input class="radio" type="radio" v-model="pay_type" value="5">
                <i class="radio_box fr"></i>
            </div>
        </div>

        <div class="submit redBg btn_active" @click="submit">立即充值</div>
    </div>
</template>

<script>
    import {Icon} from 'vux'
    export default {
        name: 'recharge',
        data () {
            return {
                amount: this.global.cookie.get('amount') || '0.00',
                user_name: this.global.cookie.get('user_name') || '',
                money: "5000",                                          //  单选框的金额 单位分
                custom_money: '',                                       //  自定义的金额 单位元
                pay_type: '3',

                type: 1,                                                //  1: 主动充值& 0：余额不足 充值
                orderid: '',
            }
        },
        created(){
            const query = this.$route.query;
            if (query.type === "1004") {
                this.setChecked();
                this.custom_money = query.money;
                this.type = 0;
                this.orderid = query.orderid;
            }
        },
        methods: {
            setChecked(){
                this.money = "";
            },
            submit(){
                if (this.money === "" && this.custom_money === "") this.global.toast.call(this, "选择金额");
                else if (this.pay_type === "") this.global.toast.call(this, "选择支付方式");
                else {
                    this.$vux.loading.show();
                    let money = this.money === "" ? this.custom_money * 100 : this.money;
                    const global = this.global;

                    let url;
                    let token = global.cookie.get('token');
                    if (this.type) url = `${global.ajax_url.host + global.ajax_url.api.pay}?token=${token}&money=${money * 1}&type=${this.pay_type}`;
                    else url = `${global.ajax_url.host + global.ajax_url.api.pay1004}?token=${token}&money=${money}&type=${this.pay_type}&orderid=${this.orderid}`;
                    window.location.href = url;
                }
            },
        },
        watch: {
            money(val){
                if (val !== "") this.custom_money = "";
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
