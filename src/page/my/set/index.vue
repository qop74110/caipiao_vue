<template>
    <div class="set page">
        <div class="list vux-1px-b" @click="$router.push('/service')">
            <img class="list_img" src="./img/list1.png">
            服务协议
        </div>
        <div class="list vux-1px-b" @click="$router.push('/about')">
            <img class="list_img" src="./img/list2.png">
            关于
        </div>

        <div class="out" @click="out">退出登录</div>

    </div>
</template>

<script>
    export default {
        name: 'set',
        data () {
            return {}
        },
        created(){

        },
        methods: {
            out(){
                const arr = ['amount', 'integral', 'mobile', 'token', 'user_name'];
                arr.forEach((item) => {
                    this.global.cookie.remove(item)
                });
                this.$router.push('/login');
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
