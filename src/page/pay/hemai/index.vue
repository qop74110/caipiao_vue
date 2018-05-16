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

        <div class="footer">
            <div class="foot">
                应支付金额：<span class="redText">0.00</span>元
                <div class="abs money">共<span class="redText">278</span>元</div>
                <div class="abs btn redBg">发起和买</div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'pay_hemai',
        data () {
            return {}
        },
        created(){

        },
        methods: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
