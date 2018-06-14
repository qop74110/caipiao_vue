export default {
    state: {
        phone: '',
        phone_b: '',
        code: '',
        getCodeNum: 0,
    },
    mutations: {
        setPhone(state, val) {
            state.phone = val;
        },
        setPhoneB(state){
            state.phone_b = state.phone;
        },
        setCode(state, val){
            state.code = val;
        },
        setGetCodeNum(state){
            state.getCodeNum++;
        }
    }
};
