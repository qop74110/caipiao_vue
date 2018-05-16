<template>
    <div class="pay_success">
        <div class="success">
            订单支付成功！
        </div>

        <div class="btn redBg" @click="$router.push('home')">继续购买</div>
        <div class="btn redBg" @click="$router.push('/order/detail?id=')">查看订单</div>
    </div>
</template>

<script>
    export default {
        name: 'pay_success',
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
