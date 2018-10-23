<template>
    <div class="dltIndex">
        <XTitle :activeTitle="activeTitle" :titleOption="titleOption" :setTitle="setTitle"
                :moreOption="moreOption" :MOcallback="MOcallback"></XTitle>

        <XHistory v-if="time !== null" :time="time" :historyList="historyList"
                  :getHistoryList="getHistoryList"></XHistory>

        <!--普通投注-->
        <div v-show="activeTitle === 0">

            <div class="border"></div>

            <!--机选-->
            <div class="random">
                <span @click="randomNotes" class="redText">机选</span> <span class="fr">至少选择5个红球，2个蓝球</span>
            </div>

            <!--红球-->
            <div class="ballBox">
                <div class="ball redText" v-for="i in 35" :key="'redBall' + i">
                    <input type="checkbox" :value="(i < 10 ? '0': '') + i" v-model="redBall" class="checkbox">
                    <div class="num red">
                        <div class="grayBorder"></div>
                        {{i < 10 ? '0' + i : i}}
                    </div>
                    <div class="miss" v-if="missData && missData.red.length > 0">{{missData.red[i - 1]}}</div>
                </div>
            </div>

            <div class="border"></div>

            <!--蓝球-->
            <div class="ballBox">
                <div class="ball blueText" v-for="i in 12" :key="'blueBall' + i">
                    <input type="checkbox" :value="(i < 10 ? '0': '') + i" v-model="blueBall" class="checkbox">
                    <div class="num blue">
                        <div class="grayBorder"></div>
                        {{i < 10 ? '0' + i : i}}
                    </div>
                    <div class="miss" v-if="missData && missData.blue.length > 0">{{missData.blue[i - 1]}}</div>
                </div>
            </div>

        </div>

        <!--胆拖投注-->
        <div v-show="activeTitle === 1">

            <!--红胆-->
            <div class="ballBox">
                <div class="prompt">胆码-前区，最多选4个，最少选1个</div>
                <div class="ball redText" v-for="i in 35" :key="'redBallDan' + i">
                    <input type="checkbox" :value="(i < 10 ? '0': '') + i" v-model="redBallDan" class="checkbox">
                    <div class="num red">
                        <div class="grayBorder"></div>
                        {{i < 10 ? '0' + i : i}}
                    </div>
                    <div class="miss" v-if="missData && missData.red.length > 0">{{missData.red[i - 1]}}</div>
                </div>
            </div>

            <!--红拖-->
            <div class="ballBox">
                <div class="prompt">拖码-前区</div>
                <div class="ball redText" v-for="i in 35" :key="'redBallTuo' + i">
                    <input type="checkbox" :value="(i < 10 ? '0': '') + i" v-model="redBallTuo" class="checkbox">
                    <div class="num red">
                        <div class="grayBorder"></div>
                        {{i < 10 ? '0' + i : i}}
                    </div>
                    <div class="miss" v-if="missData && missData.red.length > 0">{{missData.red[i - 1]}}</div>
                </div>
            </div>

            <!--蓝胆-->
            <div class="ballBox">
                <div class="prompt">胆码-后区，最多选1个</div>
                <div class="ball blueText" v-for="i in 12" :key="'blueBallDan' + i">
                    <input type="checkbox" :value="(i < 10 ? '0': '') + i" v-model="blueBallDan" class="checkbox">
                    <div class="num blue">
                        <div class="grayBorder"></div>
                        {{i < 10 ? '0' + i : i}}
                    </div>
                    <div class="miss" v-if="missData && missData.blue.length > 0">{{missData.blue[i - 1]}}</div>
                </div>
            </div>

            <!--蓝拖-->
            <div class="ballBox">
                <div class="prompt">拖码-后区，最少选2个</div>
                <div class="ball blueText" v-for="i in 12" :key="'blueBallTuo' + i">
                    <input type="checkbox" :value="(i < 10 ? '0': '') + i" v-model="blueBallTuo" class="checkbox">
                    <div class="num blue">
                        <div class="grayBorder"></div>
                        {{i < 10 ? '0' + i : i}}
                    </div>
                    <div class="miss" v-if="missData && missData.blue.length > 0">{{missData.blue[i - 1]}}</div>
                </div>
            </div>
        </div>


        <div class="foot">
            <div class="substitute">
                <div class="clearBtn fl" @click="clear">清空</div>
                <div class="notes fl">
                    {{`${notes}注 共`}}<span class="redText">{{notes * 2}}</span>元
                </div>
                <div class="next fr" @click="next">下一步</div>
            </div>
        </div>

    </div>
</template>

