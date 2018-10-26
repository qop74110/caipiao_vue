<template>
    <div class="paiOrder">
        <div class="title">
            <div class="substitute">
                <div class="callback fl" @click="$router.back()"></div>
                <div class="title fl">{{title[playType] || ''}}</div>
                <div class="btn fl"></div>
                <LaunchBtn v-if="!hemai" :fun="submit"></LaunchBtn>
            </div>
        </div>

        <div class="btnList">
            <div class="btnIten" @click="$router.back()">
                <i class="icon add"></i>
                自选号码
            </div>
            <div class="btnIten" @click="addList">
                <i class="icon add"></i>
                机选一注
            </div>
            <div class="btnIten" @click="clearList">
                <i class="icon clear"></i>
                清空列表
            </div>
        </div>

        <div class="orderList">
            <div class="first"></div>
            <template v-if="orderList !== null">
                <div class="orderItem" v-for="(item, index) in orderList">
                    <template v-if="playType === 'p3'">
                        <template v-if="item.type === 1">
                            {{`${item.hundred.join(',')} | ${item.ten.join(',')} | ${item.individual.join(',')}`}}
                            <p class="black">{{`直选 ${item.notes}注 ${item.money}元`}}</p>
                        </template>

                        <template v-else-if="item.type === 2">
                            {{`${item.individual.join(',')}`}}
                            <p class="black">{{`组三复式 ${item.notes}注 ${item.money}元`}}</p>
                        </template>

                        <template v-else-if="item.type === 3">
                            {{`${item.individual.join(',')}`}}
                            <p class="black">{{`组六 ${item.notes}注 ${item.money}元`}}</p>
                        </template>
                    </template>
                    <template v-else-if="playType === 'p5'">
                        {{`${item.absolutely.join(',')} | ${item.thousand.join(',')} | ${item.hundred.join(',')} |
                        ${item.ten.join(',')} | ${item.individual.join(',')}
                        `}}
                        <p class="black">{{`直选 ${item.notes}注 ${item.money}元`}}</p>
                    </template>

                    <template v-else-if="playType === 'dlt'">
                        <template v-if="item.type === 2">
                            <span class="redText">{{`(${item.red.join(' ')}) ${item.red_tuo.join(' ')}`}}</span>
                            <span class="blueText">{{`(${item.blue.join(' ')}) ${item.blue_tuo.join(' ')}`}}</span>
                            <p>{{`胆拖 ${item.notes}注 ${item.money}元`}}</p>
                        </template>
                        <template v-else-if="item.type === 1">
                            <span class="redText">{{item.red.join(' ')}}</span>
                            <span class="blueText">{{item.blue.join(' ')}}</span>
                            <p>{{`${item.notes > 1 ? '复式' : '单式'} ${item.notes}注 ${item.money}元`}}</p>
                        </template>
                        <template v-else>无效的type ${{item.typ}}</template>
                    </template>
                    <template v-else>无效的playType ${{playType}}</template>
                    <div class="del" @click="del(index)"></div>
                </div>
            </template>

        </div>

        <footer class="footer">
            <div class="substitute">
                <label class="stop" v-if="qi > 1">
                    <input type="checkbox" class="op fr" v-model="is_stop">
                    <span class="box fl"></span>
                    <span class="fl">中奖后停止追期</span>
                </label>
                <div class="btnBox">
                    <div class="fl setItem">
                        <span class="setText">追</span>
                        <XNumber input_w="1.6" :_val="qi" name="qi" h=".6" @on-change="setVal"></XNumber>
                        <span class="setText">期</span>
                    </div>

                    <div class="fl setItem">
                        <span class="setText">投</span>
                        <XNumber input_w="1.6" :_val="bei" name="bei" h=".6" @on-change="setVal"
                                 :max_val="50"></XNumber>
                        <span class="setText">倍</span>
                    </div>
                </div>
                <div class="bottom">
                    {{`${notes}注${qi}期${bei}倍`}} 共<span class="redText">{{money}}</span>元
                    <div class="next" @click="submit(false)">付款</div>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>
    import DLTrandom from '../../daletou/com/randomNotes'
    import {LaunchBtn, XNumber} from  "com"
    export default {
        name: 'paiOrder',
        components: {LaunchBtn, XNumber},
        data () {
            return {
                title: {
                    p3: '排列三',
                    p5: '排列五',
                    dlt: '大乐透'
                },
                playType: this.$route.params.playType || '',

                hemai: false,

                orderList: null,
                phase: null,
                qi: 1,
                bei: 1,
                notes: 0,
                money: 0,
                is_stop: false
            }
        },
        created () {
            if (sessionStorage.getItem('hemai')) this.hemai = true;

            this.getOrderList()

            this.global.cookie.remove(`${this.playType}OraderAdd`)
        },
        methods: {
            getOrderList () {
                this.orderList = JSON.parse(localStorage.getItem(this.playType + 'Orber') || "[]")

                this.phase = localStorage.getItem(this.playType + 'Phase')
            },
            addList () {
                const objKeyName = ['individual', 'ten', 'hundred', 'thousand', 'absolutely']
                const obj = {}
                if (this.playType === 'p3') {
                    const type = this.orderList[0] ? this.orderList[0].type : 1
                    obj.type = type

                    if (type === 1) {
                        for (let i = 0; i < 3; i++) {
                            obj[objKeyName[i]] = [this.random().toString()]
                        }
                    }
                    else if (type === 2) {
                        const n = []
                        n.push(this.random().toString())

                        for (let i = 0; i < 50; i++) {
                            const val = this.random().toString()
                            if (val !== n[0]) {
                                n.push(val)
                                break;
                            }
                        }
                        obj[objKeyName[0]] = n
                    }

                    else if (type === 3) {
                        const n = []
                        n.push(this.random().toString())

                        for (let i = 0; i < 50; i++) {
                            const val = this.random().toString()
                            if (val !== n[0] && val !== n[1]) {
                                n.push(val)
                            }

                            if (n.length === 3) break;
                        }

                        obj[objKeyName[0]] = n
                    }
                }
                else if (this.playType === 'p5') {
                    for (let i = 0; i < objKeyName.length; i++) {
                        obj[objKeyName[i]] = [this.random().toString()]
                    }

                } else if (this.playType === 'dlt') {
                    const ball = DLTrandom()
                    obj.red = ball.red
                    obj.blue = ball.blue
                    obj.notes = 1
                    obj.money = 2
                    obj.periods = this.phase
                    obj.multiple = 1
                } else {
                    console.error('无效的 "playTpte"')
                }
                obj.notes = '1'
                obj.money = obj.notes * 2 + ''
                obj.type = 1

                this.orderList.unshift(obj)
            },
            clearList () {
                this.orderList = new Array()
            },
            del (i) {
                this.orderList.splice(i, 1);
            },
            /**
             * 生成0-9的随机数
             * @returns {number}
             */
            random (max = 10) {
                return Math.floor(Math.random() * max);
            },
            setVal(d){
                this[d.name] = d.val;
            },

            setNotes () {
                let notes = 0;
                for (let i = 0; i < this.orderList.length; i++) {
                    notes += (this.orderList[i].notes * 1)
                }
                this.notes = notes
            },
            setMoney () {
                this.money = this.qi * this.bei * this.notes * 2
            },
            setOrderList () {
                const list = []
                this.orderList.map((item) => {
                    let obj = {
                        notes: item.notes,
                        money: item.money
                    }
                    if (item.individual) obj.ten = item.individual.join("")
                    if (item.ten) obj.ten = item.ten.join("")
                    if (item.hundred) obj.hundred = item.hundred.join("")
                    if (item.thousand) obj.thousand = item.thousand.join("")
                    if (item.absolutely) obj.absolutely = item.absolutely.join("")
                    if (item.red) obj.red = item.red.join(",")
                    if (item.red_tuo) obj.red_tuo = item.red_tuo.join(",")
                    if (item.blue) obj.blue = item.blue.join(",")
                    if (item.blue_tuo) obj.blue_tuo = item.blue_tuo.join(",")
                    if (item.type) obj.type = item.type

                    list.push(obj)
                })
                return list
            },
            submit (isHemai = false) {
                if (this.notes < 1) this.global.toast.call(this, '请投注')
                else {
                    let d = null
//                    if (/p3|p5/.test(this.playType)) {
                    d = {
                        notes: this.notes,
                        money: this.money,
                        periods: this.qi,
                        multiple: this.bei,
                        phase: this.phase,
                        total: this.setOrderList(),
                        is_stop: this.is_stop ? 1 : 2
                    }

                    if (this.playType === 'dlt') {
                        d.is_add = 2
                        d.stop_money = 0
                    }

//                    } else if (this.playType === 'dlt') {
//
//                    } else console.error('未知的 "playType"')

                    if (isHemai) {
                        if (d.money < 8) this.global.alert.call(this, "方案金额不能小于8元");
                        else if (this.qi > 1) this.global.alert.call(this, "合买不能追期");
                        else {
                            sessionStorage.setItem("together_order", JSON.stringify(d));
                            this.$router.push(`/pay_hemai?title=${this.title[this.playType]}&lotid=` + this.playType);
                        }
                    }
                    else {
                        console.log(d)
                        sessionStorage.setItem("pay_data", JSON.stringify(d));
                        this.$router.push(`/payment?lotid=${this.playType}`);
                    }
                }
            }
        },
        watch: {
            orderList (val, oldval) {
                if (oldval !== null) localStorage.setItem(this.playType + 'Orber', JSON.stringify(val))
                this.setNotes()
            },
            qi () {
                this.setMoney()
            },
            bei () {
                this.setMoney()
            },
            notes () {
                this.setMoney()
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./order.less";
</style>
