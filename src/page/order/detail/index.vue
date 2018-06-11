<template>
    <div class="detail page" v-if="detail !== null">
        <div class="head">
            <div class="left fl">
                <div class="left_top">
                    <img class="logo fl" :src="detail.logo" alt="">
                    <span class="p_name fl">
                        {{detail.name}}
                    </span>
                    <span class="phase fl" v-if="detail.play_type !== global.product_type.jingcaizuqiu">
                        第{{detail.phase}}期
                    </span>
                </div>
                <div class="left_bttom">
                    <div class="order_money fl">
                        {{detail.pay_money_total || detail.pay_money}}元
                        <p>订单金额</p>
                    </div>
                    <div class="winning_money fl">
                        <span class="redText">{{detail.winning_money === -1 ? '稍后会有工作人员主动联系您': detail.winning_money + '元'}}</span>
                        <p>中奖金额</p>
                    </div>
                </div>
            </div>
            <div class="right fl" :class="'openmatch' +  (detail.openmatch || 0)"></div>
        </div>
        <div class="border"></div>

        <!--双色球-->
        <div class="info" v-if="play_type === 'shuangseqiu'">
            <div class="row">
                <span class="text">订单状态：</span>
                <span class="balls redText" v-if="detail.openmatch === '3'">{{detail.s}}</span>
                <span class="balls" v-else>{{detail.s}}</span>
            </div>

            <div class="row">
                <span class="text">开奖号码</span>
                <template v-if="detail.bonuscode !== ''">
                    <template v-for="(item, index) in detail.bonuscode.split('#')[0].split(',')">
                        <span class="ball redText">{{item}}</span>
                    </template>
                    <span class="ball blueText">{{detail.bonuscode.split('#')[1]}}</span>
                </template>
                <span v-else>未开奖</span>
            </div>

            <div class="row">
                <span class="text">选号详情：</span>
                <span class="hideText balls">{{detail.info.length}}条</span>
            </div>

            <div class="row whiteBg con" v-for="(item, index) in detail.info">
                <!--双色球 101=单式 102=复式 103=胆拖-->
                <span class="l fl">{{item.play_type === '101' ? '单式': item.play_type === '102'? '复式':'胆拖'}}</span>

                <span class="fl c">
                     <template v-if="item.danBall">
                        <span class="redText">(</span>
                        <template v-for="(_item, index) in item.danBall">
                            <span class="redText">{{_item}} </span>
                        </template>
                        <span class="redText">)</span>
                    </template>
                    <template v-for="(_item, index) in item.redBall">
                        <span class="ball redText">{{_item}}</span>
                    </template>
                    <template v-for="(_item, index) in item.blueBall">
                        <span class="ball blueText">{{_item}}</span>
                    </template>
                </span>
                <span class="r fr" :class="item.type === 2 && 'jiang'">{{item.multiple}}倍</span>

            </div>

            <div class="quiz" @click="$router.push('/exposition?id=ssq')">
                <span class="text">中奖怎么算？</span>
            </div>
        </div>

        <!--福彩3d-->
        <div class="info" v-else-if="play_type === 'fucai3d'">
            <div class="row">
                <span class="text">订单状态：</span>
                <span class="balls redText" v-if="detail.openmatch === '3'">{{detail.s}}</span>
                <span class="balls" v-else>{{detail.s}}</span>
            </div>

            <div class="row">
                <span class="text">开奖号码：</span>
                <template v-if="detail.bonuscode !== ''">
                    <template v-for="(item, index) in detail.bonuscode.split('#')[0].split(',')">
                        <span class="ball redText">{{item}}</span>
                    </template>
                    <span class="ball blueText">{{detail.bonuscode.split('#')[1]}}</span>
                </template>
                <span v-else>未开奖</span>
            </div>

            <div class="row">
                <span class="text">选号详情：</span>
                <span class="hideText balls">{{detail.info.length}}条</span>
            </div>

            <div class="row whiteBg con" v-for="(item, index) in detail.info">
                <!--201=直选单式 221=直选复式 202=组选单式 231=组三复式 233=组六复式 215=直选位选-->
                <span class="l fl">{{item.play_type === '201' ? '直选单式':
                    item.play_type === '221'? '直选复式':
                    item.play_type === '202'? '组六单式':
                    item.play_type === '231'? '组三复式':
                    item.play_type === '233'? '组六复式':'直选位选'}}</span>

                <span class="fl c">
                        <span class="ball redText">{{item.bouns}}</span>
                </span>
                <span class="r fr" :class="item.type === 2 && 'jiang'">{{item.multiple}}倍</span>
            </div>


            <div class="quiz" @click="$router.push('/exposition?id=fc3d')">
                <span class="text">中奖怎么算？</span>
            </div>
        </div>

        <!--足彩-->
        <div class="info" v-else-if="play_type === 'jingcaizuqiu'">
            <div>
                <span class="text">订单状态：</span>
                <span class="hideText balls">{{detail.mess}}</span>
                <span class="text">投注信息：</span>
                <span class="hideText balls">
                    <span>{{detail.arr.length}}场， </span>
                    <span>{{detail.strand === "0" ? '单关': detail.strand +'串1'}}， </span>
                    <span> 方案{{detail.multiple}}倍</span>
                </span>
                <table class="tabal" v-if="$route.query.type !== 'FT005'">
                    <thead class="t_head">
                    <tr>
                        <th class="th">场次</th>
                        <th class="th">主队VS客队</th>
                        <th class="th">投注(赔率)</th>
                        <th class="th">彩果</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="tr" v-for="(item, index) in detail.arr">
                        <td class="td">
                            周{{item.week}}
                            <div>{{item.team_id}}</div>
                        </td>
                        <td class="td blueText">
                            <div class="hideText">{{`${$route.query.type === 'FT006' && ( '(' + item.letpoint + ')' )}${item.team.split(':')[0]}`}}</div>
                            <div>{{item.team.split('*')[1]}}</div>
                            <div class="hideText">{{item.team.split(':')[1].split('*')[0]}}</div>
                        </td>
                        <td class="td selected">
                            <div class="td_r" v-for="(k, j) in item.selected.split('*')">{{k}}</div>

                        </td>
                        <td class="td" :class="detail.openmatch == '3' && item.type === 1 && 'redText'">
                            {{item.result}}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--混合-->
                <table class="tabal" v-else>
                    <thead class="t_head">
                    <tr>
                        <th class="th w15">场次</th>
                        <th class="th w25">主队VS客队</th>
                        <th class="th ">玩法</th>
                        <th class="th">投注(赔率)</th>
                        <th class="th">彩果</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr class="tr" v-for="(item, index) in detail.arr">
                        <td class="td">
                            周{{item.week}}
                            <div>{{item.team_id}}</div>
                        </td>
                        <td class="td blueText">
                            <div class="hideText">{{item.team.split(':')[0]}}</div>
                            <div>{{item.team.split('*')[1]}}</div>
                            <div class="hideText">{{item.team.split(':')[1].split('*')[0]}}</div>
                        </td>
                        <td class="td">
                            <div class="td_r" v-for="j in item.info"
                                 :style="'height: ' + j.selected.split('*').length + 'rem; line-height: ' +  j.selected.split('*').length + 'rem'">
                                {{j.play_type}}
                            </div>
                        </td>
                        <td class="td selected">
                            <template v-for="j in item.info">
                                <div class="td_r" v-for="a in j.selected.split('*')">{{a}}</div>
                            </template>

                        </td>
                        <td class="td">
                            <div class="td_r" v-for="j in item.info"
                                 :style="'height: ' + j.selected.split('*').length + 'rem; line-height: ' +  j.selected.split('*').length + 'rem'">
                                {{j.result}}
                            </div>
                        </td>

                    </tr>

                    </tbody>
                </table>

                <div class="quiz" @click="$router.push('/exposition?id=jczq')">
                    <span class="text">中奖怎么算？</span>
                </div>
            </div>
        </div>

        <div class="foot">
            <span class="text">下单时间</span> {{detail.created_at}} <br>
            <span class="text">订单编号</span> {{detail.order_id}} <br>
            <span class="text">温馨提示</span> 奖金直接打入您的账户
        </div>

        <div class="del_order redText" @click="del_order">删除本订单</div>

        <div class="one_more">
            <div class="one_more_btn redBg" @click="one_more">再来一注</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        data () {
            return {
                detail: null,
                play_type: '',
            }
        },
        created(){
            const id = this.$route.query.id;
            if (id.length > 0) {
                this.$vux.loading.show();
                const type = this.$route.query.type;
                this.global.ajax.call(this, type === "FT005" ? 'order_footDetail' : 'order_detail', {id}, this.getData)
            }
        },
        methods: {
            getData(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data) {
                    const typt = this.global.product_type;

                    if (d.data.lotid === typt.shuangseqiu) {
                        this.play_type = 'shuangseqiu';
                        for (let i = 0; i < d.data.info.length; i++) {
                            if (d.data.info[i].play_type === "103") {
                                d.data.info[i].danBall = d.data.info[i].bouns.split("$")[0].split(",");
                                d.data.info[i].bouns = d.data.info[i].bouns.split("$")[1];
                            }
                            d.data.info[i].blueBall = d.data.info[i].bouns.split("#")[1].split(",");
                            d.data.info[i].redBall = d.data.info[i].bouns.split("#")[0].split(",");
                        }
//
                    } else if (d.data.lotid === typt.fucai3d) {
                        this.play_type = 'fucai3d';
                        d.data.info.forEach((item, index) => {
                            if (/201|221|215/.test(item.play_type)) {
                                const arr = item.bouns.split(',');
                                let str = "";
                                for (let i = 0; i < arr.length; i++) {
                                    for (let k = 0; k < arr[i].length; k++) {
                                        str += arr[i][k];
                                        if (k === arr[i].length - 1 && i !== arr.length - 1) str += "|";
                                        else if (k !== arr[i].length - 1) str += ",";
                                    }
                                }
                                d.data.info[index].bouns = str;
                            }
                        })
                    } else if (d.data[0] && d.data[0].play_type === typt.jingcaizuqiu) {
                        this.play_type = 'jingcaizuqiu';
                    }

                    const detail = d.data[0] || d.data;

                    this.setOrderState(detail)

                    this.detail = detail;
                }
            },
            setOrderState(detail){
                let s = '';
                if (detail.status === 4) {
                    if (detail.openmatch === '0') s = "等待开奖";
                    else if (detail.openmatch === '2') s = "未中奖";
                    else if (detail.openmatch === '3') s = "中奖 ";
                } else if (detail.status === 2) s = "委托中";
                else s = "委托失败";

                detail.s = s;

            },
            del_order(){
                const _this = this;
                this.$vux.confirm.show({
                    content: "删除后本订单将无法还原",
                    onConfirm () {
                        _this.$vux.loading.show();
                        _this.global.ajax.call(_this, 'order_del', {
                            id: _this.$route.query.id,
                            type: 1
                        }, _this.del_order_CB);
                    }
                })
            },
            del_order_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.global.alert.call(this, "删除成功");
                    this.$router.back();
                }
            },
            one_more(){
                const pt = this.play_type;
                let url = null;
                if (pt === "") url = 'home';
                else url = `${this.play_type}/index`;
                this.$router.push('/' + url);
            },
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
