<template>
    <div class="pailie">
        <XTitle :textOption="textOption" @TOcallback="set_TO_index" :moreOption="moreOption"
                :MOcallback="set_MO_index" :TOcallback="set_TO_index"></XTitle>

        <XTime></XTime>

        <!--排列3直选-->
        <div v-show="$store.state.pailie[playType].textIndex === 0">
            <Ball :miss="zhiMiss.hundred" storeStateName="hundred" label="百位"></Ball>
            <Ball :miss="zhiMiss.ten" storeStateName="ten" label="十位"></Ball>
            <Ball :miss="zhiMiss.individual"></Ball>
        </div>

        <!--组三复式-->
        <div v-show="$store.state.pailie[playType].textIndex === 1">
            <Ball storeStateName="zu3" label="选号"></Ball>
            <div class="prompt">
                <h5 class="title">玩法提示：</h5>
                所选号码包括开奖号码中的2位（顺序不限），且开奖号码有任意两位相 同，即中奖346元。
            </div>
        </div>

        <!--组六-->
        <div v-show="$store.state.pailie[playType].textIndex === 2">
            <Ball storeStateName="zu6" label="选号"></Ball>
            <div class="prompt">
                <h5 class="title">玩法提示：</h5>
                所选号码包括开奖号码相同（顺序不限），且开奖号码中3个号码各不相 同，即中奖173元。
            </div>
        </div>

        <Pfoot></Pfoot>
    </div>
</template>

<script>
    import XTitle from '../com/title/title'
    import XTime from '../com/time/time.vue'
    import Ball from '../com/ball/ball.vue'
    import Pfoot from '../com/footer/foot.vue'
    export default {
        name: 'pai3_index',
        components: {XTitle, XTime, Ball, Pfoot},
        data () {
            return {
                textOption: ['排列3直选', '组三复式', '组六'],
                moreOption: ['走势图', '显示遗漏', '近期开奖', '玩法说明'],
                playType: 'p3',
                zuMiss: [],
                zhiMiss: []
            }
        },
        created () {

        },
        methods: {
            /**
             * 修改 store.textIndex （此文件中data.textOption的下标） 的回调函数 => 修改注数
             * @param i： 修改的值
             */
            set_TO_index (i) {
                console.log(this.textOption[i])
                this.$store.commit('setNotes', this.playType)
            },

            /**
             * 修改 store.moreIndex （此文件中data.moreOption的下标） 的回调函数
             * @param i： 修改的值
             */
            set_MO_index (i) {
                switch (i) {
                    case 0:
//                        走势图
                        this.$router.push('/zst/p3')
                        break;

                    case 1:
//                        显示遗漏
                        console.log("显示遗漏");
                        this.miss()
                        break;

                    case 2:
//                        近期开奖
                        this.$router.push('/prize_p3')
                        break;
                    case 3:
//                        玩法说明
                        this.$router.push('/exposition?id=p3')
                        break;

                    default:
                        console.error(`moreOption 超出范围的下标。 下标：${i}`)

                }
            },

            miss () {
                // todo 不能隐藏遗漏 （store。state 中 moreIndex 未能重新触发回调）
                debugger;
                const type = this.$store.state.pailie[this.playType].textIndex === 0 ? 1 : 3
                if (type === 1) {
                    if ( this.zhiMiss.length === 0) this.showMiss()
                    else this.zhiMiss = []
                } else {
                    if ( this.zuMiss.length === 0) this.showMiss()
                    else this.zuMiss = []
                }
            },
            showMiss () {
                this.$vux.loading.show()
                const type = this.$store.state.pailie[this.playType].textIndex === 0 ? 1 : 3
                this.global.ajax.call(this, "p_miss", {type}, (d) => {
                    this.$vux.loading.hide()
                    if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                    else {
                        this[`${type === 1 ? 'zhi' : 'zu'}Miss`] = d.data
                    }
                });
            }
        },
        watch: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./p3.less";
</style>
