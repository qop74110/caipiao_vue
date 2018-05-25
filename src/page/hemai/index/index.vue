<template>
    <div class="hemai" v-if="loading === 0">
        <div class="headbox">
            <div class="head redBg">
                <div class="title" @click="show_tit_popup = !show_tit_popup; show_hm_popup = false">
                    {{title_list[title_active]}}
                    <span class="arrow" :class="show_tit_popup && 'rotate'"></span>
                </div>


                <span class="btn" @click="show_hm_popup = !show_hm_popup; show_tit_popup = false">
                    发起合买
                </span>
            </div>
        </div>

        <!--排序-->
        <div class="bar">
            <div class="fl btn_active" @click="tag_s_type(1)">
                战绩
                <span class="icon" :class="s_type === 1 ? s_order === 1 ? 'bottom' : 'top' : 'not'"></span>
            </div>
            <div class="fl btn_active" @click="tag_s_type(2)">
                进度
                <span class="icon" :class="s_type === 2 ? s_order === 1 ? 'bottom' : 'top' : 'not'"></span>
            </div>
            <div class="fl btn_active" @click="tag_s_type(3)">
                总额
                <span class="icon" :class="s_type === 3 ? s_order === 1 ? 'bottom' : 'top' : 'not'"></span>
            </div>
            <div class="fl btn_active" @click="tag_s_type(4)">
                截止
                <span class="icon" :class="s_type === 4 ? s_order === 1 ? 'bottom' : 'top' : 'not'"></span>
            </div>
        </div>

        <!--列表-->
        <div>
            <ul class="list" v-if="list.length > 0">
                <li class="item" v-for="(it, ind) in list" @click="go_detail(ind)">
                    <div class="l fl">
                        <img class="headImg" :src="it.avatar || '/static/img/header_img.png'">
                        <p class="u_name hideText text">{{it.user_name}}</p>
                    </div>
                    <div class="r fr">
                        <div class="rTop rSon">
                            <div class="redText fl c_name">{{it.name}}</div>
                            <div class="fr progress">
                                <span class="redText">{{it.progress}}<b class="em">%</b></span>
                                <p class="text">进度</p>
                            </div>
                        </div>
                        <div class="rBottom rSon">
                            <div class="fl">
                                <p class="text">总金额（元）</p>
                                <span class="vla">{{it.pay_money_total}}</span>
                            </div>
                            <div class="fl">
                                <p class="text">剩余金额（元）</p>
                                <span class="vla">{{it.remaining_money}}</span>
                            </div>
                            <div class="fl">
                                <p class="text">跟单人数</p>
                                <span class="vla">{{it.number}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <LoadMore :tip="list_load ?'加载中': '暂无数据'" :show-loading="list_load"></LoadMore>
        </div>

        <!--title弹窗-->
        <div class="fog title_popup_box" v-show="show_tit_popup" @click="show_tit_popup = false">
            <ul class="title_popup clearFix">
                <li class="option fl btn_active" v-for="(val, key) in title_list" @click="set_title(key)">
                    {{val}}
                </li>
            </ul>
        </div>

        <!--合买弹窗-->
        <div class="fog heamai_popup_box" v-show="show_hm_popup" @click="show_hm_popup = false">
            <div class="popup">
                <div class="popup_t">请选择彩种</div>
                <ul class="popup_b clearFix">
                    <li class="option fl" v-for="(val, key) in title_list" :key="key" @click="hemai(key)"
                        v-if="key !== 'all'">
                        {{val}}
                    </li>
                </ul>
            </div>
        </div>

        <Tabbar :page="4"></Tabbar>
    </div>
</template>

<script>
    import {Tabbar} from "com";
    import {LoadMore} from 'vux'
    import topLoad from "../../../assets/js/topLoad";


    export default {
        name: 'hemai',
        components: {
            Tabbar,
            LoadMore
        },
        data () {
            return {
                title_active: "all",
                title_list: null,


                s_type: 1,                      //  筛选 1：战绩； 2:进度； 3：总额； 4：截止
                s_order: 1,                     //  排序 1：从大到小;  2:从小到达

                show_tit_popup: false,          //  显示 标题弹窗
                show_hm_popup: false,           //  显示 合买弹窗

                list: [],
                list_load: true,                //  true: 可以上拉加载
                stop_request: true,             //  false: 停止请求列表数据

                loading: 2,                     //  页面加载

//                limit_begin: 0,                 //  列表数据从第几条开始获取
                limit_num: 20,                  //  list + 几条数据
            }
        },
        created(){
            this.getList();
            this.global.ajax.call(this, 'hemai_index_top', {}, this.get_tit_list);
            topLoad.callBack = this.getList;
        },
        methods: {
            get_tit_list(d){
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    let obj = {all: '全部彩种'};
                    for (let i = 0; i < d.data.length; i++) {
                        obj[d.data[i].lotid] = d.data[i].title
                    }
                    this.title_list = obj;
                }
                this.hideLoading();
            },
            getList(){
                if (this.list_load && this.stop_request) {
                    this.stop_request = false;
                    if (this.list.length === 0) this.$vux.loading.show();
                    this.global.ajax.call(this, "hemai_list", {
                        type: this.s_type,
                        order: this.s_order,
                        limit_begin: this.list.length,
                        limit_num: this.limit_num,
                        lotid: this.title_active,
                    }, this.getList_CB)
                }
            },
            getList_CB(d){
                if (d.error_code !== 0) {
                    this.global.toast.call(this, d.error_message);
                    this.list_load = false;
                } else if (d.data) {
                    this.list.push(...d.data.info);
                    if (d.data.info.length < this.limit_num) this.list_load = false;
                }
                this.stop_request = true;
                this.hideLoading();
            },
            hideLoading(){
                if (this.loading > 0) this.loading--;
                if (this.loading === 0) this.$vux.loading.hide();
            },
            init_list(){
                !this.list_load && (this.list_load = true);
                this.list = [];
                this.getList();
            },
            set_title(key){
                if (this.title_active !== key) {
                    this.title_active = key;
                    this.init_list();
                }
            },
            tag_s_type(s_type){
                if (this.s_type !== s_type) {
                    this.s_type = s_type;
                    this.s_order = 1;
                } else {
                    this.s_order = this.s_order === 1 ? 2 : 1;
                }
                this.init_list();
            },
            go_detail(i){
                this.$router.push('/hemai_detail?id=' + this.list[i].together_id + "&lotid=" + this.list[i].lotid)
            },
            hemai(k){
                const url = this.global.product_type[k];
                if (url) this.$router.push(url + '/index');
                else this.global.alert.call(this, "敬请期待");
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
