<template>
    <div id="app" class="app">
        <WxPupop v-if="isWx"></WxPupop>
        <router-view v-else v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>
    import NProgress from 'nprogress';
    import 'nprogress/nprogress.css';
    import WxPupop from './components/WxPupop'
    export default {
        name: 'app',
        components: {
            WxPupop
        },
        data(){
            return {
                isWx: null,
            }
        },
        created(){
            this.isWx = this.global.isWeiXin();

            //    路由全局钩子
            this.$router.beforeEach((to, from, next) => {
                NProgress.start();
                next()
            });
            this.$router.afterEach((to) => {
                NProgress.done();
            });
        },
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';
    @import './assets/css/reset.less';
</style>
