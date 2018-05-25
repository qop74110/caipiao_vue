<template>
    <div class="my page">
        <header class="header">
            <div class="header_img fl" :style="`background-image: url(${head_img || '/static/img/header_img.png'})`">
                <label for="file" class="label" v-if="token">
                    <input type="file" accept="image/*" class="file" id="file" @change="setHead" >
                </label>
            </div>

            <span class="user_tel" v-if="!token" @click="$router.push('login')">登录/注册</span>
            <input class="user_tel" v-else v-model="tel" @blur="setName" @focus="oldName = tel; tel = ''" placeholder="请修改昵称"/>
        </header>

        <ul class="money clearFix">
            <li class="fl" @click="open('recharge')">
                充值
                <span class="fr line"></span>
            </li>
            <li class="fl middle">
                <p class="num hideText">{{balance}}</p>
                <span class="balance">余额</span>
            </li>
            <li class="fl" @click="open('tixian')">
                <span class="flet line"></span>
                提现
            </li>
        </ul>

        <ul class="order clearFix">
            <li class="fl" @click="open('/order/all')">
                <img class="order_img" src="./img/order1.png" alt="">
                <p class="order_text">全部订单</p>
            </li>
            <li class="fl" @click="open('/order/chase')">
                <img class="order_img" src="./img/order2.png" alt="">
                <p class="order_text">追号订单</p>
            </li>
            <li class="fl" @click="open('/order/prize')">
                <img class="order_img" src="./img/order3.png" alt="">
                <p class="order_text">中奖订单</p>
            </li>
            <li class="fl" @click="open('/order/ing')">
                <img class="order_img" src="./img/order4.png" alt="">
                <p class="order_text">待开奖订单</p>
            </li>
        </ul>

        <ul class="lists">
            <li class="li" @click="open('/hongbao')">
                <img class="lists_img" src="./img/l1.png">
                我的红包
            </li>
            <li class="li" @click="share">
                <img class="lists_img" src="./img/l2.png">
                分享给朋友
            </li>
            <li class="li" @click="open('set')">
                <img class="lists_img" src="./img/l3.png">
                设置
            </li>
        </ul>

        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import {Tabbar} from "com";
    export default {
        name: 'my',
        components: {Tabbar},
        data () {
            return {
                token: this.global.cookie.get("token"),
                tel: this.global.cookie.get("user_name") || '',
                balance: "0.00",
                head_img: '',
                oldName: '',
            }
        },
        created(){
            if (this.token) {
                this.$vux.loading.show();
                this.global.ajax.call(this, 'my_balance', {token: this.token}, this.getBalance)
            }
        },
        methods: {
            getBalance(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else if (d.data.amount) {
                    this.balance = d.data.amount;
                    this.head_img = d.data.avatar;
                    this.tel = d.data.name || '幸运彩';
                    this.global.cookie.set('amount', this.balance);
                }
            },
            share(){
                this.global.share.call(this)
            },
            open(url){
                if (this.token) {
                    if (url === "") this.global.toast.call(this, "还没写");
                    else this.$router.push(url);
                } else this.$router.push('/login');
            },
            setHead(e){
                const token = this.global.cookie.get('token');
                if (!token) this.$router.push('login');
                else {
                    const file = e.target && e.target.files[0];
                    const maxSize = 2097152;
                    let imgSrc = "";
                    if (!/image\/(png|jpg|jpeg)/.test(file.type)) this.global.toast.call(this, "只能选择(png,jpg)格式图片");
                    else if (maxSize < file.size) this.global.toast.call(this, "最大上传两兆");
                    else if (typeof(FileReader) === 'undefined') this.global.alert.call(this, "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！");
                    else {
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        this.$vux.loading.show();
                        reader.onload = () => {
                            imgSrc = reader.result;
                            this.global.ajax.call(this, 'my_headImg', {avatar: imgSrc.split('base64,')[1]}, (d) => {
                                this.$vux.loading.hide();
                                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                                else {
                                    this.global.toast.call(this, "上传成功");
                                }
                            });
                            this.head_img = imgSrc;
                        };
                    }
                }
            },
            setName(){
                const name = this.tel.replace(/(^\s*)|(\s*$)/g, "");
                if (name.length === 0) this.tel = this.oldName;
                else if (name.length > 6) this.global.toast.call(this, "最长不能超过6位");
                else if (name === this.oldName) return false;
                else {
                    this.$vux.loading.show();
                    this.global.ajax.call(this, "my_name", {name}, (d) => {
                        this.$vux.loading.hide();
                        if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                        else {
                            this.global.toast.call(this, "修改成功");
                        }
                    })
                }
            }
        },

    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
