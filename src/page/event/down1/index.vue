<template>
    <div class="down1">
        <div v-show="!showGuide">
            <div class="top bg"></div>
            <div class="middle" >
                <div class="btn Android" @click="down">Android下载</div>
                <div class="btn iphone" @click="showGuide = true">iphone下载</div>
            </div>
            <div class="bottom bg"></div>
        </div>

        <Guide v-show="showGuide" @down="down"></Guide>
    </div>
</template>

<script>
    import Guide from "com/Guide";
    export default {
        name: 'down1',
        components: {
            Guide
        },
        data () {
            return {
                url: null,
                showGuide: false,
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
