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
                    ssq: 'http://m.500.com/datachart/ssq/jb.html',
                    fc3d: 'http://m.500.com/datachart/sd/jb.html',
                    jczq: 'http://baidu.com',
                    dlt: 'http://m.500.com/datachart/dlt/jb.html',
                    p3: 'http://m.500.com/datachart/pls/jb.html',
                    p5: 'https://m.500.com/datachart/plw/zx/0.html'
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
