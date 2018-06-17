<template>
    <div class="balance">
        <div class="header whiteBg">
            <div class="h1">账户余额： <span class="resText">{{list.money}}</span>元</div>
            <div class="h1">冻结金额： {{list.frost_cash}}元</div>
        </div>
        <ul class="list whiteBg" v-if="list.info">
            <li class="item" v-for="(i, index) in list.info" :key="index">
                <div class="title">{{i.desc}}</div>
                <div class="time">{{i.created_at}}</div>
                <div class="money" :class="i.type === 2 ? 'redText': 'greenText'">{{i.amount}}元</div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'balance',
        data () {
            return {
                list: {
                    money: '加载中',
                    frost_cash: '加载中',
                    info: []
                }
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, 'my_log', {}, this.getList)
        },
        methods: {
            getList(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    console.log(JSON.stringify(d.data))
                    this.list = d.data;
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
