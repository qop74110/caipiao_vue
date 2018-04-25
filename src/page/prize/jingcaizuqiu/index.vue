<template>
    <div class="prize_jczq">
        <dl class=" accordion" v-if="list.length > 0">
            <template v-for="(item,index) in list">
                <dt class="accordion_title" @click="hide_accordion_content(index)">
                    {{`${item.date} ${item.week} ${item.count}比赛已开奖`}}
                    <i class="fr arrow" :class="!show_content[index] && 'rotate'"></i>
                </dt>
                <dd class="accordion_content" :class="!show_content[index] && 'hide_content'">
                    <div class="item" v-for="(i,k) in item.matchResult">
                        <div class="item_top">
                            <div class="w20 fl first">
                                <p class="league">{{i.league}}</p>
                                <p class="week">{{`${i.week} ${i.team_id}`}}</p>
                            </div>
                            <div class="w30 fl team hideText">
                                {{i.homeTeam}}
                            </div>
                            <div class="w20 fl score">
                                <p class="result redText">{{i.result}}</p>
                                <p class="firsthalf_result">半{{i.firsthalf_result}}</p>
                            </div>
                            <div class="w30 fl team hideText">
                                {{i.awayTeam}}
                            </div>
                        </div>
                        <div class="item_bottom">
                            <template v-for="a in i.resultMsg">
                                <div class="fl bor_b">{{a.msg}}</div>
                            </template>
                            <template v-for="a in i.resultMsg">
                                <div class="fl">{{a.odds}}</div>
                            </template>
                        </div>
                    </div>
                </dd>
            </template>
        </dl>
        <footer class="foot" @click="$router.push('/jingcaizuqiu/index')">
            <div class="redBg btn_active btn">投注竞彩足球</div>
        </footer>
    </div>

</template>

<script>
    export default {
        name: 'prize_jczq',
        data () {
            return {
                list: [],               //  列表
                show_content: [],       //  显示&隐藏 accordion_content
            }
        },
        created(){
            this.request();
        },
        methods: {
            request(d = {}){
                this.$vux.loading.show();
                this.global.ajax.call(this, "kj_jczq", d, this.getData)
            },
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                else if (d.data && d.data.length > 0) {
                    for (let i = 0; i < d.data.length; i++) {
                        this.show_content[i] = true;
                    }
//                    console.log(this.show_content)
                    this.list = d.data;
                }
            },
            hide_accordion_content(i){
//                this.show_content[i] = !this.show_content[i];
//                console.log(this.show_content[i])
                this.$set(this.show_content, i, !this.show_content[i])
            },

        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
