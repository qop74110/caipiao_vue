<template>
    <div class="fucai3d_index">
        <XHead @setMore="setMore" @setOption="setOption" :active_more="show_more" :active_title="show_title_option">
            {{xhead_title}}
        </XHead>
        <Actionsheet v-model="show_more" @click_item="more_item" :list="more_list"></Actionsheet>
        <Actionsheet v-model="show_title_option" @click_item="title_item" :list="title_option_list"></Actionsheet>

        <!--近十期中奖结果-->
        <div class="history">
            <div class="his_body" v-show="his_list !== null && show_his">
                <div class="tr">
                    <div class="td">期号</div>
                    <div class="td">开奖号码</div>
                    <div class="td">形态</div>
                    <div class="td">试机号</div>
                </div>
                <div class="tr" v-for="i in 10">
                    <div class="td">079期</div>
                    <div class="td redText">3 6 9</div>
                    <div class="td">组六</div>
                    <div class="td">5 2 1</div>
                </div>
            </div>
            <div class="his_foot">
                第2018080期
                <span class="redText">03-28 19:15 截止</span>
                <span class="btn fr" @click="show_his = !show_his">
                    {{show_his ? '收起':'显示'}}
                    <i class="his_arrow fr" :class="show_his && 'rotate'"></i>
                </span>
            </div>
        </div>

        <!--机选-->
        <div class="random">
            <span>机选</span>
            <span class="fr" v-show="play_type === 0">
                每位至少选1个号，按位猜对开奖号即中<span class="redText">1040</span>元
            </span>
            <span class="fr" v-show="play_type === 1">
                至少选2个号，猜对开奖号(顺序不限)即中<span class="redText">346</span>元
            </span>
            <span class="fr" v-show="play_type === 2">
                至少选3个号，猜对开奖号(顺序不限)即中<span class="redText">173</span>元
            </span>
        </div>

        <!--选号-->
        <div class="number">
            <div class="l">

            </div>
            <!--<div class="r">-->
                <!--<div class="boll fl" v-for="i in 11">-->
                    <!--<input type="checkbox" :value="i - 1" v-model="">-->
                <!--</div>-->
            <!--</div>-->
        </div>

        <XFoot></XFoot>
    </div>
</template>

<script>
    import {XHead, Actionsheet, XFoot} from 'com';
    export default {
        name: 'fucai3d_index',
        components: {
            XHead,
            Actionsheet,
            XFoot
        },
        data () {
            return {
                show_more: false,
                show_title_option: false,
                xhead_title: null,

                more_list: [
                    "近期开奖",
                    "显示遗漏",
                    "玩法说明",
                ],
                title_option_list: [
                    "3D直选",
                    "组三复式",
                    "组六",
                ],

                show_his: false,
                his_list: [],

                play_type: 0,


            }
        },
        created(){
            this.xhead_title = this.title_option_list[this.play_type];
        },
        methods: {
            setMore(val){
                this.show_more = val;
            },
            setOption(val){
                this.show_title_option = val;
            },
            more_item(val){

            },
            title_item(val){
                if (val !== "-1") {
                    this.play_type = val;
                    this.xhead_title = this.title_option_list[val];
                }
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
