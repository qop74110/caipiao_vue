<template>
    <div class="order_list" v-if="hideLoad">
        <ul class="lists" v-if="list.length > 0">
            <li class="item" v-for="(item, index) in list" :key="item.id"
                @click="openLink(index)">
                <div class="left fl">
                    <p class="m">{{item.created_at.split("-")[0]}}月</p>
                    <p class="d">{{item.created_at.split("-")[1]}}</p>
                </div>
                <div class="middle fl">
                    <p class="p_name">{{item.name}}</p>
                    <p class="info">{{item.pay_money_total}}元 {{item.type === 1 ? '普通': item.type === 2 ? '追号':
                        '合买'}}订单</p>
                </div>
                <div class="right fr" :class="'stete' + item.openmatch"> {{item.s }}</div>
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
                hideLoad: false,
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
                    this.setOrderState(d.data);
                    this.list = d.data;
                }
                this.hideLoad = true;
            },
            setOrderState(d){
                for (let i = 0; i < d.length; i++) {
                    let s = "";
                    if (d[i].status === 4) {
                        if (d[i].openmatch === '0') s = "等待开奖";
                        else if (d[i].openmatch === '2') s = "未中奖";
                        else if (d[i].openmatch === '3') s = "中奖 ";
                    } else if (d[i].status === 2) s = "委托中";
                    else if (d[i].status === 1) s = '凑单中'
                    else s = "委托失败";

                    d[i].s = s;
                }
            },
            openLink(i){
                const d = this.list[i];
                let url = "/order/";
                if (d.type === 1) url += 'detail';
                else if (d.type === 2) url += 'detail_tow';
                else url += "hemai";
                url += '?id=' + d.order_id + "&type=" + d.lotid;

                this.$router.push(url)
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./order_list.less";
</style>
