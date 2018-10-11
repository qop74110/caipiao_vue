<template>
    <div class="XTitle">
        <div class="fixed">
            <div @click="$router.back()" class="back fl "></div>
            <div class="text fl " @click="showTextOption = !showTextOption" v-if="textOption.length > 1">
                {{textOption[$store.state.pailie[palyType].textIndex]}}
                <i class="arrow_b"></i>
            </div>
            <div class="text fl" v-else>{{textOption[$store.state.pailie[palyType].textIndex]}}</div>
            <div class="more fr " @click="showMoreOption = !showMoreOption"></div>
        </div>

        <!--标题选项-->
        <Actionsheet v-model="showTextOption" :show-cancel="true" :menus="textOption"
                     @on-click-menu="clickTextOption"></Actionsheet>

        <!--更多选项-->
        <Actionsheet v-model="showMoreOption" :show-cancel="true" :menus="moreOption"
                     @on-click-menu="clickMoreOption"></Actionsheet>
    </div>
</template>

<script>
    import {Actionsheet} from 'vux'
    export default {
        name: 'XTitle',
        components: {
            Actionsheet
        },
        props: {
            palyType: {
                type: String,
                default: 'p3'
            },
            textOption: {
                type: Array,
                default: () => ['标题1', '标题2']
            },
            moreOption: {
                type: Array,
                default: () => ['更多1', '更多2']
            },
            TOcallback: {
                type: Function,
                default: (i) => {
                    console.log(`textOption 点击的是 ${i}`)
                }
            },
            MOcallback: {
                type: Function,
                default: (i) => {
                    console.log(`moreOption 点击的是 ${i}`)
                }
            }
        },
        data () {
            return {
                showTextOption: false,
                showMoreOption: false
            }
        },
        created () {
        },
        methods: {
            clickTextOption (val) {
                this.$store.commit('setIndex', {
                    key: 'textIndex',
                    val,
                    objName: this.palyType,
                    callback: this.TOcallback
                })
            },
            clickMoreOption (val) {
                this.$store.commit('setIndex', {
                    key: 'moreIndex',
                    val,
                    objName: this.palyType,
                    callback: this.MOcallback
                })
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./title.less";
</style>
