<template>
    <div class="pailie">
        <XTitle palyType="p5" :textOption="textOption" @TOcallback="set_TO_index" :moreOption="moreOption"
                :MOcallback="set_MO_index" :TOcallback="set_TO_index"></XTitle>

        <XTime playType="p5"></XTime>

        <!--排列3直选-->
        <div v-show="$store.state.pailie[playType].textIndex === 0">
            <div class="line random"><span @click="randomNotes" class="redText">机选</span> <span class="fr">每位至少选1个号，按位猜对开奖号即中1040元</span>
            </div>
            <Ball playType="p5" :miss="zhiMiss ? zhiMiss.absolutely : []" storeStateName="absolutely" label="万位"></Ball>
            <Ball playType="p5" :miss="zhiMiss ? zhiMiss.thousand : []" storeStateName="thousand" label="千位" class="line"></Ball>
            <Ball playType="p5" :miss="zhiMiss ? zhiMiss.hundred : []" storeStateName="hundred" label="百位" class="line"></Ball>
            <Ball playType="p5" :miss="zhiMiss ? zhiMiss.ten : []" storeStateName="ten" label="十位" class="line"></Ball>
            <Ball playType="p5" :miss="zhiMiss ? zhiMiss.individual : []" class="line"></Ball>
        </div>


        <Pfoot playType="p5"></Pfoot>
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
                textOption: ['排列5'],
                moreOption: ['走势图', '显示遗漏', '近期开奖', '玩法说明'],
                playType: 'p5',
                zhiMiss: null
            }
        },
        created () {

        },
        methods: {
            /**
             * 修改 store.textIndex （此文件中data.textOption的下标） 的回调函数 => 修改注数    判断 显示遗漏/隐藏遗漏
             * @param i： 修改的值
             */
            set_TO_index (i) {
//                修改注数
                this.$store.commit('setNotes', this.playType)
//                显示遗漏/隐藏遗漏

                if (this.zhiMiss !== null) this.moreOption[1] = '隐藏遗漏'
                else this.moreOption[1] = '显示遗漏'

            },

            /**
             * 修改 store.moreIndex （此文件中data.moreOption的下标） 的回调函数
             * @param i： 修改的值
             */
            set_MO_index (i) {
                switch (i) {
                    case 0:
//                        走势图
                        this.$router.push('/zst/' + this.playType)
                        break;

                    case 1:
//                        显示遗漏
                        this.miss()
                        break;

                    case 2:
//                        近期开奖
                        this.$router.push('/prize_' + this.playType)
                        break;
                    case 3:
//                        玩法说明
                        this.$router.push('/exposition?id=' + this.playType)
                        break;

                    default:
                        console.error(`moreOption 超出范围的下标。 下标：${i}`)

                }
            },

            miss () {
                const type = 5

                if (this.zhiMiss === null) this.showMiss(type)
                else if (this.zhiMiss !== null) this.hideMiss(type)
                else {
                    console.log(this[`${type === 1 ? 'zhi' : 'zu'}Miss`])
                }
            },
            showMiss (type) {
                this.$vux.loading.show()
                this.global.ajax.call(this, "p_miss", {type}, (d) => {
                    this.$vux.loading.hide()
                    if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                    else {
                        this.zhiMiss = d.data
                        this.moreOption[1] = '隐藏遗漏'
                    }
                });
            },
            hideMiss (type) {
                this.zhiMiss = null
                this.moreOption[1] = '显示遗漏'
            },
            randomNotes () {
                const storeStateName = ['individual', 'ten', 'hundred', 'thousand', 'absolutely']
                for (let i = 0; i < storeStateName.length; i++) {
                    this.$store.commit('selectBall', {
                        playType: this.playType,
                        storeStateName: storeStateName[i],
                        val: [this.random()]
                    })
                }
            },
            /**
             * 生成0-9的随机数
             * @returns {number}
             */
            random () {
                return Math.floor(Math.random() * 10);
            }
        },
        watch: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./p3.less";
</style>
