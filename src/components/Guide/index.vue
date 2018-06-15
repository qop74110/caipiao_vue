<template>
    <div class="guide">
        <img src="./tishi.jpeg" class="img">

        <div class="downloadBtn redBg" @click="down">点击下载</div>
    </div>
</template>

<script>
    export default {
        name: 'guide',
        data () {
            return {}
        },
        created(){

        },
        methods: {
            down(){
                this.$emit('down')
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