<script>
    import XTitle from '../com/XTitle/XTitle.vue'
    import XHistory from '../com/history/history.vue'
    import randomNotes from '../com/randomNotes'
    import getNotes from '../com/getNotes'
    export default {
        name: 'dltIndex',
        components: {
            XTitle, XHistory
        },
        data () {
            return {
                activeTitle: 0,
                titleOption: [
                    "普通投注", '胆拖投注'
                ],
                moreOption: ['多期机选', '显示遗漏', '近期开奖', '走势图', '玩法说明'],

                missData: null,

                time: null,
                historyList: [],

                redBall: [],
                blueBall: [],
                redBallTuo: [],
                redBallDan: [],
                blueBallTuo: [],
                blueBallDan: [],

                notes: 0
            }
        },
        created () {
            this.$vux.loading.show()
            this.global.ajax.call(this, 'dlt_time', {}, this.getTime.bind(this))
        },
        methods: {
            getTime (d) {
                this.$vux.loading.hide()
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                else if (d.data[0]) {
                    this.time = d.data[0]
                }
            },
            getHistoryList(callback = console.log){
                this.$vux.loading.show()
                this.global.ajax.call(this, 'dlt_his', {}, (d) => {
                    this.$vux.loading.hide()
                    if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                    else {
                        this.historyList = d.data
                        callback()
                    }
                })
            },
            setTitle (key) {
                if (key !== 'cancel') this.activeTitle = key
            },
            MOcallback (key) {
                switch (key) {
                    case 0:
                        this.$router.push('/shuangseqiu/random?type=dlt')
                        break;
                    case 1:
                        this.miss()
                        break;
                    case 2:
                        this.$router.push('/prize/dlt')
                        break;
                    case 3:
                        this.$router.push('/zst/dlt')
                        break;
                    case 4:
                        this.$router.push('/exposition?id=dlt')
                        break;
                    default:
                        console.error('错误的下标')
                }
            },
            randomNotes() {
                const ball = randomNotes()
                this.redBall = ball.red
                this.blueBall = ball.blue
            },
            miss() {
                if (this.missData === null) {
                    this.$vux.loading.show()
                    this.global.ajax.call(this, 'dlt_miss', {}, (d) => {
                        this.$vux.loading.hide()
                        if (d.error_code !== 0) this.global.toast.call(this, d.error_message)
                        else {
                            this.moreOption[1] = '隐藏遗漏'
                            this.missData = d.data
                        }
                    })
                } else {
                    this.missData = null
                    this.moreOption[1] = '显示遗漏'
                }
            },
            setNotes () {
                let d = null
                if (this.activeTitle === 0) {
                    d = {
                        red: this.redBall.length,
                        blue: this.blueBall.length
                    }
                } else if (this.activeTitle === 1) {
                    d = {
                        red: this.redBallTuo.length,
                        blue: this.blueBallTuo.length,
                        redDan: this.redBallDan.length,
                        blueDan: this.blueBallDan.length,
                    }
                }
                this.notes = getNotes(this.activeTitle, d)
            },
            clear () {
                if (this.activeTitle === 0) {
                    if (this.redBall.length > 0) this.redBall = []
                    if (this.blueBall.length > 0) this.blueBall = []
                } else if (this.activeTitle === 1) {
                    if (this.redBallTuo.length > 0) this.redBallTuo = []
                    if (this.redBallDan.length > 0) this.redBallDan = []
                    if (this.blueBallTuo.length > 0) this.blueBallTuo = []
                    if (this.blueBallDan.length > 0) this.blueBallDan = []
                }
            },
            /**
             * 去除重复的号码
             * @param num 要判读重复的值
             * @param name 招谁判断
             */
            unique (num, name) {
                const i = this[name].indexOf(num);
                if (i !== -1) {
                    this[name].splice(i, 1)
                    return false
                }
                else return true
            },
            next () {
                if (this.time.phase < 0) this.global.toast.call(this, '开奖中！请20：00后再来')
                else if (this.notes < 1) this.global.toast.call(this, '请投注')
                else {
                    this.$router.push('/dlt/order')
                }
            }
        },
        watch: {
            activeTitle () {
                this.setNotes()
            },
            redBall (val, oldval) {
                if (val.length > 20) {
                    this.global.toast.call(this, '最多选择20个红球')
                    this.redBall = oldval
                } else this.setNotes()
            },
            blueBall (val) {
                this.setNotes()
            },
            redBallDan (val, oldval) {
                if ((this.unique(val[val.length - 1], 'redBallTuo')) &&
                    val.length > 0 && val.length < 5) this.setNotes()
                else if (val.length > 4) {
                    this.redBallDan = oldval
                    this.global.toast.call(this, '最多选4个胆码前区')
                }
            },
            redBallTuo (val, oldval) {
                if (val.length > 20) {
                    this.global.toast.call(this, '最多选择20个托码前区')
                    this.redBallTuo = oldval
                } else {
                    if ((this.unique(val[val.length - 1], 'redBallDan')) &&
                        val.length + this.redBallDan.length > 5) this.setNotes()
                }
            },
            blueBallDan (val, oldval) {
                if (val.length > 1) {
                    this.blueBallDan = oldval
                    this.global.toast.call(this, '最多选1个胆码后区')
                } else if (this.unique(val[val.length - 1], 'blueBallTuo')) this.setNotes()

            },
            blueBallTuo (val) {
                if (this.unique(val[val.length - 1], 'blueBallDan')) this.setNotes()
            }

        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
