<template>
    <div class="download">
        <div v-show="!tishi">
            <div class="bold">
                <div>幸运彩</div>
                <div>足不出户中大奖</div>
                <p class="s3">下载送红包</p>
            </div>
            <div class="btn an" @click="download('an')">
                <img src="./an.png" class="img">
                <span>Android下载</span>
            </div>
            <div class="btn ios" @click="tishi = true">
                <img src="./an.png" class="img">
                <span>iphone下载</span>
            </div>
        </div>


        <div class="tishi" v-show="tishi" @click="tishi = false">
            <div class="th_btn redBg" @click.stop="download('ios')">点击下载</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'download',
        data () {
            return {
                tishi: false,
            }
        },
        created(){
        },
        methods: {
            download(t){
                if (this.global.isWeiXin()) this.global.alert.call(this, "请在浏览器打开");
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
