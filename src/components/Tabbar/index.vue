<template>
    <div class="Tabbar vux-1px-t" v-if="page !== null">
        <div class="TabbarItem fl" v-if="page === 1">
            <img class="TabbarItem_img" src="./img/home.png">
            <p class="TabbarItem_text s">购彩</p>
        </div>
        <div class="TabbarItem fl" v-else @click="open('home')">
            <img class="TabbarItem_img" src="./img/home_h.png">
            <p class="TabbarItem_text">购彩</p>
        </div>

        <div class="TabbarItem fl" v-if="page === 4">
            <img class="TabbarItem_img" src="./img/hemai.png">
            <p class="TabbarItem_text s">合买</p>
        </div>
        <div class="TabbarItem fl" v-else @click="open('hemai')">
            <img class="TabbarItem_img" src="./img/hemai_h.png">
            <p class="TabbarItem_text">合买</p>
        </div>

        <div class="TabbarItem fl" v-if="page === 2">
            <img class="TabbarItem_img" src="./img/prize.png">
            <p class="TabbarItem_text s">开奖</p>
        </div>
        <div class="TabbarItem fl" v-else @click="open('prize')">
            <img class="TabbarItem_img" src="./img/prize_h.png">
            <p class="TabbarItem_text">开奖</p>
        </div>

        <div class="TabbarItem fl" v-if="page === 3">
            <img class="TabbarItem_img" src="./img/my.png">
            <p class="TabbarItem_text s">我的</p>
        </div>
        <div class="TabbarItem fl" v-else @click="open('my')">
            <img class="TabbarItem_img" src="./img/my_h.png">
            <p class="TabbarItem_text">我的</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Tabbar',
        data () {
            return {
                page: null,            //  1:购彩； 2：开奖；  3：我的   4: 合买    5: 订单
            }
        },
        created(){
            const page_name = this.$route.name;
            if (page_name === "home") this.page = 1;
            else if (page_name === "prize") this.page = 2;
            else if (page_name === "my") this.page = 3;
            else if (page_name === 'hemai') this.page = 4;
            else this.page = 5;
        },
        methods: {
            open(page){
                this.$router.push(`/${page}`)
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
