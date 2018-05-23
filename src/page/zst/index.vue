<template>
    <iframe class="zst" :src="src">

    </iframe>
</template>

<script>
    export default {
        name: 'zst',
        data () {
            return {
                src: '',
                url: {
                    ssq: 'http://jl.uplottery.cn/zst/ssq',
                    fc3d: 'http://jl.uplottery.cn/zst/fc3d',
                    jczq: 'http://baidu.com',
                    dlt: 'http://t.cp2y.com/draw.html#bt=10026',
                    p3: 'http://t.cp2y.com/draw.html#bt=10024',
                    p5: 'http://t.cp2y.com/draw.html#bt=100241'
                }
            }
        },
        created(){
            this.src = this.url[this.$route.params.type]
        },
        methods: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
