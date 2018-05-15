<template>
    <div class="hemai">
        <div class="headbox">
            <div class="head redBg">
                <div class="title" @click="show_tit_popup = !show_tit_popup; show_hm_popup = false">
                    {{title}}
                    <span class="arrow" :class="show_tit_popup && 'rotate'"></span>
                </div>


                <span class="btn" @click="show_hm_popup = !show_hm_popup; show_tit_popup = false">
                    发起合买
                </span>
            </div>
        </div>

        <!--排序-->
        <div class="bar">
            <div class="fl btn_active">
                战绩
                <span class="icon top"></span>
            </div>
            <div class="fl btn_active">
                进度
                <span class="icon bottom"></span>
            </div>
            <div class="fl btn_active">
                总额
                <span class="icon not"></span>
            </div>
            <div class="fl btn_active">
                截止
                <span class="icon not"></span>
            </div>
        </div>

        <!--列表-->
        <ul class="list">
            <li class="item" v-for="(it, ind) in 10" @click="go_detail">
                {{it}}
            </li>
        </ul>

        <!--title弹窗-->
        <div class="fog title_popup_box" v-show="show_tit_popup" @click="show_tit_popup = false">
            <ul class="title_popup clearFix">
                <li class="option fl btn_active" v-for="(i, ind) in title_list">
                    {{i}}
                </li>
            </ul>
        </div>

        <!--合买弹窗-->
        <div class="fog heamai_popup_box" v-show="show_hm_popup" @click="show_hm_popup = false">
            <div class="popup">
                <div class="popup_t">请选择彩种</div>
                <ul class="popup_b clearFix">
                    <li class="option fl" v-for="(i, ind) in title_list" :key="ind">
                        {{i}}
                    </li>
                </ul>
            </div>
        </div>

        <Tabbar :page="4"></Tabbar>
    </div>
</template>

<script>
    import {Tabbar} from "com";


    export default {
        name: 'hemai',
        components: {
            Tabbar
        },
        data () {
            return {
                title: null,
                title_list: [
                    "全部彩种",
                    "双色球",
                    "大乐透",
                    "福彩3D",
                    "竞彩足球",
                ],

                sort: null,

                show_tit_popup: false,          //  显示 标题弹窗
                show_hm_popup: false,           //  显示 合买弹窗

            }
        },
        created(){
            this.title = this.title_list[0];
        },
        methods: {
            go_detail(i){

                this.$router.push('/hemai_detail')
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
