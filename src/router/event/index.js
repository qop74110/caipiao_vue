export default [
    {
        path: '/event1',
        name: 'event1',
        meta: {
            title: '世界杯'
        },
        component: (resolve) => {
            require(['page/event/signUp/'], resolve)
        }
    }, {
        path: '/down1',
        name: 'down1',
        meta: {
            title: '世界杯'
        },
        component: (resolve) => {
            require(['page/event/down1/'], resolve)
        }
    }
];
