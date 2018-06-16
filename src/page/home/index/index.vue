<template>
    <div class="home page" v-if="loading === 0">
        <div class="banner" v-if="banner !== []">
            <Banener :list="banner"></Banener>
        </div>

        <div class="marquee" v-if="notice !== []">
            <Marquee :list="notice"></Marquee>
        </div>

        <div class="product_list" v-if="product_list !== []">
            <ul class="product_ul clearFix">
                <li class="product_li fl" v-for="(item,index) in product_list" @click="open(index)" :key="item.id">
                    <img :src="item.logo" class="product_img">
                    <p class="product_name">{{item.title}}</p>
                    <p class="product_text">{{item.desc}}</p>
                </li>
            </ul>
        </div>

        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import {Tabbar, Banener, Marquee} from "com";
    export default {
        name: 'home',
        components: {Tabbar, Banener, Marquee},
        data () {
            return {
                banner: [],
                notice: [],
                product_list: [],
                loading: 3,
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, "home_banner", {}, this.getBanner);
            this.global.ajax.call(this, "home_notice", {}, this.getNotice);
            this.global.ajax.call(this, "home_list", {}, this.getList);
        },
        methods: {
            getBanner(d){
                this.hideLoading()
                if (d.error_code !== 0) this.global.toast(d.error_message);
                else if (d.data) {
                    this.banner = d.data;
                }
            },
            getNotice(d){
                this.hideLoading();
                if (d.error_code !== 0) this.global.toast(d.error_message);
                else if (d.data) {
                    this.notice = d.data;
                }
            },
            getList(d){
                this.hideLoading();
                if (d.error_code !== 0) this.global.toast(d.error_message);
                else if (d.data) {
                    this.product_list = d.data;
                }
            },
            hideLoading(){
                --this.loading === 0 && this.$vux.loading.hide();
            },
            open(i){
                this.global.ajax.call(this, "tj_home_pro", {
                    token: this.global.cookie.get('token') || '0',
                    lotid: this.product_list[i].lotid
                }, console.log)
//                判断彩种是否启用  1=启用 2=未启用
                if (this.product_list[i].status === "2") this.global.alert.call(this, "暂停销售");
                else {
                    const url = this.global.product_type[this.product_list[i].lotid];
                    if (url) {
                        this.$router.push(url + '/index');
                        sessionStorage.removeItem('hemai');
                    } else this.global.alert.call(this, "敬请期待");
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
