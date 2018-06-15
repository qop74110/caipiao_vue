<template>
    <div class="suanfa">
        <div class="popup fog">
            <div class="popup_box">
                <div class="popup_top">
                    <div class="fl l">{{problem}}</div>
                    <input class="fr r" type="tel" v-model="u_answer" maxlength="2"/>
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
                testState: false,                   //  问题是否答对
                u_answer: '',                       //  用户给的答案
                answer: null,                       //  正确答案
                problem: null,                      //  问题
            }
        },
        created(){

        },
        methods: {
            test(){
                if (this.u_answer * 1 === this.answer) {
                    this.testState = true;
                    this.getCode();
                    this.showPop = false;
                } else this.u_answer = "";
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
