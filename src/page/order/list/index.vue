<template>
    <div class="order_list">
        <ul class="lists" v-if="list.length > 0">
            <li class="item" v-for="(item, index) in list" :key="item.id"
                @click="$router.push('/order/detail?id=' + item.order_id)">
                <div class="left fl">
                    <p class="m">{{item.created_at.split("-")[0]}}月</p>
                    <p class="d">{{item.created_at.split("-")[1]}}</p>
                </div>
                <div class="middle fl">
                    <p class="p_name">{{item.name}}</p>
                    <p class="info">{{item.pay_money}}元 {{item.is_chasing === '0' ? '普通': '追号'}}订单</p>
                </div>
                <div class="right fr" :class="'stete' + item.openmatch">
                    <!--0=等待开奖 2=未中奖 3=中奖-->
                    {{item.openmatch === '0'? '等待开奖':item.openmatch === '2'? '未中奖':'中奖' }}
                </div>
            </li>
        </ul>
        <div v-else class="noData"></div>
    </div>
</template>

<script>
    export default {
        name: 'order_list',
        props: {
            apiName: String
        },
        data () {
            return {
                list: [],
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, this.apiName, {}, this.getOrder)
        },
        methods: {
            getOrder(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                else if (d.data.length > 0) {
                    this.list = d.data;
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./order_list.less";
</style>
