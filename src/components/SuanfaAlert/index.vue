<template>
    <div class="suanfa">
        <div @click="showPop_fun">获取验证码</div>
        <div class="popup fog" v-show="showPop">
            <div class="popup_box">
                <div class="popup_top">
                    <div class="fl l">{{problem}}</div>
                    <input class="fr r" :class="shakeClass && 'err'" type="tel" v-model="u_answer" maxlength="2"
                           :style="err && 'border-color: red'" @animationend="shakeClass = false"/>
                </div>
                <div class="popup_bottom" @click="test">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'suanfa',
        data () {
            return {
                showPop: false,                     //  true：显示问题
                u_answer: '',                       //  用户给的答案
                answer: null,                       //  正确答案
                problem: null,                      //  问题

                err: false,
                shakeClass: false,
            }
        },
        created(){

        },
        methods: {
            test(){
                if (this.u_answer * 1 === this.answer) {
                    this.showPop = false;
                    this.$store.commit('setSFState');
                } else {
                    this.u_answer = "";
                    this.err = this.shakeClass = true;
                }
            },
            showPop_fun(){
                function randomNum(min, max) {
                    return Math.floor(Math.random() * (max - min) + min)
                };
                this.showPop = true;
                const v1 = randomNum(1, 9)
                const v2 = randomNum(1, 9)
                this.problem = v1 + " + " + v2;
                this.answer = v1 + v2;
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
