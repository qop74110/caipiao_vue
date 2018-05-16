export default [
    {
        path: '/pay_success',
        name: 'pay_success',
        meta: {
            title: '支付成功'
        },
        component: (resolve) => {
            require(['page/pay/success'], resolve)
        }
    }, {
        path: '/pay_hemai',
        name: 'pay_hemai',
        meta: {
            title: '合买订单'
        },
        component: (resolve) => {
            require(['page/pay/hemai'], resolve)
        }
    },
]
