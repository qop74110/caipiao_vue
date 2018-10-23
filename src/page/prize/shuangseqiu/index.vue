<template>
    <ul class="prize_ssq page" v-if="list.length > 0">
        <li class="item" v-for="(item, index) in list">
            <p class="time">{{`第${item.phase}期 ${item.end_time} (${item.week})`}}</p>
            <p class="balls">
                <!--<span class="ball fl" v-for="(ball, i) in item.bonuscode">{{ball}}</span>-->
                <span class="ball fl" v-for="i in 5">{{item.bonuscode[i]}}</span>
                <span class="ball fl" :class="type === 'dlt' && 'blue'">{{item.bonuscode[5]}}</span>
                <span class="ball fl blue" >{{item.bonuscode[6]}}</span>
            </p>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'prize_ssq',
        data () {
            return {
                list: [],
                type: this.$route.query.type || 'ssq'
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, "kj_czh", {type: this.type}, this.getData)
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                else if (d.data && d.data.length > 0) {
                    for (let i = 0; i < d.data.length; i++) {
                        d.data[i].bonuscode = d.data[i].bonuscode.split(",");
                    }
                    this.list = d.data;
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "/index.less";
</style>
