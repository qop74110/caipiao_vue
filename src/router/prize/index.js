/**
 * 开奖
 */

export default [
    {
        path: "/prize",
        name: "prize",
        meta: {
            title: '开奖信息'
        },
        component: (resolve) => {
            require(["page/prize/index"], resolve)
        }
    }, {
        path: "/prize_ssq",
        name: "prize_ssq",
        meta: {
            title: '往期中奖'
        },
        component: (resolve) => {
            require(["page/prize/shuangseqiu"], resolve)
        }
    }, {
        path: "/prize_jczq",
        name: "prize_jczq",
        meta: {
            title: '竞彩足球'
        },
        component: (resolve) => {
            require(["page/prize/jingcaizuqiu"], resolve)
        }
    }, {
        path: "/prize/:type",
        name: "prize_3d",
        meta: {
            title: '往期中奖'
        },
        component: (resolve) => {
            require(["page/prize/fucai3d"], resolve)
        }
    }
]
