<template>
    <div class="download">
        <div class="btn an"  @click="download('an')">
            <img src="./an.png" class="img">
            <span>Android下载</span>
        </div>
        <div class="btn ios"  @click="download('ios')">
            <img src="./an.png" class="img">
            <span>iphone下载</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'download',
        data () {
            return {}
        },
        created(){

        },
        methods: {
            download(t){
                if( t === "ios") this.global.toast.call(this, '敬请期待');
                else {
                    const ajax_url = this.global.ajax_url;

                    const url = ajax_url.api['download_' + t];

                    window.location.href = url;
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
