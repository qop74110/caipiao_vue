<template>
    <div class="down1">
        <div class="top bg"></div>
        <div class="middle" @click="down">
            <div class="btn Android">Android下载</div>
            <div class="btn iphone">iphone下载</div>
        </div>
        <div class="bottom bg"></div>
    </div>
</template>

<script>
    export default {
        name: 'down1',
        data () {
            return {
                url: null,
            }
        },
        created(){
            this.url = this.$route.query.url;
        },
        methods: {
            down(){
                window.location.href = this.url;
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
