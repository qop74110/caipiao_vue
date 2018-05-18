<template>
    <div class="hongbao" v-if="loading === 0">
        <XHead :show_mord="false" :show_title_option="false">
            红包
            <span class="help" @click="$router.push('/hb_help')"></span>
        </XHead>
        <Bar :list="bar_list" v-model="bar_value" class="bar"></Bar>


        <div class="content">
            <!--兑奖码-->
            <div class="cashingCode" v-show="bar_value === 0">
                <input type="text" class="input" v-model="cashingCode" placeholder="请输入兑奖码">
                <span class="btn redBg fr">兑换</span>
            </div>

            <!--可用红包列表-->
            <div class="available list" v-show="bar_value === 0 && available.length > 0">
                <div class="item" v-for="(i, index) in available" :key="i.id">
                    <div class="fl l img">
                        {{i.amount}}<span class="em">元</span>
                    </div>
                    <div class="fr r">
                        <div class="btn fr redText s32" @click="use(i.red_id)">立即使用</div>
                        <p class="balance c3">余额：{{i.amount}}</p>
                        <p class="s32 redText">有效期 {{i.effective}}天</p>
                        <p class="s32 ca">{{i.title}}</p>
                        <p class="s32 ca">{{i.whole === 2 ? '部分': '全部'}}彩种</p>   <!--使用场景 部分=2 全部=1-->
                    </div>
                </div>
                <LoadMore :tip="!stop_request1 ?'加载中': '暂无数据'" :show-loading="!stop_request1"></LoadMore>
            </div>

            <!--不可用红包列表-->
            <div class="disabled list" v-show="bar_value === 1 && disabled.length > 0">
                <div class="item" v-for="(i, index) in disabled" :key="i.id">
                    <div class="fl l img">
                        {{i.amount}}<span class="em">元</span>
                    </div>
                    <div class="fr r">
                        <div class="btn fr s32" >立即使用</div>
                        <p class="balance ">余额：{{i.amount}}</p>
                        <p class="s32">有效期 {{i.effective}}天</p>
                        <p class="s32">{{i.title}}</p>
                        <p class="s32">{{i.whole === 2 ? '部分': '全部'}}彩种</p>   <!--使用场景 部分=2 全部=1-->
                    </div>
                </div>

                <LoadMore :tip="!stop_request2 ?'加载中': '暂无数据'" :show-loading="!stop_request2"></LoadMore>
            </div>


            <div class="noData"
                 v-show=" (bar_value === 0 && available.length === 0) || (bar_value === 1 && disabled.length === 0)"></div>
        </div>

        <!--弹窗-->
        <div class="popup fog" v-if="show_popup">
            <div class="popup_content">
                <div class="pt">
                    标题
                </div>
                <div class="pl">
                    <div class="item">
                        logo
                        名字
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {XHead, Bar} from "com";
    import {LoadMore} from 'vux'
    import topLoad from "../../../assets/js/topLoad";
    export default {
        name: 'hongbao',
        components: {
            XHead, Bar, LoadMore
        },
        data () {
            return {
                bar_value: 0,
                bar_list: [
                    "可用",
                    "用完/过期"
                ],

                available: [],          //  可用红包列表
                disabled: [],           //  用完/过期 红包列表

                cashingCode: "",        //  兑奖码

                loading: 1,

                limit_num: 20,          //  一次请求要多少数据
                in_request: false,      //  防止重复请求
                stop_request1: false,   //  停止请求
                stop_request2: false,   //  停止请求

                show_popup: false,
            }
        },
        created(){
            this.getData();
            topLoad.callBack = this.getData;
        },
        methods: {
            getData(){
                if (!this.in_request && ( (this.bar_value === 0 && !this.stop_request1) || (this.bar_value === 1 && !this.stop_request2))) {
                    if (this.loading > 0) this.$vux.loading.show();
                    this.in_request = true;
                    let type = this.bar_value === 0 ? 1 : 2;
                    let limit_begin = this.bar_value === 0 ? this.available.length : this.disabled.length;
                    this.global.ajax.call(this, 'hb_data', {
                        type,
                        limit_begin,
                        limit_num: this.limit_num
                    }, this.request_CB);
                }

            },
            request_CB(d){
                if (this.loading > 0) {
                    this.loading--;
                    this.$vux.loading.hide();
                }
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    if (d.data.info.length < this.limit_num) {
                        if (this.bar_value === 0) this.stop_request1 = true;
                        else this.stop_request2 = true;
                    }

                    if (d.data.info) {
                        const k = this.bar_value === 0 ? 'available' : 'disabled';
                        this[k].push(...d.data.info);
                    }
                }
                this.in_request = false;
            },
            use(id){
                this.$vux.loading.show();
                this.global.ajax.call(this, "hb_useHb", {id}, this.use_BC);

            },
            use_BC(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    console.log(d.data)
                }
            }
        },
        watch: {
            bar_value(val){
                if (val === 1 && this.disabled.length === 0 && this.stop_request2 === false) {
                    this.getData();
                }
            }
        },
        beforeCreate(){
            window.addEventListener('scroll', topLoad.fun);
        },
        destroyed(){
            window.removeEventListener('scroll', topLoad.fun)
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
