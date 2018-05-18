<template>
    <div class="hg_help">
        <XHead :show_mord="false" :show_title_option="false">红包/兑换说明</XHead>

        <div class="list">
            <div class="itme">
                <div class="title" @click="show1 = !show1">红包说明
                    <span class="arrow fr" :class="show1 && 'rotate'"></span>
                </div>
                <div class="body" v-show="show1">
                    1. 什么是红包？

                    <p class="p">红包用于彩票投注，有全额抵扣、满额减免等形式。每次购彩时优先从红包中扣款。</p>

                    2. 如何获得红包？

                    <p class="p">您可以通过参与活动或兑换的方式获得红包：</p>

                    <p class="p">(1)参与活动：您可以参与平台推出的运营活动。</p>

                    <p class="p">(2) 兑换红包：如果您通过各种活动获得了红包兑换码，请在页面上方输入栏输入兑换码进行兑换。</p>

                    3. 如何使用红包？

                    <p class="p">当您在投注下单时，如果订单符合满额减免或全额抵扣等条件，会自动出现“红包支付”页面，您可以选择使用红包，直接抵扣XX元使用。</p>

                    4. 注意事项

                    <p class="p">(1) 每笔订单只能使用1个红包，红包剩余金额可再次使用。</p>

                    <p class="p">(2) 满额减免红包不能用于追号。</p>

                    <p class="p">(3) 每个红包都有有效期，请在有效期内使用！</p>

                    <p class="p">(4) 红包只可用于购彩，不能提现。</p>
                </div>
            </div>
            <div class="itme">
                <div class="title" @click="show2 = !show2">兑换说明
                    <span class="arrow fr" :class="show2 && 'rotate'"></span>
                </div>
                <div class="body" v-show="show2">
                    没内容没内容没内容没内容没内容没内容没内容没内容没内容没内容没内容没内容
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {XHead} from "com";
    export default {
        name: 'hg_help',
        components: {
            XHead
        },
        data () {
            return {
                show1: false,
                show2: false,
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
