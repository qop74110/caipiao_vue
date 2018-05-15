<template>
    <div class="hemai_detail">
        <header class="head">
            <div class="head_t redBg">
                合买详情
                <span class="share abs"></span>
                <span class="back abs"></span>
            </div>
        </header>

        <footer class="footer">
            <!--<div class="foot redBg">去合买</div>-->
            <div class="foot whiteBg">
                <span class="quanbao redText">全包</span>
                共<span class="redText">300</span>元
                <span class="pay btn_active redBg">支付</span>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'hemai_detail',
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
