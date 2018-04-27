<template>
    <div class="order_all page">
        <order_list apiName="order_all"></order_list>
    </div>
</template>

<script>
    import order_list from "../list"
    export default {
        name: 'order_all',
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
