<template>
    <div class="pay_success">
        <div class="success">
            订单支付成功！
        </div>

        <div class="btn redBg" @click="$router.push('home')">继续购买</div>
        <div class="btn redBg" @click="go_order">查看订单</div>
    </div>
</template>

<script>
    export default {
        name: 'pay_success',
        data () {
            return {
                id: null,
                type: null,
            }
        },
        created(){
            const query = this.$route.query;
            this.id = query.id;
            this.type = query.type;
        },
        methods: {
            go_order(){
                const t = this.type;
                let url = "/order/";
//                t ===   0 : 合买；     1：追号；       2： 普通
                if (t > 2) url += "hemai";
                else if (t > 1) url += "detail_tow";
                else if (t > 0) url += "detail";
                this.$router.push(url + "?id=" + this.id)

            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";

</style>
