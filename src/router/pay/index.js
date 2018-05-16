export default [
    {
        path: '/pay_success',
        name: 'pay_success',
        meta: {
            title: '支付成功'
        },
        component: (resolve) => {
            require(['page/pay/pay_success'], resolve)
        }
    },
]
