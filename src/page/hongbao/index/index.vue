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
                <span class="btn redBg fr" @click="get_cashingCode">兑换</span>
            </div>

            <!--可用红包列表-->
            <div class="available list" v-show="bar_value === 0 && available.length > 0">
                <div class="item" v-for="(i, index) in available" :key="i.id">
                    <div class="fl l img">
                        {{i.amount}}<span class="em">元</span>
                    </div>
                    <div class="fr r">
                        <div class="btn fr redText s32" @click="use(index)">立即使用</div>
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
                        <div class="btn fr s32">立即使用</div>
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
                    {{popup_data.money}}元红包
                    <p class="c9">可投注以下彩种，请选择</p>
                </div>
                <div class="pl">
                    <div class="item" v-for="(item, index) in popup_data.d" @click="open(index)">
                        <img :src="item.logo" alt="" class="logo">
                        <p class="fr c_name">{{item.title}}</p>
                    </div>
                </div>
                <div class="pf" @click="show_popup = false">取消</div>
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
                popup_data: {},

                lotid: null,
            }
        },
        created(){
            this.lotid = this.$route.query.lotid || '';
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
                        limit_num: this.limit_num,
                        lotid: this.lotid,
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
            use(i){
                //                this.lotid === ""  true = 我的页面； false：下单页面
                if (this.lotid !== "") {
                    sessionStorage.setItem('red_packet', JSON.stringify(this.available[i]));
                    this.$router.back();
                } else {
                    this.$vux.loading.show();
                    this.popup_data = {};
                    this.popup_data.money = this.available[i].amount;
                    this.popup_data.red_id = this.available[i].id;
                    this.global.ajax.call(this, "hb_useHb", {id: this.available[i].red_id}, this.use_BC);
                }
            },
            use_BC(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.popup_data.d = d.data;
                    this.show_popup = true;
                }
            },
            open(i){
                this.$router.push(this.global.product_type[this.popup_data.d[i].lotid] + "/index");
                /*todo 处理未开发的彩种*/
            },
            get_cashingCode(){
                if (this.cashingCode.length < 8) this.global.call(this, d.error_message);
                else {
                    this.$vux.loading.show();
                    this.global.ajax.call(this, "hb_cashingCode", {}, this.cashingCode_CB)
                }
            },
            cashingCode_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.global.alert.call(this, "兑换成功");
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
