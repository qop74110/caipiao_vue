<template>
    <div class="pailie">
        <XTitle :textOption="textOption" @TOcallback="set_TO_index" :moreOption="moreOption"
                :MOcallback="set_MO_index" :TOcallback="set_TO_index"></XTitle>

        <XTime></XTime>

        <!--排列3直选-->
        <div v-show="$store.state.pailie[playType].textIndex === 0">
            <div class="line random"><span @click="randomNotes" class="redText">机选</span> <span class="fr">每位至少选1个号，按位猜对开奖号即中1040元</span>
            </div>
            <Ball :miss="zhiMiss ? zhiMiss.hundred : []" storeStateName="hundred" label="百位"></Ball>
            <Ball :miss="zhiMiss ? zhiMiss.ten : []" storeStateName="ten" label="十位" class="line"></Ball>
            <Ball :miss="zhiMiss ? zhiMiss.individual : []" class="line"></Ball>
        </div>

        <!--组三复式-->
        <div v-show="$store.state.pailie[playType].textIndex === 1">
            <div class="line random"><span @click="randomNotes" class="redText">机选</span> <span
                class="fr">至少选择2个号码</span></div>
            <Ball storeStateName="zu3" :miss="zuMiss ? zuMiss.group : []" label="选号"></Ball>
            <div class="prompt">
                <h5 class="title">玩法提示：</h5>
                所选号码包括开奖号码中的2位（顺序不限），且开奖号码有任意两位相 同，即中奖346元。
            </div>
        </div>

        <!--组六-->
        <div v-show="$store.state.pailie[playType].textIndex === 2">
            <div class="line random"><span @click="randomNotes" class="redText">机选</span> <span
                class="fr">至少选择3个号码</span></div>
            <Ball storeStateName="zu6" :miss="zuMiss ? zuMiss.group : []" label="选号"></Ball>
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
                zuMiss: null,
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
                const type = this.$store.state.pailie[this.playType].textIndex === 0 ? 1 : 3
                if (type === 1) {
                    if (this.zhiMiss !== null) this.moreOption[1] = '隐藏遗漏'
                    else this.moreOption[1] = '显示遗漏'
                } else {
                    if (this.zuMiss !== null) this.moreOption[1] = '隐藏遗漏'
                    else this.moreOption[1] = '显示遗漏'
                }
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
                const type = this.$store.state.pailie[this.playType].textIndex === 0 ? 1 : 3

                if ((type === 1 && this.zhiMiss === null) || (type === 3 && this.zuMiss === null)) this.showMiss(type)
                else if ((type === 1 && this.zhiMiss !== null) || (type === 3 && this.zuMiss !== null)) this.hideMiss(type)
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
                        this[`${type === 1 ? 'zhi' : 'zu'}Miss`] = d.data
                        this.moreOption[1] = '隐藏遗漏'
                    }
                });
            },
            hideMiss (type) {
                this[`${type === 1 ? 'zhi' : 'zu'}Miss`] = null
                this.moreOption[1] = '显示遗漏'
            },
            randomNotes () {
                if (this.playType === 'p3') {
                    const textIndex = this.$store.state.pailie.p3.textIndex
                    if (textIndex === 0) {
                        const storeStateName = ['individual', 'ten', 'hundred']
                        for (let i = 0; i < storeStateName.length; i++) {
                            this.$store.commit('selectBall', {
                                playType: this.playType,
                                storeStateName: storeStateName[i],
                                val: [this.random().toString()]
                            })
                        }
                    }
                    else if (textIndex === 1) {
                        const notes = []

                        notes.push(this.random().toString())

                        let two = null
                        for (let i = 0; i < 20; i++) {
                            two = this.random().toString()
                            if (two !== notes[0]) break
                        }

                        notes.push(two)

                        this.$store.commit('selectBall', {playType: this.playType, storeStateName: 'zu3', val: notes})
                    }
                    else {
                        const notes = []
                        notes.push(this.random().toString())

                        for (let i = 0; i < 50; i++) {
                            const n = this.random().toString()

                            if (n !== notes[0] && n !== notes[1]) notes.push(n)

                            if (notes.length === 3) break

                        }

                        this.$store.commit('selectBall', {playType: this.playType, storeStateName: 'zu6', val: notes})
                    }
                } else {
                    const storeStateName = ['individual', 'ten', 'hundred', 'thousand', 'absolutely']
                    for (let i = 0; i < storeStateName.length; i++) {
                        this.$store.commit('selectBall', {
                            playType: this.playType,
                            storeStateName: storeStateName[i],
                            val: [this.random()]
                        })
                    }
                }
            },
            /**
             * 生成0-9的随机数
             * @returns {number}
             */
            random (max = 10) {
                return Math.floor(Math.random() * max);
            }
        },
        watch: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./p3.less";
</style>
