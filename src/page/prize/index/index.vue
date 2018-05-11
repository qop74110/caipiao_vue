<template>
    <div class="prize page">
        <ul class="lists">
            <li class="li" v-for="i in list" v-if="global.product_type[i.lotid]" :class="global.product_type[i.lotid]">
                <div v-if="global.product_type.shuangseqiu === i.lotid" @click="$router.push('prize_ssq')">
                    <span class="name">{{i.name}}</span>
                    <span class="time">第{{i.phase}}期 {{i.end_time}}（{{i.week}}）</span>
                    <div class="num style1 clearFix">
                        <span class="ball redBall fl" v-for="k in 6">{{i.bonuscode[k - 1]}}</span>
                        <span class="ball blueBall fl">{{i.bonuscode[6]}}</span>
                    </div>
                </div>
                <div v-else-if="global.product_type.jingcaizuqiu === i.lotid" @click="$router.push('prize_jczq')">
                    <span class="name">{{i.name}}</span>
                    <span class="time">比赛日 {{i.daytime}}</span>
                    <div class="num style2 clearFix ">
                        <div class="c clearFix green">
                            <div class="fl football"></div>
                            <div class="fl w30">{{i.after}}</div>
                            <div class="fl w20">{{i.result[0] + ' : ' + i.result[2]}}</div>
                            <div class="fl w30">{{i.front}}</div>
                        </div>
                    </div>
                </div>

                <div v-else-if="global.product_type.fucai3d === i.lotid" @click="$router.push('prize_fc3d')">
                    <span class="name">{{i.name}}</span>
                    <span class="time">第{{i.phase}}期 {{i.end_time}}（{{i.week}}）</span>
                    <div class="num style1 clearFix">
                        <span class="ball redBall fl" v-for="k in 3">{{i.bonuscode[k - 1]}}</span>
                    </div>
                </div>
            </li>
        </ul>

        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import {Tabbar} from "com";
    export default {
        name: 'prize',
        components: {Tabbar},
        data () {
            return {
                list: [],
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, "kj_list", {}, this.getList)
        },
        methods: {
            getList(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data && d.data.length > 0) {
                    d.data.forEach((item, index) => {
                        if (item.lotid === this.global.product_type.shuangseqiu || this.global.product_type.fucai3d === item.lotid) {
                            d.data[index].bonuscode = item.bonuscode.split(",");
                        }
                    });
                    this.list = d.data;
                }
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
