// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import router from './router';
import App from './App';
import {LoadingPlugin, AlertPlugin, ConfirmPlugin, AjaxPlugin, ToastPlugin} from "vux";
import global from "./assets/js/common";
import store from '@/store';

Vue.prototype.global = global;

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(AjaxPlugin);
Vue.use(ToastPlugin);
Vue.use(require('vue-wechat-title'));






/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')
