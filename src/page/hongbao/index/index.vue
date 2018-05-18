<template>
    <div class="hongbao">
        <XHead :show_mord="false" :show_title_option="false">
            红包
            <span class="help" @click=""></span>
        </XHead>
        <Bar :list="bar_list" v-model="bar_value" class="bar"></Bar>
    </div>
</template>

<script>
    import {XHead, Bar} from "com";
    export default {
        name: 'hongbao',
        components: {
            XHead, Bar
        },
        data () {
            return {
                bar_value: 0,
                bar_list: [
                    "可用",
                    "用完/过期"
                ]
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, 'hb_data', {}, this.getData)
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    console.log(d.data)
                }
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
