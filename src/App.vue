<template>
    <div id="app" class="app">
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css'
    export default {
        name: 'app',
        created(){
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
