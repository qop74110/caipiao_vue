const ajax_url = {
    // host: `${window.location.protocol}//api.lottery.anwenqianbao.com/`,
    host: `${window.location.protocol}//api.siyecaodnp.com/`,
    // host: `${window.location.protocol}//test.api.lottery.anwenqianbao.com/`,
    api: {
        home_list: "v1/home/list",                      //  首页-产品列表
        home_banner: "v1/home/banner",                  //  首页-banner
        home_notice: "v1/home/notice",                  //  首页-消息通知

        login_code: "v1/sms/getcode",                   //  登录获取验证码
        login: 'v1/login/login',                        //  登录|| 注册

        ssq_phase: "v1/ssq/purchase",                   //  双色球顶部购买的奖期以及截止时间
        ssq_random_order: "v1/ssq/multi",               //  双色球-多期机选
        ssq_miss: "v1/ssq/miss",                        //  双色球-显示遗漏
        ssq_order: "v1/ssq/order",                      //  双色球-下单
        ssq_historyNo: "v1/ssq/drop",                   //  双色球-往期中奖

        jczq_play_type: "v1/football/muchPlayreles",    //  竞猜足球-玩法类型
        jczq_index_list: "v1/football/list",            //  竞猜足球-赛事列表
        jczq_order: "v1/football/confirmThePayment",    //  竞猜足球-下单
        FT005_order: "v1/football/blend",               //  竞猜足球-混合投注下单
        jczq_screenList: "v1/football/league",          //  筛选列表
        jczq_screen: "v1/football/screen",              //  筛选

        fc3d_phase: "v1/3d/purchase",                   //  福彩3D 顶部购买的奖期以及截止时间
        fc3d_miss: "v1/3d/miss",                        //  福彩3D-显示遗漏
        fc3d_historyNo: "v1/3d/drop",                   //  福彩3D-往期中奖
        fc3d_order: "v1/3d/order",                      //  福彩3D-下单

        p_purchase: 'v1/arrange/purchase',              //  排列3 5购买的奖期以及截止时间
        p_drop: 'v1/arrange/drop',                      //  排列3 5 近10期中奖结果
        p_miss: 'v1/arrange/miss',                      //  排列3 5 遗漏
        p3_order: 'v1/arrange/order',                   //  排列3-下单
        p5_order: 'v1/arrange/five',                    //  排列5-下单

        kj_list: "v1/open/open",                        //  开奖_首页_列表
        kj_czh: "v1/open/openssq",                      //  开奖_ 双色球&大乐透
        kj_jczq: "v1/football/result",                  //  开奖_竞彩足球
        my_balance: "v1/user/balance",                  //  我的—余额
        my_headImg: "v1/user/avatar",                   //  我的—上传头像
        my_name: "v1/user/name",                        //  我的—修改昵称
        my_log: "v1/user/log",                          //  我的—修改昵称

        pay: 'v1/recharge/browser',                     //  充值
        pay1004: 'v1/pay/browser',                      //  充值

        tx_bindState: 'v1/extract/binding',             //  银行卡&身份证&手机号 绑定状态
        tx_checkCode: 'v1/sms/checkCode',               //  银行卡&身份证&手机号 验证手机验证码
        tx_bindID: 'v1/extract/idcard',                 //  绑定 银行卡&身份证&手机号
        tx_tixianData: 'v1/extract/amount',             //  提现 获取余额&银行卡号
        tx_take: 'v1/extract/take',                     //  提现 申请提现
        tx_bankList: 'v1/extract/opening',              //  开户银行

        order_all: 'v1/order/whole',                    //  订单 我的全部订单
        order_chase: 'v1/order/chase',                  //  订单 追号订单
        order_ing: 'v1/order/wait',                     //  订单 待开奖订单
        order_prize: 'v1/order/winning',                //  订单 待开奖订单
        order_detail: 'v1/order/deteails',              //  订单 详情
        order_footDetail: 'v1/order/footDeteails',      //  订单 足彩
        order_hemai: 'v1/order/documentary',            //  订单 合买
        order_detail_two: 'v1/order/chasing',           //  订单 详情 2级
        order_del: 'v1/order/del',                      //  订单 删除某一定的

        hemai_list: "v1/together/list",                 //  合买 index-list
        hemai_index_top: 'v1/together/top',             //  合买 index-top
        hemai_idetails: 'v1/together/details',          //  合买 详情
        hemai_pay: 'v1/together/documentary',           //  合买 跟单

        hb_data: 'v1/user/envelopes',                   //  红包-获取红包列表
        hb_share: "v1/user/sharesend",                  //  红包-分享得红包
        hb_useHb: "v1/user/rightoff",                   //  红包-分享得红包
        hb_cashingCode: "v1/user/code",                 //  红包-分享得红包

        tj_home_pro: "v1/StatisticalColor/statistical", //  首页点击彩种统计

        download_an: 'http://ot8flmrcy.bkt.clouddn.com/xingyuncai.apk',
        download_ios: 'https://fir.im/6kqp',
        download_evnet: 'v1/download/download',

    }
};

export default ajax_url;
