<template>
    <div class="pay_hemai">
        <div class="header">
            <div class="head redBg">
                {{title}}合买
                <span class="back abs" @click="$router.back()"></span>
                <span class="help abs" @click="$router.push('/exposition?id=hemai')"></span>
            </div>
        </div>

        <!--总金额-->
        <div class="totalAmount">
            方案总额：{{order.money || 0}}元
        </div>

        <div class="form">
            <div class="row">
                <div class="fl k">我要认购：</div>
                <input class="money input w188" type="tel" v-model="money"
                       :placeholder=" Math.ceil( (order.money || 0) / 10)">
                元，最少认购{{ Math.ceil( (order.money || 0) / 10) }}元
            </div>
            <div class="row">
                <div class="fl k">保密设置：</div>
                <div class="fl typeBox w64">
                    <label class="label" :class="type === 1 && 'redBg active'">
                        <input class="type" type="radio" name="type" v-model="type" :value="1">
                        完全公开
                    </label>
                    <label class="label" :class="type === 2 && 'redBg active'">
                        <input class="type" type="radio" name="type" v-model="type" :value="2">
                        参与可见
                    </label>
                    <label class="label" :class="type === 3 && 'redBg active'">
                        <input class="type" type="radio" name="type" v-model="type" :value="3">
                        截止后可见
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="fl k">提成比例：</div>
                <select class="cut input w188" v-model="cut">
                    <option :value="index" v-for="(item, index) in 9 ">{{index}}%</option>

                </select>
            </div>
            <div class="row">
                <div class="fl k">我要保底：</div>
                <input class="baseline_money input w188" type="tel" v-model="baseline_money" placeholder="默认0">
                元，可不保底
            </div>
            <div class="row">
                <div class="fl k">合买宣言：</div>
                <input class="declaration input w64" type="text" v-model="declaration" placeholder="想中奖的，跟我来！">
            </div>
        </div>

        <footer class="footer">
            <div class="foot">
                应支付金额：<span class="redText">{{(money * 1 + baseline_money * 1) || 0}}</span>元
                <div class="abs money">共<span class="redText">{{order.money || 0}}</span>元</div>
                <div class="abs btn redBg" @click="hemai">发起和买</div>
            </div>
        </footer>

    </div>
</template>

<script>
    export default {
        name: 'pay_hemai',
        data () {
            return {
                money: "",
                type: 1,                //  1=完全公开 2=参与可见 3=截止后可见
                baseline_money: "",     //  保底金额
                cut: 0,                 //  提成比例
                declaration: '',        //  合买宣言

                title: '',
                order: null,
            }
        },
        created(){
            this.title = this.$route.query.title || '';
            const order = sessionStorage.getItem('together_order') || "{}";
            if (order !== "{}") this.getOrder(order);
            else this.global.toast.call(this, "暂无订单")

        },
        methods: {
            getOrder(order){
                this.order = JSON.parse(order);
            },
            submit(){
                const min_money = Math.ceil((this.order.money || 0) / 10);
                const baseline_money = this.baseline_money || 0;
                if (this.money < min_money) this.global.toast.call(this, "认购金额最小为" + min_money);
                else if (!/^[0-9]\d*$/.test(baseline_money)) this.global.toast.call(this, "保底金额格式错误");
                else {
                    const quota = this.money * 1 + this.baseline_money * 1;
                    if (quota >= this.order.money) this.global.toast.call(this, "金额错误");
                    else {

                        const d = this.order;
                        d.quota = quota;
                        d.set = this.type;
                        d.declaration = this.declaration || "想中奖的，跟我来！";
                        d.cut = this.cut;
                        d.baseline_money = baseline_money;
                        d.is_together = 2;

                        sessionStorage.setItem('pay_data', JSON.stringify(d));
                        this.$router.push("/payment?lotid=" + this.$route.query.lotid);
                    }
                }
            },
            hemai(){
                const min_money = Math.ceil((this.order.money || 0) / 10);
                const baseline_money = this.baseline_money || 0;
                if (this.money < min_money) this.global.toast.call(this, "认购金额最小为" + min_money);
                else if (!/^[0-9]\d*$/.test(this.money)) this.global.toast.call(this, "认购金额格式错误");
                else if (!/^[0-9]\d*$/.test(baseline_money)) this.global.toast.call(this, "保底金额格式错误");
                else {
                    const quota = this.money * 1 + this.baseline_money * 1;
                    if (quota > this.order.money) this.global.toast.call(this, "金额错误");
                    else if (this.money >= this.order.money) this.global.toast.call(this, "认购金额必须小于总金额");
                    else {
                        this.$vux.loading.show();

                        const d = this.order;
                        d.quota = quota;
                        d.set = this.type;
                        d.declaration = this.declaration || "想中奖的，跟我来！";
                        d.cut = this.cut;
                        d.baseline_money = baseline_money;
                        d.is_together = 2;

                        this.global.ajax.call(this, this.$route.query.lotid + "_order", d, this.heamai_BC)
                    }
                }
            },
            heamai_BC(d){
                this.$vux.loading.hide();
                if (d.error_code === 1004) this.$router.push(`/recharge?money=${d.data.money}&orderid=${d.data.orderid}&type=${d.error_code}`);
                else if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    localStorage.clear();
                    this.$router.push("/pay_success?id=" + d.data.order_id + "&type=" + d.data.type + "&lotid=" + d.data.lotid)
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
