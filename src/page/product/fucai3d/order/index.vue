<template>
    <div class="fucai3d_order" v-if="order !== null">
        <XHead :show_mord="false" :show_title_option="false">3D</XHead>

        <ul class="btn_list">
            <li class="btn fl btn_active" @click="zixuan">
                <i class="add icon"></i>
                自选号码
            </li>
            <li class="btn fl btn_active" @click="random">
                <i class="add icon"></i>
                机选一注
            </li>
            <li class="btn fl btn_active" @click="del">
                <i class="rm icon"></i>
                清空列表
            </li>
        </ul>

        <ul class="order_list">
            <li class="order" v-for="(item, index) in order">
                <div class="l fl" @click="del(index)"></div>
                <div class="r fl" @click="modify(index)">
                    <div class="num hideText">
                        <template v-if="item.type === 1">
                            <span class="redText">{{item.zhi.join(' | ')}}</span>
                        </template>
                        <template v-else-if="item.type === 3">
                            <span class="redText">{{item.three_fu.join(' ')}}</span>
                        </template>
                        <template v-else>
                            <span class="redText">{{item.six.join(' ')}}</span>
                        </template>
                    </div>
                    <div>{{item.type === 1 ? '单式': item.type === 3 ? '组三复式': item.notes > 1 ? '组六复式':'组六单式'}}
                        {{`${item.notes}注${item.money}元`}}
                    </div>
                </div>
            </li>
        </ul>

        <footer class="foot">
            <div class="foot_top">
                <div class="fl qishu">
                    <span class="text">追</span>
                    <XNumber input_w="1.6" :_val="qi" name="qi" h=".6" @on-change="setVal"></XNumber>
                    <span class="text">期</span>
                </div>

                <div class="fr bei">
                    <span class="text">投</span>
                    <XNumber input_w="1.6" :_val="bei" name="bei" h=".6" @on-change="setVal"></XNumber>
                    <span class="text">倍</span>
                </div>
            </div>
            <div class="foot_bottom">
                {{zhushu}}注{{qi}}期{{bei}}倍 共{{2 * zhushu * qi * bei }}元
                <span class="submit redBg" @click="submit">确定</span>
            </div>
        </footer>
    </div>
</template>

<script>
    import {XHead, XNumber} from "com";
    export default {
        name: 'fucai3d_order',
        components: {XHead, XNumber},
        data () {
            return {
                qi: 1,
                bei: 1,
                zhushu: 0,
                money: 0,
                order: null,
                play_type: null,
                phase: null,

                z_data: null,
            }
        },
        created(){
            this.getOrder();
            sessionStorage.removeItem("fc3d_zixuan");
            sessionStorage.removeItem("fc3d_modify");
        },
        methods: {
            getOrder(){
                let order = sessionStorage.getItem('fc3d_order') || "{}";
                if (order !== "{}") {
                    let o = JSON.parse(order);
//                    this.zhushu = o.notes || 0;
//                    this.money = o.money || 0;
                    this.bei = o.multiple || 1;
                    this.qi = o.periods || 1;
                    this.order = o.total || [];
                    this.phase = o.phase;

                    this.z_data = o.total;
                }
            },
            setVal(d){
                this[d.name] = d.val;
            },
            del(i){
                if (i > -1) this.order.splice(i, 1);
                else if (this.order.length > 0) {
                    const _this = this;
                    this.$vux.confirm.show({
                        content: "确认清空？",
                        onConfirm(){
                            _this.order = [];
                        }
                    })
                }
            },
            setZhuShu(){
                let zhushu = 0;
                for (let i = 0; i < this.order.length; i++) {
                    zhushu += this.order[i].notes;
                }
                this.zhushu = zhushu;
            },
            modify(i){
                sessionStorage.setItem("fc3d_order", JSON.stringify(this.set_request_data()));
                sessionStorage.setItem("fc3d_modify", i);
                this.$router.back();
            },
            zixuan(){
                sessionStorage.setItem("fc3d_order", JSON.stringify(this.set_request_data()));
                sessionStorage.setItem("fc3d_zixuan", 1);
                this.$router.back();
            },
            random(){
                const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                arr.sort(() => Math.random() > .5 ? -1 : 1);
                const type = this.order && this.order[0] && this.order[0].type ? this.order[0].type : 1;
                const obj = {
                    "zhi": "",
                    "three_dan": "",
                    "three_fu": "",
                    "six": "",
                    "notes": 1,
                    "money": 2,
                    "periods": 1,
                    "multiple": 1,
                    type
                };

                if (type === 1) {
                    obj.zhi = arr.splice(0, 3);
                } else {
                    const k = {'3': 'three_fu', "4": "six"}[type]
                    this.val4 = [];

                    obj[k] = [];
                    for (let i = 0; i < type - 1; i++) {
                        obj[k].push(arr[i])
                    }
                }

                this.order.unshift(obj);
            },
            set_request_data(){
                let notes = this.zhushu, periods = this.qi, multiple = this.bei;
                const d = {
                    total: [],
                    notes,
                    money: 2 * notes * periods * multiple,
                    periods,
                    multiple,
                    phase: this.phase
                };

                for (let i = 0; i < this.order.length; i++) {
                    let arr = JSON.parse(JSON.stringify(this.order[i]));
                    arr.money = arr.money * periods * multiple;
                    if (arr.type === 1) arr.zhi = arr.zhi;
                    else if (arr.type === 3) arr.three_fu = arr.three_fu;
                    else arr.six = arr.six;

                    delete arr.periods;
                    delete arr.multiple;
                    d.total.push(arr);
                }
                return d;
            },
            submit(){
                if (this.zhushu > 0) {
                    const data = this.set_request_data();

                    for (let i = 0; i < data.total.length; i++) {
                        if (typeof ( data.total[i].zhi ) === "object") data.total[i].zhi = data.total[i].zhi.join(",");
                        else if (typeof ( data.total[i].three_fu ) === "object") data.total[i].three_fu = data.total[i].three_fu.join(",");
                        else if (typeof ( data.total[i].six ) === "object") data.total[i].six = data.total[i].six.join(",");
                    }

                    this.$vux.loading.show();
                    this.global.ajax.call(this, 'fc3d_order', data, this.submit_CB);
                }
            },
            submit_CB(d){
                this.$vux.loading.hide();
                if (d.error_code === 1004) this.$router.push(`/recharge?money=${d.data.money}&orderid=${d.data.orderid}&type=${d.error_code}`);
                else if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.global.alert.call(this, "下单成功")
                }
            }
        },
        watch: {
            order(val){
                this.setZhuShu();
            },
            z_data(val){
                console.log(val)
            }
        },
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
