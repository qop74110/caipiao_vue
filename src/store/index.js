import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import event from 'page/event/store_event';
import pailie from 'page/product/pailie/store'

const store = new Vuex.Store({
    modules: {
        event,
        pailie
    }
});


export default store;
