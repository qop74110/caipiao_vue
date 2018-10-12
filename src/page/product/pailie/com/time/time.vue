<template>
    <div class="winningRecord">
        <div class="list" :class="{show_history: show_history}" v-if="historyList !== null">
            <div v-if="playType === 'p3'" class="p3">
                <div class="item">
                    <span class="fl period">期号</span>
                    <span class="fl winning">开奖号码</span>
                    <span class="fl memo">形态</span>
                </div>
                <div class="item" v-for="(item, index) in historyList">
                    <span class="fl period">{{item.period}}期</span>
                    <span class="fl winning redText">{{item.winning}}</span>
                    <span class="fl memo">{{item.memo}}</span>
                </div>
            </div>
            <div v-else="" class="p5">
                <div class="item">
                    <span class="fl period">期号</span>
                    <span class="fl winning">开奖号码</span>
                </div>
                <div class="item" v-for="(item, index) in historyList">
                    <span class="fl period">{{item.period}}期</span>
                    <span class="fl winning redText">{{item.winning}}</span>
                </div>
            </div>
        </div>

        <div class="XTime" v-if="d !== null">
            {{`第${d.phase || ''}期`}}
            <span class="redText">{{`${d.end_time || ''}截止`}}</span>

            <div class="btn fr" @click="show_history = !show_history">
                往期中奖号
                <i class="arrow" :class="{rotate: show_history}"></i>
            </div>
        </div>
    </div>


</template>

<script>

    export default {
        name: 'XTime',
        props: {
            playType: {
                type: String,
                default: 'p3'
            }
        },
        data () {
            return {
                d: null,
                historyList: null,

                show_history: false
            }
        },
        created () {
            const type = this.playType === 'p3' ? 3 : 5
            this.global.ajax.call(this, "p_purchase", {type}, this.get_purchase);
            this.global.ajax.call(this, "p_drop", {type}, this.get_list);
        },
        methods: {
            get_purchase (d) {
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (!d.data[0]) this.global.toast.call(this, '获取数据异常');
                else {
                    this.d = d.data[0]
                }
            },
            get_list (d) {
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (!d.data) this.global.toast.call(this, '获取数据异常');
                else {
                    for(let i = 0; i < d.data.length; i++) {
                        d.data[i].winning = d.data[i].winning.replace(/,+/g," ");
                    }
                    this.historyList = d.data
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./time.less";
</style>
