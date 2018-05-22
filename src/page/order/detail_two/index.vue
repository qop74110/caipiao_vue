<template>
    <div class="detail_tow page" v-if="detail !== null">
        <div class="head">
            <div class="left fl">
                <div class="left_top">
                    <img class="logo fl" :src="detail.logo" alt="">
                    <span class="p_name fl">
                        {{detail.name}}
                    </span>
                    <span class="phase fl" v-if="detail.play_type !== global.product_type.jingcaizuqiu">
                        追号共{{detail.total_periods}}期
                    </span>
                </div>
                <div class="left_bttom">
                    <div class="order_money fl">
                        {{detail.pay_money_total}}元
                        <p>订单金额</p>
                    </div>
                    <div class="winning_money fl">
                        <span class="redText">{{detail.winning_money || '0'}}元</span>
                        <p>中奖金额</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="border"></div>

        <div class="info">
            <div class="row">
                <span class="text">订单状态</span>
                <span>{{detail.winning_money > 0 ? '中奖': '未中奖'}}</span>
            </div>
            <div class="row">
                <span class="text">追期条件</span>
                <span>{{detail.is_stop === '1' ? '中' + detail.stop_money + '停止': '到期后停止'}}</span>
            </div>

            <div class="order_list">
                <div class="order_list_head">
                    <span class="text">以追期数</span>
                    <span>{{detail.already_periods}}期</span>
                </div>
                <div class="order_list_body">
                    <div class="item" v-for="(item,index) in detail.info"
                         @click="$router.push('/order/detail?id=' + item.order_id)">
                        <span class="fr">{{item.s}}</span>
                        <div class="qi">{{item.start_periods}}期</div>
                        <div class="money">{{item.pay_money_total}}元</div>

                    </div>
                </div>
                <div class="order_list_foot">
                    <span class="text">剩余期数</span>
                    <span>{{detail.remaining_periods}}期</span>
                </div>
            </div>
        </div>

        <div class="del_order redText" @click="del_order">删除本订单</div>

        <div class="one_more">
            <div class="one_more_btn redBg" @click="one_more">再来一注</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'detail_tow',
        data () {
            return {
                detail: null,
            }
        },
        created(){
            let id = this.$route.query.id;
            if (id.length > 0) {
                this.$vux.loading.show();
                this.global.ajax.call(this, 'order_detail_two', {id}, this.getData)
            }
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    this.setOrderState(d.data);

                    this.detail = d.data;
                }
            },
            setOrderState(d){
                for (let i = 0; i < d.info.length; i++) {
                    let s = "";
                    if (d.info[i].status === 4) {
                        if (d.info[i].openmatch === '0') s = "等待开奖";
                        else if (d.info[i].openmatch === '2') s = "未中奖";
                        else if (d.info[i].openmatch === '3') s = "中奖 ";
                    } else if (d.info[i].status === 2) s = "委托中";
                    else s = "委托失败";

                    d.info[i].s = s;
                }
            },
            del_order(){
                const _this = this;
                this.$vux.confirm.show({
                    content: "删除后本订单将无法还原",
                    onConfirm () {
                        _this.$vux.loading.show();
                        _this.global.ajax.call(_this, 'order_del', {
                            id: _this.$route.query.id,
                            type: 2
                        }, _this.del_order_CB);
                    }
                })
            },
            del_order_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.global.alert.call(this, "删除成功");
                    this.$router.back();
                }
            },
            one_more(){
                const pt = this.$route.query.type;

                let url = this.global.product_type[pt];
                if (!url) url = 'home';
                else url = `${url}/index`;
                this.$router.push('/' + url);
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
