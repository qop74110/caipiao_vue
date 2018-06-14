import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import event from 'page/event/store_event';

const store = new Vuex.Store({
    modules: {
        event
    }
});


export default store;
