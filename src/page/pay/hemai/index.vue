<template>
    <div class="pay_hemai">
        <div class="header">
            <div class="head redBg">
                {{}}合买
                <span class="back abs" @click="$router.back()"></span>
                <span class="help abs" @click="$router.push('/exposition?id=hemai')"></span>
            </div>
        </div>

        <!--总金额-->
        <div class="totalAmount">
            方案总额：2772元
        </div>

        <div class="form">
            <div class="row">
                <div class="fl k">我要认购：</div>
                <input class="money input w188" type="tel" v-model="money" placeholder="278">
                元，最少认购278元
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
                    <option :value="index" v-for="(item, index) in 10 ">{{index}}%</option>

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
                应支付金额：<span class="redText">0.00</span>元
                <div class="abs money">共<span class="redText">278</span>元</div>
                <div class="abs btn redBg">发起和买</div>
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
            }
        },
        created(){

        },
        methods: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
