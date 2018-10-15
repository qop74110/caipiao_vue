<template>
    <div class="foot">
        <div class="substitute">
            <div v-if="playType === 'p3'" class="text" :class="{show:  $store.state.pailie[playType].notes > 0}">
                {{`若中奖：奖金
                ${bonus[$store.state.pailie[playType].textIndex]}元，盈利${bonus[$store.state.pailie[playType].textIndex] -
                $store.state.pailie[playType].notes * 2}元`}}
            </div>
            <div v-else class="text" :class="{show:  $store.state.pailie[playType].notes > 0}">{{`若中奖：奖金
                100000元，盈利${100000 -
                $store.state.pailie[playType].notes * 2}元`}}
            </div>
            <div class="bottom">
                <div class="clearBtn fl" @click="clear">清空</div>
                <div class="notes fl">
                    {{`${$store.state.pailie[playType].notes}注 共`}}<span class="redText">{{$store.state.pailie[playType].notes * 2}}</span>元
                </div>
                <div class="next fr" @click="next">下一步</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'paileiFoot',
        props: {
            playType: {
                type: String,
                default: 'p3'
            }
        },
        data () {
            return {
                bonus: ['1040', '346', '173']
            }
        },
        created () {
        },
        methods: {
            clear () {
                this.$store.commit('clearSelect', this.playType)
            },
            getOrderList () {
                const cookie = this.global.cookie.get(this.playType + 'Orber')

                let orderList = null

                if (cookie) orderList = JSON.parse(cookie)
                else orderList = []

                return orderList
            },
            next () {
                const notes = this.$store.state.pailie[this.playType].notes

                if (notes < 1) this.global.toast.call(this, '请投注')
                else {
                    const pailie = this.$store.state.pailie
                    const index = this.global.cookie.get(`${this.playType}OraderAdd`) || 0
                    const obj = {}
                    const state = pailie[this.playType]
                    const d = this.getOrderList()


                    if (this.playType === 'p3') {

                        const textIndex = state.textIndex
                        if (textIndex === 0) {
                            obj.type = 1
                            obj.individual = state.individual
                            obj.ten = state.ten
                            obj.hundred = state.hundred
                        }

                        else if (textIndex === 1) {
                            obj.type = 2
                            obj.individual = state.zu3
                        }

                        else if (textIndex === 2) {
                            obj.type = 3
                            obj.individual = state.zu6
                        }

                        else console.error('无效的 "textIndex" ')
                    }

                    else {
                        obj.individual = state.individual
                        obj.ten = state.ten
                        obj.hundred = state.hundred
                        obj.thousand = state.thousand
                        obj.absolutely = state.absolutely
                    }

                    obj.notes = notes
                    obj.money = notes * 2

                    d.unshift(obj)

                    this.global.cookie.set(this.playType + 'Orber', JSON.stringify(d))
                    this.global.cookie.set(this.playType + 'Pailie', pailie.phase)

                    this.$router.push(`/order/${this.playType}`)
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./foot.less";
</style>
