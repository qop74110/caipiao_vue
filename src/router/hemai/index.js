/**
 *  合买路由
 */

export default [
    {
        path: '/hemai',
        name: 'hemai',
        meta: {
            title: '合买中心'
        },
        component: (resolve) => {
            require(['page/hemai/index'], resolve)
        }
    },
]
