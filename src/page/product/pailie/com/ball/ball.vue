<template>
    <div class="ballList">
        <div class="labelBox fl">
            <div class="label fl">{{label}}</div>
            <div class="arrow fl"></div>
        </div>
        <div class="ballBox fr">
            <div class="ball redText" v-for="i in 10" :key="storeStateName + i">
                <input type="checkbox" :value="i - 1+ ''" :name="storeStateName" v-model="select" class="checkbox">
                <div class="num">
                    <div class="border"></div>
                    {{i - 1}}
                </div>
                <div class="miss" v-if="miss && miss.length > 0">{{miss[i - 1]}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ball',
        props: {
            playType: {
                type: String,
                default: 'p3'
            },
            storeStateName: {
                type: String,
                default: 'individual'
            },
            label: {
                type: String,
                default: '个位'
            },
            miss: {
                type: Array
            }
        },
        data () {
            return {
                select: []
            }
        },
        created () {
//            this.select = this.$store.state.pailie[this.playType][this.storeStateName].__ob__.value
//            this.$store.watch('p3', console.log)
        },
        computed: {
            getSelect() {
                return this.$store.state.pailie[this.playType][this.storeStateName]
            }
        },
        methods: {},
        watch: {
            select (val) {
                this.$store.commit('selectBall', {storeStateName: this.storeStateName, val, playType: this.playType})
            },
            /**
             * 配合computed计算属性 监听store.state变化
             * @param val  改变后的值
             */
            getSelect(val) {
                this.select = val
                this.$store.commit('setNotes', this.playType)
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./ball.less";
</style>
