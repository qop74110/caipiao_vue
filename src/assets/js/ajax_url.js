const ajax_url = {
    host: `${window.location.protocol}//test.api.lottery.anwenqianbao.com/`,
    api: {
        home_list: "v1/home/list",                      //  首页-产品列表
        home_banner: "v1/home/banner",                  //  首页-banner
        home_notice: "v1/home/notice",                  //  首页-消息通知
        login_code: "v1/sms/getcode",                   //  登录获取验证码
        login: 'v1/login/login',                        //  登录|| 注册
        ssq_phase: "v1/ssq/purchase",                   //  双色球顶部购买的奖期以及截止时间
        ssq_random: "v1/ssq/multi",                     //  双色球-多期机选
        ssq_miss: "v1/ssq/miss",                        //  双色球-显示遗漏
        ssq_order: "v1/ssq/order",                      //  双色球-下单
        ssq_historyNo: "v1/ssq/drop",                   //  双色球-下单
        jczq_play_type: "v1/football/muchPlayreles",    //  竞猜足球-玩法类型
        jczq_index_list: "v1/football/list",            //  竞猜足球-赛事列表
        jczq_pay: "v1/football/confirmThePayment",      //  竞猜足球-下单
        jczq_screenList: "v1/football/league",          //  筛选列表
        jczq_screen: "v1/football/screen",              //  筛选
        kj_list: "v1/open/open",                        //  开奖_首页_列表
        kj_czh: "v1/open/openssq",                      //  开奖_ 双色球&大乐透
        kj_jczq: "v1/football/result",                  //  开奖_竞彩足球
        my_balance: "v1/user/balance",                  //  我的—余额
        pay: 'v1/recharge/browser',                     //  充值
        tx_bindState: 'v1/extract/binding',             //  银行卡&身份证&手机号 绑定状态
        tx_checkCode: 'v1/sms/checkCode',               //  银行卡&身份证&手机号 验证手机验证码
        tx_bindID: 'v1/extract/idcard',                 //  绑定 银行卡&身份证&手机号
        tx_tixianData: 'v1/extract/amount',             //  提现 获取余额&银行卡号
        tx_take: 'v1/extract/take',               //  提现 申请提现
    }
};

export default ajax_url;
