/**
 * 我的
 */

export default [
    {
        path: "/my",
        name: "my",
        meta: {
            title: '我的'
        },
        component: (resolve) => {
            require(["page/my/index"], resolve)
        }
    }, {
        path: "/recharge",
        name: "recharge",
        meta: {
            title: '充值'
        },
        component: (resolve) => {
            require(["page/my/recharge"], resolve)
        }
    }, {
        path: "/tixian",
        name: "tixian",
        meta: {
            title: '提现'
        },
        component: (resolve) => {
            require(["page/my/tixian"], resolve)
        }
    }, {
        path: "/bindID",
        name: "bindID",
        meta: {
            title: '身份验证'
        },
        component: (resolve) => {
            require(["page/my/bindID"], resolve)
        }
    }, {
        path: "/set",
        name: "set",
        meta: {
            title: '设置'
        },
        component: (resolve) => {
            require(["page/my/set"], resolve)
        }
    },
]
