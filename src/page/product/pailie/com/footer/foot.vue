<template>
    <div class="foot">
        <div class="substitute">
            <div class="text" :class="{show:  $store.state.pailie[playType].notes > 0}">{{`若中奖：奖金
                ${bonus[$store.state.pailie[playType].textIndex]}元，盈利${bonus[$store.state.pailie[playType].textIndex] -
                $store.state.pailie[playType].notes * 2}元`}}
            </div>
            <div class="bottom">
                <div class="clearBtn fl" @click="clear">清空</div>
                <div class="notes fl">
                    {{`${$store.state.pailie.p3.notes}注 共`}}<span class="redText">{{$store.state.pailie[playType].notes * 2}}</span>元
                </div>
                <div class="next fr">下一步</div>
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
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./foot.less";
</style>
