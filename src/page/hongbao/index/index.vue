<template>
    <div class="hongbao">
        <XHead :show_mord="false" :show_title_option="false">
            红包
            <span class="help" @click="$router.push('/hb_help')"></span>
        </XHead>
        <Bar :list="bar_list" v-model="bar_value" class="bar"></Bar>


        <div class="content" v-if="loading === 0">
            <!--兑奖码-->
            <div class="cashingCode">
                <input type="text" class="input" v-model="cashingCode">
                <span class="btn redBg">兑换</span>
            </div>

            <div class="available list">

            </div>


            <div class="noData"></div>
        </div>

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
                ],

                available: [],          //  可用红包列表
                disabled: [],           //  用完/过期 红包列表

                cashingCode: "",        //  兑奖码

                loading: 1,
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, 'hb_data', {}, this.getData)

            this.global.ajax.call(this, 'hb_share', {}, console.log);
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    console.log(d.data)
                }
                this.loading--;
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
