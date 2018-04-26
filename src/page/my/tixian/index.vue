<template>
    <div class="tixian page">
        <div class="header">
            <div class="row">
                可提金额: <span class="redText">{{balance}}</span>
            </div>
            <div class="row">
                提现金额: <input class="money" type="tel" v-model="money" placeholder="余额不足10元，无法提现">
            </div>
            <div class="row bank" @click="selectBank">
                提现银行卡:
                <span v-if="state === 3">{{'招商银行（1234）'}}</span>
            </div>
        </div>

        <div class="submit btn_active redBg">提现</div>

        <div class="explain">
            <p class="text">1.每个账户每天至多提现3次，提现金额至少10元</p>
            <p class="text">2.红包不可提取，中奖奖金可全部提现</p>
            <p class="text">3.非活动充值，充值金额30天后可申请提现</p>
            <p class="text">4.追号撤销等退款的70%可提现、30%不可提现</p>
            <p class="text">5.每日凌晨0:50-1:20提现申请会有短暂延时，请耐心等候</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tixian',
        data () {
            return {
                balance: '0.00',
                money: '',
                state: 1,               //  0=全部绑定 1=全部没绑定 2=身份证为空 3=银行卡为空
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, 'bindState', {}, this.getState)
        },
        methods: {
            getState(d){
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data.status !== undefined) {
                    this.state = d.data.status;
                    if (d.data.status === 0) {
                        this.getData();
                        return;
                    }
                }
                this.$vux.loading.hide();
            },
            getData(){
                this.global.ajax.call(this, '', {}, (d) => {
                    this.$vux.loading.hide();
                    if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
//                    else if (d.data.status !== undefined) {
//
//                    }
                    // todo 接口回调
                })
            },
            selectBank(){
                if (this.state !== 3) this.$router.push('bindID');
                else {
                    // todo 选择银行
                }
            },

        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
