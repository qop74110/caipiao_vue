<template>
    <div class="history">
        <div class="list" :class="{show_history: show_history}">

            <div class="p5">
                <div class="item">
                    <span class="fl period">期号</span>
                    <span class="fl winning">开奖号码</span>
                </div>
                <div class="item" v-for="(item, index) in historyList">
                    <span class="fl period">{{item.period}}期</span>
                    <span class="fl winning">
                        <span v-for="(_it, _in) in item.winning.split(',')"
                              :class="_in > 4 ? 'blueText': 'redText'"> {{_it}}</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="time">
            <template v-if="time.phase > 0">
                {{`第${time.phase || ''}期`}}
                <span class="redText">{{`${time.end_time || ''}截止`}}</span>
            </template>
            <template v-else>
                <span class="redText">{{alertText}}</span>
            </template>


            <div class="btn fr" @click="tagList">
                往期中奖号
                <i class="arrow" :class="{rotate: show_history}"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'history',
        props: {
            time: {
                type: Object,
                default: () => {
                    return {
                        phase: '',
                        end_time: ''
                    }
                }
            },
            historyList: {
                type: Array
            },
            getHistoryList: {
                type: Function
            }
        },
        data () {
            return {
                alertText: '开奖中！请20：00后再来',
                show_history: false
            }
        },
        created () {
        },
        methods: {
            tagList() {
                if (this.historyList.length == 0) this.getHistoryList(() => {
                    this.show_history = !this.show_history
                })
                else this.show_history = !this.show_history
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "history.less";
</style>
