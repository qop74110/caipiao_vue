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
                    <div class="del" @click="del(index)"></div>
                </div>
            </template>

        </div>

        <footer class="footer">
            <div class="substitute">
                <div class="btnBox"></div>
                <div class="stop"></div>
                <div class="bottom"></div>
            </div>
        </footer>

    </div>
</template>

<script>
    import {LaunchBtn} from  "com"
    export default {
        name: 'paiOrder',
        components: {LaunchBtn},
        data () {
            return {
                title: {
                    p3: '排列三',
                    p5: '排列五'
                },
                playType: this.$route.params.playType || '',

                hemai: false,

                orderList: null,
                phase: null
            }
        },
        created () {
            if (sessionStorage.getItem('hemai')) this.hemai = true;

            this.getOrderList()

            this.global.cookie.remove(`${this.playType}OraderAdd`)
        },
        methods: {
            getOrderList () {
                this.orderList = JSON.parse(this.global.cookie.get(this.playType + 'Orber'))

                this.phase = this.global.cookie.get(this.playType + 'Phase')
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

                } else {
                    console.error('无效的 "playTpte"')
                }
                obj.notes = '1'
                obj.money = '2'

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
            submit () {

            }
        },
        watch: {
            orderList (val, oldval) {
                if (oldval !== null) this.global.cookie.set(this.playType + 'Orber', JSON.stringify(val))
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "order.less";
</style>
