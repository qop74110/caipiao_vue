export default {
    state: {
        p3: {
            textIndex: 0,           //0: 直选；    1：组三复式；     2：组六
            moreIndex: null,        //
            individual: [],         //  个位
            ten: [],                //  十位
            hundred: [],            //  百位
            zu3: [],                //  组三
            zu6: [],                //  组六
            notes: 0                //  注数
        },
        p5: {
            moreIndex: null,
            individual: [],         //  个位
            ten: [],                //  十位
            hundred: [],            //  百位
            thousand: [],           //  千
            absolutely: [],         //  万
            notes: 0                //  注数
        }
    },
    mutations: {
        /**
         * 修改排3和排5的标题 和 点击标题上的更多按钮
         * @param state
         * @param data  = {key: '要修改的state', val: '修改的值', objName: '排3 还是 排5', callback： '回调函数'}
         * @param callback 回调函数
         */
        setIndex (state, data = {}) {
            if (data.val !== state[data.objName][data.key] && Number.isInteger(data.val)) {
                state[data.objName][data.key] = data.val

                data.callback(data.val)
            }
        },
        /**
         * 计算注数
         * @param caizhong 彩种
         */
        setNotes (state, caizhong) {

            let notes = null                        //  注数

//                排列3
            if (caizhong === 'p3') {
                const {individual, ten, hundred, textIndex: play_type} = state[caizhong]
//                    直选
                if (play_type === 0) {
                    if (individual.length === 0 || ten.length === 0 || hundred.length === 0) notes = 0;
                    else notes = individual.length * ten.length * hundred.length
                }
//                    组三复式
                else if (play_type === 1) {
                    const zu3 = state[caizhong].zu3
                    if (zu3.length < 2) notes = 0;
                    else  notes = zu3.length * (zu3.length - 1)
                }
//                    组六
                else if (play_type === 2) {
                    const zu6 = state[caizhong].zu6
                    if (zu6.length < 3) notes = 0;
                    else if (zu6.length === 3) notes = 1;
                    else notes = zu6.length * (zu6.length - 3)

                }

            }
//                排列5
            else if (caizhong === 'p5') {
                const {individual, ten, hundred, thousand, absolutely} = state[caizhong]
                if (individual.length === 0 || ten.length === 0 || hundred.length === 0 || absolutely.length === 0 || thousand.length === 0) notes = 0;
                else notes = individual.length * ten.length * hundred.length
            }

            const stateNotes = state[caizhong].notes
            if (notes !== stateNotes) state[caizhong].notes = notes
        },
        selectBall (state, data) {
            if (state[data.playType][data.storeStateName].length !== data.val.length) state[data.playType][data.storeStateName] = data.val
        },
        clearSelect (state, caizhong) {
            if (caizhong === 'p3') {
                if (state.p3.textIndex === 0) {
                    state.p3.individual = new Array()
                    state.p3.ten = new Array()
                    state.p3.hundred = new Array()
                    console.log(state.p3)
                }

                else if (state.p3.textIndex === 1) {
                    state.p3.zu3 = new Array()
                }

                else if (state.p3.textIndex === 2) {
                    state.p3.zu6 = new Array()
                }
            }
        }
    }
};
