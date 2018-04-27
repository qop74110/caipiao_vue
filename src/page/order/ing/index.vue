<template>
    <div class="order_ing page">
        <order_list apiName="order_ing"></order_list>
    </div>
</template>

<script>
    import order_list from "../list"
    export default {
        name: 'order_ing',
        components: {
            order_list
        },
        data () {
            return {}
        },
        created(){

        },
        methods: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
</style>
